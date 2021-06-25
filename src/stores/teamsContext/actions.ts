import { Context } from "@microsoft/teams-js";
import BaseAction from "../base/BaseAction";
import { DefaultError } from "../../models/error/types";

export const REQUEST_CONTEXT = "REQUEST_CONTEXT";
export const REQUEST_CONTEXT_FINISHED = "REQUEST_CONTEXT_FINISHED";
export const REQUEST_CONTEXT_ERROR = "REQUEST_CONTEXT_ERROR";

export interface RequestTeamsContext extends BaseAction<undefined> {}
export interface RequestTeamsContextFinished extends BaseAction<{context: Context}> {}
export interface RequestTeamsContextError extends BaseAction<DefaultError> {}

export const requestContext = (): RequestTeamsContext => ({
  type: REQUEST_CONTEXT,
});

export const requestContextFinished = (context: Context): RequestTeamsContextFinished => ({
  type: REQUEST_CONTEXT_FINISHED,
  payload: { context },
});

export const requestContextError = (errorMessage: string, error: unknown): RequestTeamsContextError => ({
  type: REQUEST_CONTEXT_ERROR,
  payload: new DefaultError(errorMessage, error),
  error: true,
});
