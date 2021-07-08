// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { RequestResponse } from "@/services/api";
import { InjectionStream } from "../../../../models/calls/types";
import { ApiError } from "@/models/error/types";
import BaseAction, { RequestFinishedActionParameters } from "@/stores/base/BaseAction";

export const REQUEST_STOP_INJECTION_STREAM = 'REQUEST_STOP_INJECTION_STREAM';
export const REQUEST_STOP_INJECTION_STREAM_FINISHED = 'REQUEST_STOP_INJECTION_STREAM_FINISHED';

export interface RequestStoptInjectionStream extends BaseAction<undefined> {}
export interface RequestStoptInjectionStreamFinished extends BaseAction<RequestResponse<InjectionStream>> {}

export const requestStoptInjectionStream = (): RequestStoptInjectionStream => ({
  type: REQUEST_STOP_INJECTION_STREAM,
});

export const requestStoptInjectionStreamFinished = ({
    payload,
    meta,
  }: RequestFinishedActionParameters<InjectionStream>): RequestStoptInjectionStreamFinished => ({
    type: REQUEST_STOP_INJECTION_STREAM_FINISHED,
    payload: payload,
    error: payload instanceof ApiError,
  });