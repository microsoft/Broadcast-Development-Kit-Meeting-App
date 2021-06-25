import { AuthStatusCode } from "@/models/auth/types";
import { setToken } from "@/services/api";
import AppState from "@/stores/AppState";
import { Middleware } from "redux";
import * as AuthActions from "../stores/auth/actions";

export const saveAuthToken: Middleware<{}, AppState> = (store) => (next) => (
  action
) => {
  if (action.type === AuthActions.UPDATE_AUTH_STATUS && action.payload.status === AuthStatusCode.Authenticated) {
    // after a successful login, update the token in the API
    setToken(action.payload.apiToken);
  }

  // continue processing this action
  return next(action);
};
