// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  Flex,
  Button,
  SettingsIcon,
} from "@fluentui/react-northstar";
import { CircleIcon } from "@fluentui/react-icons-northstar";
import { disconnectCallAsync } from "@/stores/calls/private-call/asyncActions";
import {
  CallState,
  StreamProtocol,
  CallType,
  StreamMode,
} from "@/models/calls/types";
import AppState from "@/stores/AppState";
import { PrivateCall } from "@/models/calls/types";
import { CALL_SETTINGS_PATH } from "@/models/global/constants";
import { useHistory } from "react-router-dom";

enum CallStateBadge {
  "#F8D22A" = CallState.Establishing,
  "#6BB700" = CallState.Established,
  "#E97548" = CallState.Terminating,
  "#8A8886" = CallState.Terminated,
  "#B3B0AD" = CallState.Idle,
}

const StatusBar: React.FC = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const call: PrivateCall = useSelector(
    (appState: AppState) =>
      appState.privateCall.activeCall || CALL_INITIALIZING_PLACEHOLDER
  );
  const callState = call?.state;
  const isEstablished = callState === CallState.Established;

  const onClickDisconnectButton = (
    event: React.SyntheticEvent<HTMLElement>
  ) => {
    event.preventDefault();
    const callId = call.id;
    dispatch(disconnectCallAsync(callId));
  };

  const onClickSettingsBtn = (event: any) => {
    history.push(`${CALL_SETTINGS_PATH}${call.id}`);
  };

  return (
    <Flex
      style={{ height: "48px", paddingRight: "4px" }}
      vAlign="center"
      gap="gap.small"
      space="between"
    >
      <Flex gap="gap.small" vAlign="center">
        <CircleIcon style={{ color: CallStateBadge[call.state] }}></CircleIcon>
        <Text weight="semibold">{CallState[callState]}</Text>
      </Flex>

      <Button
        style={{
          marginRight: "4px",
          marginBottom: "4px",
        }}
        icon={<SettingsIcon />}
        iconOnly
        circular
        onClick={onClickSettingsBtn}
        disabled={!isEstablished}
      />
    </Flex>
  );
};

const CALL_INITIALIZING_PLACEHOLDER: PrivateCall = {
  id: "0",
  displayName: "Loading Call",
  botFqdn: "",
  botIp: "",
  connectionPool: {
    available: 0,
    used: 0,
  },
  createdAt: new Date(),
  defaultProtocol: StreamProtocol.SRT,
  defaultLatency: 0,
  defaultPassphrase: "",
  defaultMode: StreamMode.Listener,
  errorMessage: null,
  joinUrl: "",
  state: CallState.Idle,
  meetingType: CallType.Default,
  streams: [],
  injectionStream: null,
  publicContext: null,
  privateContext: null,
};

export default StatusBar;
