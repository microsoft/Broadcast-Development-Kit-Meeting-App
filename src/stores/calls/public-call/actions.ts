/* eslint-disable @typescript-eslint/no-empty-interface */
import { PublicCall } from "@/models/calls/types";
import BaseAction, { RequestFinishedActionParameters } from "@/stores/base/BaseAction";
import { RequestResponse } from '../../../services/api';
import { ApiError } from "@/models/error/types";

export const POLLING_TOGGLE = "POLLING_TOGGLE ";
export interface PollingToggle extends BaseAction<{ isPollingEnabled: boolean }> { }

export const togglePolling = (isPollingEnabled: boolean): PollingToggle => ({
  type: POLLING_TOGGLE,
  payload: {
    isPollingEnabled,
  },
});

export const REQUEST_PUBLIC_CALL = "REQUEST_PUBLIC_CALL";
export const REQUEST_PUBLIC_CALL_FINISHED = "REQUEST_PUBLIC_CALL_FINISHED";

export interface RequestPublicCall extends BaseAction<undefined> {};
export interface RequestPublicCallFinished extends BaseAction<RequestResponse<PublicCall | null>> {};

export const requestPublicCall = (): RequestPublicCall => ({
  type: REQUEST_PUBLIC_CALL,
})

export const requestPublicCallFinished = ({
  payload,
  meta,
}: RequestFinishedActionParameters<PublicCall | null>) =>({
  type: REQUEST_PUBLIC_CALL_FINISHED,
  payload: payload,
  error: payload instanceof ApiError,
})

