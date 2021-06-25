import BaseAction, { RequestFinishedActionParameters } from "@/stores/base/BaseAction";
import { PrivateCall } from "../../../../models/calls/types";
import { RequestResponse } from "../../../../services/api";
import { ApiError } from "@/models/error/types";

export const REQUEST_CALL = 'REQUEST_CALL';
export const REQUEST_CALL_FINISHED = 'REQUEST_CALL_FINISHED';

export interface RequestCall extends BaseAction<undefined> {}
export interface RequestCallFinished extends BaseAction<RequestResponse<PrivateCall | null>> {}

export const requestCall = (): RequestCall => ({
  type: REQUEST_CALL,
});

export const requestCallFinished = ({
  payload,
  meta,
}: RequestFinishedActionParameters<PrivateCall | null>): RequestCallFinished => ({
  type: REQUEST_CALL_FINISHED,
  payload: payload,
  error: payload instanceof ApiError,
});
