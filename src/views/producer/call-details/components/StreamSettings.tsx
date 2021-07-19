// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import React, { ReactText, useReducer } from "react";
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
} from "@fluentui/react-northstar";
import { closeNewStreamSettings } from "@/stores/calls/private-call/actions/newStreamSettings";
import {
  KeyLength,
  StartStreamRequest,
  StreamConfiguration,
  StreamMode,
  StreamProtocol,
  StreamSrtConfiguration,
  StreamType,
} from "@/models/calls/types";
import { startStreamAsync } from "@/stores/calls/private-call/asyncActions";
import { useEffect } from "react";
import { useMemo } from "react";

interface SettingsState {
  protocol?: StreamProtocol;
  flow?: StreamType;
  url?: string;
  mode?: StreamMode;
  port?: string;
  passphrase?: string;
  keyLength?: KeyLength;
  latency?: number;
  followSpeakerAudio?: boolean;
  unmixedAudio?: boolean;
  audioFormat?: number;
  timeOverlay?: boolean;
  hasPassphraseError: boolean;
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

  const KeyLengthValues = useMemo(() => Object.keys(KeyLength).filter(
    (i) => !isNaN(parseInt(i))
  ),[]);

  const keyLengthOptions = useMemo(() => KeyLengthValues.map((k) => {
    return {
      key: parseInt(k),
      header: k === "0" ? "no-key" : `${k} Bytes`,
    };
  }),[KeyLengthValues]);

  const loadDefaultSettings = () => {
    const protocol = activeCall?.defaultProtocol || StreamProtocol.SRT;
    const passphrase =
      protocol === StreamProtocol.SRT ? activeCall?.defaultPassphrase : "";
    const latency = activeCall?.defaultLatency;
    const url = "";
    const mode = activeCall?.defaultMode || newStream?.mode;
    const keyLength = activeCall?.defaultKeyLength || KeyLength.None;
    const unmixedAudio = newStream?.advancedSettings.unmixedAudio;
    const audioFormat = 0;
    const timeOverlay = true;

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

  const handleSave = () => {
    if (!newStream) {
      return;
    }

    setState({ hasPassphraseError: false });

    const config = getStreamConfiguration(state) as StreamConfiguration;

    if (state.protocol === StreamProtocol.SRT) {
      if (
        config.streamKey.length &&
        (config.streamKey.length < 10 || config.streamKey.length > 79)
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
          unmixedAudio: state.unmixedAudio,
          streamKey: state.passphrase,
          streamUrl: state.url,
          audioFormat: state.audioFormat,
          timeOverlay: state.timeOverlay,
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
        {state.protocol === StreamProtocol.RTMP && (
          <Flex column gap="gap.small">
            <Text weight="bold" content="Settings" />

            <Input
              name="streamUrl"
              label="Stream URL"
              onChange={(event, data) => setState({ url: data?.value })}
              value={state.url}
              fluid
            />

            <Input
              name="streamKey"
              label="Stream Key"
              onChange={(event, data) => setState({ passphrase: data?.value })}
              value={state.passphrase}
              fluid
            />
          </Flex>
        )}
        {state.protocol === StreamProtocol.SRT && (
          <Flex column gap="gap.small">
            <Text weight="bold" content="Settings" />
            Mode
            <RadioGroup
              checkedValue={state.mode}
              onCheckedValueChange={(e, data) =>
                setState({ mode: data?.value as StreamMode })
              }
              items={[
                {
                  name: "listener",
                  key: "listener",
                  label: "Listener",
                  value: StreamMode.Listener,
                },
                {
                  name: "caller",
                  key: "caller",
                  label: "Caller",
                  value: StreamMode.Caller,
                },
              ]}
            />
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
