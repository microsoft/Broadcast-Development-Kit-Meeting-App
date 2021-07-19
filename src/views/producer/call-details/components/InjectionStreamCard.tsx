// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";

import {
  Flex,
  Avatar,
  Text,
  Button,
  Divider,
  Card,
  EyeIcon,
  EyeSlashIcon,
} from "@fluentui/react-northstar";
import {
  MicIcon,
  MicOffIcon,
  CallRecordingIcon,
  MoreIcon,
  ClipboardCopiedToIcon,
} from "@fluentui/react-icons-northstar";
import {
  InjectionStream,
  StreamMode,
  StreamProtocol,
  StreamState,
} from "@/models/calls/types";
import {
  muteBotAsync,
  stopInjectionAsync,
  unmuteBotAsync,
} from "@/stores/calls/private-call/asyncActions";
import { openNewInjectionStreamSettings } from "@/stores/calls/private-call/actions/newInjectionStreamSettings";

interface InjectionCardProps {
  stream: InjectionStream | null;
  callId: string;
}

const OBFUSCATION_PATTERN = "********";

const InjectionStreamCard: React.FC<InjectionCardProps> = (props) => {
  const dispatch = useDispatch();

  const { stream, callId } = props;

  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(!expanded);
  const [showPassphrase, setShowPassphrase] = useState(false);
  const toggleShowPassphrase = () => setShowPassphrase(!showPassphrase);
  const [botMuted, setBotMuted] = useState(false);

  const muteBotAudio = () => {
    dispatch(muteBotAsync(callId));
    setBotMuted(true);
  };

  const unmuteBotAudio = () => {
    dispatch(unmuteBotAsync(callId));
    setBotMuted(false);
  };

  const toggleStreamOperation = () => {
    if (!stream) {
      dispatch(openNewInjectionStreamSettings({ callId }));
    } else {
      dispatch(stopInjectionAsync(callId, stream.id));
    }
  };

  const streamOperationEnabled = () => {
    return !stream || stream.state !== StreamState.Starting;
  };

  const protocolText = () => {
    switch (stream?.protocol) {
      case StreamProtocol.RTMP:
        return "RTMP";
      case StreamProtocol.SRT:
        return "SRT";
      default:
        return "";
    }
  };

  const streamModeText = () => {
    switch (stream?.streamMode) {
      case StreamMode.Caller:
        return stream?.protocol === StreamProtocol.RTMP ? "Pull" : "Caller";
      case StreamMode.Listener:
        return stream?.protocol === StreamProtocol.RTMP ? "Push" : "Listener";
      default:
        return "";
    }
  };

  const getInjectionUrl = (stream: InjectionStream): string => {
    if (stream.protocol === StreamProtocol.RTMP && stream.injectionUrl) {
      return stream.injectionUrl.replace(stream.passphrase, OBFUSCATION_PATTERN);
    }

    return stream.injectionUrl ?? "";
  };

  const injectionUrl = stream ? getInjectionUrl(stream) : "";
  const displayName = "Injection Stream";

  return (
    <Flex>
      <Card
        ghost
        style={{
          width: "100%",
          paddingLeft: "4px",
          paddingRight: "4px",
        }}
        key={stream?.id || "injectionStream"}
      >
        {/* Collapsed view */}
        <Flex
          vAlign="center"
          space="between"
          style={{ display: !expanded ? "flex" : "none" }}
        >
          <Flex vAlign="center" gap="gap.small">
            <Avatar name={displayName}></Avatar>
            <Flex column>
              <Text style={{ marginBottom: "0px" }}>{displayName}</Text>
            </Flex>
          </Flex>

          <Flex vAlign="center" gap="gap.smaller">
            {botMuted && (
              <Button
                circular
                icon={<MicOffIcon />}
                iconOnly
                onClick={unmuteBotAudio}
              />
            )}
            {!botMuted && (
              <Button
                circular
                icon={<MicIcon />}
                iconOnly
                onClick={muteBotAudio}
              />
            )}

            <Button
              circular
              icon={
                <CallRecordingIcon
                  style={{
                    color:
                      stream?.state === StreamState.Started ? "#E73550" : "",
                  }}
                />
              }
              iconOnly
              onClick={toggleStreamOperation}
              disabled={!streamOperationEnabled()}
            />

            <Button
              circular
              iconOnly
              icon={<MoreIcon />}
              aria-label="Hover button"
              onClick={toggleExpanded}
            />
          </Flex>
        </Flex>

        {/* Expanded view */}
        <Flex
          style={{ display: expanded ? "flex" : "none" }}
          gap="gap.small"
          column
        >
          <Flex gap="gap.small" space="between">
            <Text size="large" weight="bold" content={displayName} />

            <Avatar
              size="larger"
              name={displayName}
              style={{ cursor: "pointer" }}
              onClick={toggleExpanded}
            />
          </Flex>

          <Flex column hAlign="start" gap="gap.smaller">
            <Button
              onClick={botMuted ? unmuteBotAudio : muteBotAudio}
              style={{ minWidth: "115px" }}
            >
              {botMuted ? (
                <MicOffIcon
                  style={{
                    marginRight: "0.25rem",
                  }}
                />
              ) : (
                <MicIcon
                  style={{
                    marginRight: "0.25rem",
                  }}
                />
              )}
              <Text content={!botMuted ? "Mute" : "Unmute"} />
            </Button>
            <Button
              onClick={toggleStreamOperation}
              disabled={!streamOperationEnabled()}
              style={{ minWidth: "115px" }}
            >
              <CallRecordingIcon
                style={{
                  marginRight: "0.25rem",
                  color: stream?.state === StreamState.Started ? "#E73550" : "",
                }}
              />
              <Text
                content={
                  stream?.state === StreamState.Started ? "Stop" : "Record"
                }
              />
            </Button>
          </Flex>

          <Divider color="gray" fitted style={{ marginTop: "4px" }} />

          {stream?.state === StreamState.Started && (
            <Flex column>
              <Text size="large" weight="bold">
                Details
              </Text>

              <Text weight="bold" content="Stream URL:" />

              <Text style={{overflowWrap: 'break-word'}}>
                {injectionUrl}{" "}
                <Button circular iconOnly>
                  <CopyToClipboard text={stream?.injectionUrl}>
                    <ClipboardCopiedToIcon />
                  </CopyToClipboard>
                </Button>
              </Text>

              <Text weight="bold" content="Protocol:" />

              <Text>{protocolText()}</Text>

              <Text weight="bold" content="Stream Mode:" />

              <Text>{streamModeText()}</Text>

              {/* If protocol is SRT display Latency and Passphrase properties */}
              {stream.protocol === StreamProtocol.SRT && (
                <>
                  <Text weight="bold" content="Latency:" />

                  <Text>{`${stream?.latency}ms`}</Text>

                  <Text weight="bold" content="Passphrase:" />

                  <Text>
                    {stream.passphrase ? (
                      <>
                        {showPassphrase ? stream?.passphrase : "********"}{" "}
                        <Button
                          circular
                          iconOnly
                          onClick={toggleShowPassphrase}
                        >
                          {showPassphrase ? <EyeSlashIcon /> : <EyeIcon />}
                        </Button>{" "}
                        <Button circular iconOnly>
                          <CopyToClipboard text={stream?.passphrase}>
                            <ClipboardCopiedToIcon />
                          </CopyToClipboard>
                        </Button>
                      </>
                    ) : (
                      "None"
                    )}
                  </Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Card>
    </Flex>
  );
};

export default InjectionStreamCard;
