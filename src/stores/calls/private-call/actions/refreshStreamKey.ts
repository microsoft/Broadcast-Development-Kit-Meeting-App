// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CallStreamKey } from '../../../../models/calls/types';
import { ApiError } from '@/models/error/types';
import { RequestResponse } from '@/services/api';
import BaseAction, { RequestFinishedActionParameters } from '@/stores/base/BaseAction';

export const REQUEST_REFRESH_STREAM_KEY = 'REQUEST_REFRESH_STREAM_KEY';
export const REQUEST_REFRESH_STREAM_KEY_FINISHED = 'REQUEST_REFRESH_STREAM_KEY_FINISHED';

export interface RequestRefreshStreamKey extends BaseAction<undefined> {}
export interface RequestRefreshStreamKeyFinished extends BaseAction<RequestResponse<CallStreamKey>> {}

export const requestRefreshStreamKey = (): RequestRefreshStreamKey => ({
  type: REQUEST_REFRESH_STREAM_KEY,
});

export const requestRefreshStreamKeyFinished = ({
  payload,
  meta
}: RequestFinishedActionParameters<CallStreamKey>): RequestRefreshStreamKeyFinished => ({
  type: REQUEST_REFRESH_STREAM_KEY_FINISHED,
  payload: payload,
  error: payload instanceof ApiError,
});
