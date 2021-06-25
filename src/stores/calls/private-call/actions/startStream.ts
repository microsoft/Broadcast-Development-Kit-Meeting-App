import BaseAction, { RequestFinishedActionParameters } from "@/stores/base/BaseAction";
import { Stream } from "../../../../models/calls/types";
import { RequestResponse, Resource } from "../../../../services/api";
import { ApiError } from "@/models/error/types";

export const REQUEST_START_STREAM = 'REQUEST_START_STREAM';
export const REQUEST_START_STREAM_FINISHED = 'REQUEST_START_STREAM_FINISHED';

export interface RequestStartStream extends BaseAction<undefined> {}
export interface RequestStartStreamFinished extends BaseAction<RequestResponse<Resource<Stream>>> {}

export const requestStartStream = (): RequestStartStream => ({
  type: REQUEST_START_STREAM,
});

export const requestStartStreamFinished = ({
  payload,
  meta,
}: RequestFinishedActionParameters<Resource<Stream>>): RequestStartStreamFinished => ({
  type: REQUEST_START_STREAM_FINISHED,
  payload: payload,
  error: payload instanceof ApiError,
});
