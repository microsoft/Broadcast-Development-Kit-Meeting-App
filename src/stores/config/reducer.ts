import * as ConfigActions from "./actions";
import { Config } from "@/models/config/types";
import { Reducer } from "redux";
import baseReducer from "../base/BaseReducer";
import { Status, StatusCode } from "@/models/global/types";

export interface ConfigState {
  values: Config | null;
  status: Status<StatusCode>;
}

export const INITIAL_STATE: ConfigState = {
  values: null,
  status: {
    code: StatusCode.NOTLOADED,
  } as Status<StatusCode>,
};

export const configReducer: Reducer = baseReducer(INITIAL_STATE, {
  [ConfigActions.REQUEST_CONFIG](
    state: ConfigState,
    action: ConfigActions.RequestConfig
  ): ConfigState {
    return {
      ...state,
      status: {
        code: StatusCode.LOADING,
      },
    };
  },
  [ConfigActions.REQUEST_CONFIG_FINISHED](
    state: ConfigState,
    action: ConfigActions.RequestConfigFinished
  ): ConfigState {
    return {
      ...state,
      values: action.payload!.config,
      status: {
        code: StatusCode.LOADED,
      },
    };
  },
});
