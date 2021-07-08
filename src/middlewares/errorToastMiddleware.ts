// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Middleware } from "redux";
import AppState from "../stores/AppState";
import { ToastStatusEnum } from "../stores/toast/reducer";
import { addToast } from "../stores/toast/actions";

const errorToastMiddleware: Middleware<{}, AppState> = (store) => (next) => (action) => {
    if (action.error) {
      const errorAction = action;
      errorAction.payload.status === 401
        ? next(addToast("Unauthorized: Please, Sing in again.", ToastStatusEnum.Error))
        : next(addToast(errorAction.payload.message, ToastStatusEnum.Error));
    }

    next(action);
  };

export default errorToastMiddleware;
