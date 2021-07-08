// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CallState } from "@/models/calls/types";
import AppState from "@/stores/AppState";
import { Layout } from "@/views/components/Layout";
import { Button, Text, Form, Flex } from "@fluentui/react-northstar";
import { Context } from "@microsoft/teams-js";
import { joinCallAsync } from "@/stores/calls/private-call/asyncActions";
import { ProvisioningStateValues } from "@/models/botService/types";
import { selectBotService } from "@/stores/service/selectors";
import { DEFAULT_SERVICE_ID } from "@/stores/service/constants";
import BotServiceStatus from "@/views/components/bot-service/BotServiceStatus";
import { selectRequesting } from "@/stores/requesting/selectors";
import * as CallsActions from "@/stores/calls/private-call/actions";

const BASE_JOIN_URL = "https://teams.microsoft.com/l/meetup-join";

const JoinCall: React.FC = () => {
  const dispatch = useDispatch();
  const teamsContext = useSelector(
    (state: AppState) => state.teamsContext.values
  );
  const connectingCall = useSelector(
    (state: AppState) => state.privateCall.activeCall
  );
  const botService = useSelector(
    (state: AppState) => selectBotService(state, DEFAULT_SERVICE_ID)
  );

  const isRequesting = useSelector((state: AppState) => selectRequesting(state, [CallsActions.REQUEST_JOIN_CALL]))

  const [meetingUrl, setMeetingUrl] = useState("");

  useEffect(() => {
    if (teamsContext) {
      setMeetingUrl(getMeetingUrlFromContext(teamsContext));
    }
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(joinCallAsync(meetingUrl));
  };

  const connecting = connectingCall?.state === CallState.Establishing || isRequesting;
  const botServiceEnabled =
    !!botService &&
    botService.infrastructure.provisioningDetails.state.id === ProvisioningStateValues.Provisioned;

  return (
    <>
      <BotServiceStatus />
      <Form onSubmit={onSubmit}>
        <Flex
          style={{
            paddingLeft: "4px",
            paddingRight: "4px",
            marginTop: "0px !important",
          }}
          column
          hAlign="center"
        >
          <Text style={{ marginBottom: "8px" }} align="center">
            Press the button below to bring Broadcaster for Teams into the
            meeting
          </Text>

          <Button
            style={{ marginTop: "12px" }}
            primary
            loading={connecting}
            disabled={connecting || !botServiceEnabled}
            content={connecting ? "Joining..." : "Join Meeting"}
          />
        </Flex>
      </Form>
    </>
  );
};

const getMeetingUrlFromContext = (context: Context) => {
  const contextParam = {
    Tid: context.tid,
    Oid: context.userObjectId,
  };
  return `${BASE_JOIN_URL}/${context?.chatId}/0?context=${JSON.stringify(
    contextParam
  )}`;
};

export default JoinCall;
