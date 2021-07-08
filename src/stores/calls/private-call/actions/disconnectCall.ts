// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import BaseAction, {
  RequestFinishedActionParameters,
} from "@/stores/base/BaseAction";
import { RequestResponse, Resource } from "../../../../services/api";
import { PrivateCall } from "../../../../models/calls/types";
import { ApiError } from "@/models/error/types";

export const REQUEST_DISCONNECT_CALL = "REQUEST_DISCONNECT_CALL";
export const REQUEST_DISCONNECT_CALL_FINISHED =
  "REQUEST_DISCONNECT_CALL_FINISHED";

export interface RequestDisconnectCall extends BaseAction<undefined> {}
export interface RequestDisconnectCallFinished
  extends BaseAction<RequestResponse<Resource<PrivateCall>>> {}

export const requestDisconnectCall = (): RequestDisconnectCall => ({
  type: REQUEST_DISCONNECT_CALL,
});

export const requestDisconnectCallFinished = ({
  payload,
  meta,
}: RequestFinishedActionParameters<
  Resource<PrivateCall>
>): RequestDisconnectCallFinished => ({
  type: REQUEST_DISCONNECT_CALL_FINISHED,
  payload: payload,
  error: payload instanceof ApiError,
});
