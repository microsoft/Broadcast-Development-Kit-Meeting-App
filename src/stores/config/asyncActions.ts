// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import AppState from "../AppState";
import { retrieveConfig } from "./loader";
import {
  requestConfigError,
  requestConfigFinished,
  requestConfig,
} from "./actions";

export const loadConfig =
  (): ThunkAction<Promise<AnyAction>, AppState, undefined, AnyAction> =>
  async (dispatch, getState) => {
    try {
      dispatch(requestConfig());
      const config = await retrieveConfig();
      return dispatch(requestConfigFinished(config));
    } catch (error) {
      return dispatch(
        requestConfigError(
          "An error has ocurred while trying to load the configuration",
          error
        )
      );
    }
  };
