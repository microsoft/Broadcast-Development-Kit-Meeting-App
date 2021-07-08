// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import BaseAction, { RequestFinishedActionParameters } from "@/stores/base/BaseAction";
import { InjectionStream } from "../../../../models/calls/types";
import { RequestResponse } from "../../../../services/api";
import { ApiError } from "@/models/error/types";

export const REQUEST_MUTE_BOT = 'REQUEST_MUTE_BOT';
export const REQUEST_MUTE_BOT_FINISHED = 'REQUEST_MUTE_BOT_FINISHED';

export interface RequestMuteBot extends BaseAction<undefined> {}
export interface RequestMuteBotFinished extends BaseAction<RequestResponse<InjectionStream>> {}

export const requestMuteBot = (): RequestMuteBot => ({
  type: REQUEST_MUTE_BOT,
});

export const requestMuteBotFinished = ({
  payload,
  meta,
}: RequestFinishedActionParameters<InjectionStream>): RequestMuteBotFinished => ({
  type: REQUEST_MUTE_BOT_FINISHED,
  payload: payload,
  error: payload instanceof ApiError,
});
