import { ApiError } from "@/models/error/types";
import { RequestResponse } from "@/services/api";
import BaseAction, {
  RequestFinishedActionParameters,
} from "@/stores/base/BaseAction";
import { PrivateCall } from "../../../../models/calls/types";

export const REQUEST_ACTIVE_CALLS = "ACTIVE_CALLS_LOADING";
export const REQUEST_ACTIVE_CALLS_FINISHED = "ACTIVE_CALLS_LOADED";

export interface RequestActiveCalls extends BaseAction<undefined> {}
export interface RequestActiveCallsFinished
  extends BaseAction<RequestResponse<PrivateCall[]>> {}

export const requestActiveCalls = (): RequestActiveCalls => ({
  type: REQUEST_ACTIVE_CALLS,
});

export const requestActiveCallsFinished = ({
  payload,
  meta,
}: RequestFinishedActionParameters<
  PrivateCall[]
>): RequestActiveCallsFinished => ({
  type: REQUEST_ACTIVE_CALLS_FINISHED,
  payload: payload,
  error: payload instanceof ApiError,
});
