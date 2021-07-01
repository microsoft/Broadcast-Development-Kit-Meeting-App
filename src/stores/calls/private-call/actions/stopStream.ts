// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import BaseAction, { RequestFinishedActionParameters } from "@/stores/base/BaseAction";
import { Stream } from "../../../../models/calls/types";
import { RequestResponse, Resource } from "../../../../services/api";
import { ApiError } from "@/models/error/types";

export const REQUEST_STOP_STREAM = 'REQUEST_STOP_STREAM';
export const REQUEST_STOP_STREAM_FINISHED = 'REQUEST_STOP_STREAM_FINISHED';

export interface RequestStopStream extends BaseAction<undefined> {}
export interface RequestStopStreamFinished extends BaseAction<RequestResponse<Resource<Stream>>> {}

export const requestStopStream = (): RequestStopStream => ({
  type: REQUEST_STOP_STREAM,
});

export const requestStopStreamFinished = ({
  payload,
  meta,
}: RequestFinishedActionParameters<Resource<Stream>>): RequestStopStreamFinished => ({
  type: REQUEST_STOP_STREAM_FINISHED,
  payload: payload,
  error: payload instanceof ApiError,
});
