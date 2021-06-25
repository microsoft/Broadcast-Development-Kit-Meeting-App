import { StreamType } from "@/models/calls/types";
import { ParticipantService } from "@/services/ParticipantService";
import AppState from "@/stores/AppState";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { requestPublicCall, requestPublicCallFinished } from "./actions";

export const getParticipantAsync =
  (
    participantAadId: string | null
  ): ThunkAction<void, AppState, undefined, AnyAction> =>
  async (dispatch, getState) => {
    const meetingId = getState().teamsContext.values?.meetingId || "";

    if (meetingId) {
      dispatch(requestPublicCall());

      const call = await ParticipantService.getParticipantByMeetingId(
        meetingId,
        StreamType.Participant,
        participantAadId
      );

      dispatch(
        requestPublicCallFinished({
          payload: call,
        })
      );
    } else {
      console.error(
        `[extension/asyncActions] getParticipant - Meeting Id is ${typeof meetingId}`
      );
    }
  };
