import BaseAction, {
  RequestFinishedActionParameters,
} from "@/stores/base/BaseAction";
import { PrivateCall } from "../../../../models/calls/types";
import { RequestResponse, Resource } from "../../../../services/api";
import { ApiError } from "@/models/error/types";

export const REQUEST_JOIN_CALL = "REQUEST_JOIN_CALL";
export const REQUEST_JOIN_CALL_FINISHED = "REQUEST_JOIN_CALL_FINISHED";

export interface RequestJoinCall extends BaseAction<{ callUrl: string }> {}
export interface RequestJoinCallFinished
  extends BaseAction<RequestResponse<Resource<PrivateCall>>> {}

// Calls related
export const requestJoinCall = (callUrl: string): RequestJoinCall => ({
  type: REQUEST_JOIN_CALL,
  payload: {
    callUrl,
  },
});

export const requestJoinCallFinished = ({
  payload,
  meta,
}: RequestFinishedActionParameters<
  Resource<PrivateCall>
>): RequestJoinCallFinished => ({
  type: REQUEST_JOIN_CALL_FINISHED,
  payload: payload,
  error: payload instanceof ApiError,
});
