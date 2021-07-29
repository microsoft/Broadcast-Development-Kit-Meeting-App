// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import React, { ReactText, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppState from "@/stores/AppState";

import {
  Flex,
  Text,
  Form,
  RadioGroup,
  FlexItem,
  Input,
  Checkbox,
  Button,
  Dropdown,
  EyeIcon,
  EyeSlashIcon,
  RedoIcon,
} from "@fluentui/react-northstar";
import { closeNewStreamSettings } from "@/stores/calls/private-call/actions/newStreamSettings";
import {
  KeyLength,
  RtmpMode,
  StartStreamRequest,
  StreamConfiguration,
  StreamMode,
  StreamProtocol,
  StreamSrtConfiguration,
  StreamType,
} from "@/models/calls/types";
import {
  refreshStreamKeyAsync,
  startStreamAsync,
} from "@/stores/calls/private-call/asyncActions";
import { useEffect } from "react";
import { useMemo } from "react";
import { collapseCard } from "@/stores/ui/actions";

interface SettingsState {
  protocol?: StreamProtocol;
  flow?: StreamType;
  url?: string;
  mode?: StreamMode | RtmpMode;
  port?: string;
  passphrase?: string;
  keyLength?: KeyLength;
  latency?: number;
  followSpeakerAudio?: boolean;
  unmixedAudio?: boolean;
  audioFormat?: number;
  timeOverlay?: boolean;
  hasPassphraseError: boolean;
  enableSsl?: boolean;
  injectionUrl?: string;
}

const StreamSettings: React.FC = () => {
  const dispatch = useDispatch();
  const activeCall = useSelector(
    (state: AppState) => state.privateCall.activeCall
  );
  const newStream = useSelector(
    (state: AppState) => state.privateCall.newStream
  );

  //Warning! It wasn't tested with nested objects
  const [state, setState] = useReducer(
    (state: SettingsState, newState: Partial<SettingsState>) => ({
      ...state,
      ...newState,
    }),
    { hasPassphraseError: false }
  );

  const KeyLengthValues = useMemo(
    () => Object.keys(KeyLength).filter((i) => !isNaN(parseInt(i))),
    []
  );

  const keyLengthOptions = useMemo(
    () =>
      KeyLengthValues.map((k) => {
        return {
          key: parseInt(k),
          header: k === "0" ? "no-key" : `${k} Bytes`,
        };
      }),
    [KeyLengthValues]
  );

  const [showStreamKey, setShowStreamKey] = useState(false);

  const loadDefaultSettings = () => {
    const protocol = activeCall?.defaultProtocol || StreamProtocol.SRT;
    const passphrase =
      protocol === StreamProtocol.SRT ? activeCall?.defaultPassphrase : "";
    const latency = activeCall?.defaultLatency;
    const url = "";
    const mode =
      activeCall?.defaultProtocol === StreamProtocol.RTMP
        ? RtmpMode.Pull
        : StreamMode.Listener;
    const keyLength = activeCall?.defaultKeyLength || KeyLength.None;
    const unmixedAudio = newStream?.advancedSettings.unmixedAudio;
    const audioFormat = 0;
    const timeOverlay = true;
    const enableSsl = newStream?.advancedSettings.enableSsl;

    setState({
      protocol,
      passphrase,
      keyLength,
      latency,
      url,
      mode,
      unmixedAudio,
      audioFormat,
      timeOverlay,
      enableSsl,
    });
  };

  const handleLatencyChange = (event, data) =>
    setState({ latency: parseInt(data?.value || "0", 10) });

  const handleAudioFormatChange = (event, data) => {
    setState({ audioFormat: data.value });
  };
  const handleKeyLengthChange = (event, data) => {
    setState({ keyLength: data.value.key });
  };

  const handleClose = () => {
    dispatch(closeNewStreamSettings());
  };

  const handlerefreshStreamKey = () => {
    dispatch(refreshStreamKeyAsync(activeCall!.id));
  };

  const handleSave = () => {
    if (!newStream) {
      return;
    }

    if (newStream.participantId) {
      dispatch(collapseCard(newStream.participantId));
    }

    setState({ hasPassphraseError: false });

    const config = getStreamConfiguration(state) as StreamConfiguration;

    if (state.protocol === StreamProtocol.SRT) {
      if (
        config.streamKey?.length &&
        (config.streamKey?.length < 10 || config.streamKey?.length > 79)
      ) {
        setState({ hasPassphraseError: true });
        return;
      }
    }

    const stream: StartStreamRequest = {
      callId: newStream.callId,
      type: newStream.streamType,
      participantId: newStream.participantId,
      protocol: state.protocol || StreamProtocol.SRT,
      config,
    };

    dispatch(startStreamAsync(stream));
  };

  const getItemsAudioFormat = () => {
    return [
      {
        name: "44100Hz",
        key: "0",
        label: "44100Hz",
        value: 0,
      },
      {
        name: "48000Hz",
        key: "1",
        label: "48000Hz",
        value: 1,
      },
    ];
  };

  const getStreamConfiguration = (state: SettingsState) => {
    switch (state.protocol) {
      case StreamProtocol.SRT:
        return {
          mode: state.mode,
          latency: state.latency,
          streamKey: state.passphrase,
          keyLength: state.keyLength,
          streamUrl: state.url,
          unmixedAudio: state.unmixedAudio,
          audioFormat: state.audioFormat,
          timeOverlay: state.timeOverlay,
        } as StreamSrtConfiguration;
      case StreamProtocol.RTMP:
        return {
          mode: state.mode,
          unmixedAudio: state.unmixedAudio,
          streamUrl: state.url,
          audioFormat: state.audioFormat,
          timeOverlay: state.timeOverlay,
          enableSsl: state.enableSsl,
        } as StreamConfiguration;
      default:
        return {};
    }
  };

  useEffect(() => {
    loadDefaultSettings();
  }, []);

  const defaultKeyLength = keyLengthOptions.find(
    (k) => k.key === state.keyLength
  );

  const rtmpPushStreamKey = activeCall?.privateContext?.streamKey ?? "";

  return (
    <Flex gap="gap.small" column>
      <Form>
        <Text
          size="larger"
          weight="bold"
          content="Record"
          style={{ marginBottom: 0 }}
        />
        <Text size="large" content={newStream?.participantName} />
        {state.protocol !== undefined && (
          <Text size="large">
            Streaming over <strong>{StreamProtocol[state.protocol]}</strong>
          </Text>
        )}
        <>
          <Text weight="bold" content="Settings" />
          Mode
          <RadioGroup
            checkedValue={state.mode}
            onCheckedValueChange={(e, data) =>
              setState({ mode: data?.value as StreamMode })
            }
            items={[
              {
                name: "pullOrCaller",
                key: "pullOrCaller",
                label:
                  state.protocol === StreamProtocol.SRT ? "Caller" : "Pull",
                value: StreamMode.Caller,
              },
              {
                name: "pushOrListener",
                key: "pushOrListener",
                label:
                  state.protocol === StreamProtocol.SRT ? "Listener" : "Push",
                value: StreamMode.Listener,
              },
            ]}
          />
        </>
        {state.protocol === StreamProtocol.RTMP &&
          state.mode === RtmpMode.Pull && (
            <Flex space="between" gap="gap.small">
              <Text>Enable Ssl</Text>
              <Checkbox
                onChange={(event, data) =>
                  setState({ enableSsl: data?.checked })
                }
                toggle
                labelPosition="start"
              />
            </Flex>
          )}
        {state.protocol === StreamProtocol.RTMP &&
          state.mode === RtmpMode.Push && (
            <Input
              name="injectionUrl"
              label="Injection URL"
              value={state.injectionUrl}
              onChange={(event, data) => setState({ url: data?.value })}
              fluid
            />
          )}
        {/* Call Stream Key */}
        <Text style={{ marginBottom: "2px" }}>Stream Key</Text>
        <Flex space="between" vAlign="center">
          <Text>{showStreamKey ? rtmpPushStreamKey : "********"} </Text>
          <Flex gap="gap.small">
            <Button
              circular
              iconOnly
              icon={showStreamKey ? <EyeSlashIcon /> : <EyeIcon />}
              onClick={() => setShowStreamKey((prev) => !prev)}
            />
            {/* Refresh Stream Key button */}
            <Button
              circular
              icon={<RedoIcon />}
              onClick={handlerefreshStreamKey}
            />
          </Flex>
        </Flex>
        {state.protocol === StreamProtocol.SRT && (
          <Flex column gap="gap.small">
            {state.mode === StreamMode.Caller && (
              <Input
                name="streamUrl"
                label="Stream URL"
                value={state.url}
                onChange={(event, data) => setState({ url: data?.value })}
                fluid
              />
            )}
            <Input
              name="latency"
              label="Latency"
              type="number"
              defaultValue="50"
              value={state.latency}
              onChange={handleLatencyChange}
              fluid
            />
            <Input
              name="passphrase"
              label="Passphrase"
              value={state.passphrase}
              onChange={(event, data) => setState({ passphrase: data?.value })}
              fluid
            />
            {state.hasPassphraseError && (
              <FlexItem align="start">
                <Text
                  content="Passphrase length must be between 10 and 79 characters"
                  color="red"
                  temporary
                />
              </FlexItem>
            )}
            <Text content="Key Length" style={{ marginBottom: "2px" }} />
            <Dropdown
              items={keyLengthOptions}
              highlightFirstItemOnOpen={true}
              defaultValue={defaultKeyLength}
              checkable
              disabled={!state.passphrase}
              onChange={handleKeyLengthChange}
            />
          </Flex>
        )}
        Audio Format
        <RadioGroup
          checkedValue={state.audioFormat}
          items={getItemsAudioFormat()}
          onCheckedValueChange={handleAudioFormatChange}
        />
        <Checkbox
          labelPosition="start"
          label="Time Overlay"
          toggle
          checked={state.timeOverlay}
          onChange={(event, data) => setState({ timeOverlay: data?.checked })}
        />
        <Flex gap="gap.smaller" space="between">
          <Button
            onClick={handleClose}
            content="Cancel"
            secondary
            loader="Back up bus"
          />
          <Button
            onClick={handleSave}
            content="Start"
            primary
            loader="Back up bus"
          />
        </Flex>
      </Form>
    </Flex>
  );
};

export default StreamSettings;
