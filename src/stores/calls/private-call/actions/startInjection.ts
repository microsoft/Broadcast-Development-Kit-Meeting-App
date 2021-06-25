import { ApiError } from "@/models/error/types";
import { RequestResponse } from "@/services/api";
import BaseAction, { RequestFinishedActionParameters } from "@/stores/base/BaseAction";
import { InjectionStream } from "../../../../models/calls/types";

export const REQUEST_START_INJECTION_STREAM = 'START_INJECTION'
export const REQUEST_START_INJECTION_STREAM_FINISHED = 'REQUEST_START_INJECTION_STREAM_FINISHED';

export interface RequestStartInjectionStream extends BaseAction<undefined> {}
export interface RequestStartInjectionStreamFinished extends BaseAction<RequestResponse<InjectionStream>> {}


export const requestStartInjectionStream = (): RequestStartInjectionStream => ({
  type: REQUEST_START_INJECTION_STREAM,
});

export const requestStartInjectionStreamFinished = ({
  payload,
  meta,
}: RequestFinishedActionParameters<InjectionStream>): RequestStartInjectionStreamFinished => ({
  type: REQUEST_START_INJECTION_STREAM_FINISHED,
  payload: payload,
  error: payload instanceof ApiError,
});
