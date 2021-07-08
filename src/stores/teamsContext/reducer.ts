// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Status, StatusCode } from "@/models/global/types";
import { Context } from "@microsoft/teams-js";
import { Reducer } from "redux";
import baseReducer from "../base/BaseReducer";
import * as TeamsContextActions from "./actions";

export interface TeamsContextState {
  values: Context | null;
  status: Status<StatusCode>;
}

export const INITIAL_STATE: TeamsContextState = {
  values: null,
  status: {
    code: StatusCode.NOTLOADED,
  } as Status<StatusCode>,
};

export const contextReducer: Reducer = baseReducer(INITIAL_STATE, {
  [TeamsContextActions.REQUEST_CONTEXT](
    state: TeamsContextState,
    action: TeamsContextActions.RequestTeamsContext
  ): TeamsContextState {
    return {
      ...state,
      status: {
        code: StatusCode.LOADING,
      },
    };
  },
  [TeamsContextActions.REQUEST_CONTEXT_FINISHED](
    state: TeamsContextState,
    action: TeamsContextActions.RequestTeamsContextFinished
  ): TeamsContextState {
    return {
      ...state,
      values: action.payload!.context,
      status: {
        code: StatusCode.LOADED,
      },
    };
  },
});
