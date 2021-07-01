// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import React, { Fragment, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { Flex, Loader } from "@fluentui/react-northstar";
import AppState from "@/stores/AppState";
import { useDispatch, useSelector } from "react-redux";
import {
  CALL_JOIN_PATH,
  CALL_DETAILS_PATH,
  CALL_SETTINGS_PATH
} from "@/models/global/constants";
import { getCallByMeetingIdAsync } from "@/stores/calls/private-call/asyncActions";
import { CallState } from "@/models/calls/types";
import { togglePolling } from "@/stores/calls/private-call/actions";
import CallSettings from "./call-settings/CallSettings";
import JoinCall from "./join-call/JoinCall";
import CallDetails from "./call-details/CallDetails";

const Producer: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const activeCall = useSelector((state: AppState) => state.privateCall.activeCall);
  const meetingId = useSelector((state: AppState) => state.teamsContext.values?.meetingId?? '');

  const hasCallInProgress =
    activeCall?.state === CallState.Establishing ||
    activeCall?.state === CallState.Established;

  const notDetectedCall = activeCall === null;
  const isLoading = activeCall === undefined;

  useEffect(() => {
    dispatch(getCallByMeetingIdAsync(meetingId));
  }, []);

  console.log({
    hasCallInProgress: hasCallInProgress,
    activeCall: activeCall,
  })
  
  useEffect(() => {
    if (activeCall && hasCallInProgress) {
      dispatch(togglePolling(true));
      history.push(`${CALL_DETAILS_PATH}${activeCall.id}`);
    }

    if (notDetectedCall) {
      history.push(CALL_JOIN_PATH);
    }
  }, [hasCallInProgress, notDetectedCall]);

  return (
    <Fragment>
      {isLoading ? (
        <Flex vAlign="center" hAlign="center">
          <Loader label="Checking for existing meeting" labelPosition="below" />
        </Flex>
      ) : (
        <Fragment>
          <Route path={CALL_JOIN_PATH} component={JoinCall} />
          <Route path={`${CALL_DETAILS_PATH}:id`} component={CallDetails} />
          <Route path={`${CALL_SETTINGS_PATH}:id`} component={CallSettings} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Producer
