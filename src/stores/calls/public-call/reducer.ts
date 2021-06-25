import { PublicCall } from "@/models/calls/types";
import { PollingSettings } from "@/models/global/types";
import baseReducer from "@/stores/base/BaseReducer";
import { Reducer } from "redux";
import * as PublicCallAction from "./actions";

export const ATTENDEE_DEFAULT_POLLING_TIME = 2000;

export type PublicCallState = {
  activeCall: undefined | null | PublicCall;
} & PollingSettings;

export const INITIAL_STATE: PublicCallState = {
  activeCall: undefined,
  isPollingEnabled: false,
  pollingTime: ATTENDEE_DEFAULT_POLLING_TIME,
};

export const publicCallsreducer: Reducer = baseReducer(INITIAL_STATE, {
  [PublicCallAction.REQUEST_PUBLIC_CALL_FINISHED](
    state: PublicCallState,
    action: PublicCallAction.RequestPublicCallFinished
  ): PublicCallState {
    const call = action.payload! as PublicCall;

    return {
      ...state,
      activeCall: call,
    };
  },
  [PublicCallAction.POLLING_TOGGLE](
    state: PublicCallState,
    action: PublicCallAction.PollingToggle
  ): PublicCallState {
    return {
      ...state,
      isPollingEnabled: action.payload!.isPollingEnabled,
    };
  },
});
