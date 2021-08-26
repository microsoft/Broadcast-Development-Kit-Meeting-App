// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  requestContextError,
  requestContextFinished,
  requestContext,
} from "./actions";
import { getContext } from "@/services/msteams/Context";
import AppState from "@/stores/AppState";
import { getTheme } from "@/services/msteams/Theme";
import { setTheme } from "../ui/actions";

export const getExtensionContext =
  (
    teamsClient: any
  ): ThunkAction<Promise<AnyAction>, AppState, undefined, AnyAction> =>
  async (dispatch) => {
    try {
      dispatch(requestContext());
      const context = await getContext(teamsClient);
      const theme = getTheme(context.theme);
      
      dispatch(setTheme(theme));
      return dispatch(requestContextFinished(context));
    } catch (error) {
      return dispatch(
        requestContextError(
          "An error has ocurred while trying to get the extension's context",
          error
        )
      );
    }
  };
