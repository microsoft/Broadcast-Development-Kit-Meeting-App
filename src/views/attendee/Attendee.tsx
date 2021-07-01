// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import React, { useEffect } from "react";
import { useSelector , useDispatch} from "react-redux";
import AppState from "@/stores/AppState";
import { Alert, Image, Text } from "@fluentui/react-northstar";
import {
  InfoIcon,
  ExclamationTriangleIcon,
} from "@fluentui/react-icons-northstar";
import Attendee1 from "@/images/attendee1.png";
import Attendee2 from "@/images/attendee2.png";
import useInterval from "@/hooks/useInterval";
import { togglePolling } from "@/stores/calls/public-call/actions";
import { getParticipantAsync } from "@/stores/calls/public-call/asyncActions";
import { StreamState } from "@/models/calls/types";

const Attendee: React.FC = () => {
  const dispatch = useDispatch();
  const publicCallState = useSelector((state: AppState) => state.publicCall);
  const participantAadId = useSelector((state: AppState) => state.auth.userProfile.id);
  
  useEffect(() => {
    dispatch(togglePolling(true));
  }, []);

  const { isPollingEnabled, pollingTime } = publicCallState;

  useInterval(
    () => {
      dispatch(getParticipantAsync(participantAadId));
    },
    isPollingEnabled ? pollingTime : null
  );

  const isBroadcasting = publicCallState?.activeCall?.streamState === StreamState.Started;

  return (
    <>
      {isBroadcasting && (
        <>
          <Alert
            info
            styles={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <InfoIcon size="large" styles={{ marginRight: '8px' }} />
            <Text weight="bold" content="Your camera and microphone are being broadcasted." />
          </Alert>

          <Image src={Attendee1} />

          <Alert
            variables={{
              urgent: true,
            }}
            styles={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Text weight="bold" content="ON AIR" />
          </Alert>
        </>
      )}

      {!isBroadcasting && (
        <>
          <Alert
            info
            styles={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ExclamationTriangleIcon size="large" styles={{ marginRight: '8px' }} />
            <Text weight="bold" content="ATTENTION" />
          </Alert>

          <Alert
            info
            content="Meeting is being broadcast and probably recorded. You camera and microphone might be captured if you speak."
            styles={{
              textAlign: "center",
            }}
          />

          <Image src={Attendee2} />
        </>
      )}
    </>
  );
};

export default Attendee;
