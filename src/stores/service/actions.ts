import BaseAction, { RequestFinishedActionParameters } from "../base/BaseAction";
import { RequestResponse, Resource } from "@/services/api";
import { BotService, ProvisioningStateValues } from "@/models/botService/types";
import { ApiError, DefaultError } from "@/models/error/types";

export const REQUEST_START_SERVICE = "REQUEST_START_SERVICE";
export const REQUEST_START_SERVICE_FINISHED = "REQUEST_START_SERVICE_FINISHED";

export interface RequestStartService extends BaseAction<undefined> { }
export interface RequestStartServiceFinished extends BaseAction<RequestResponse<Resource<BotService>>> { }

export const requestStartService = (): RequestStartService => ({
  type: REQUEST_START_SERVICE,
});

export const requestStartServiceFinished = ({ payload }: RequestFinishedActionParameters<Resource<BotService>>): RequestStartServiceFinished => ({
  type: REQUEST_START_SERVICE_FINISHED,
  payload,
  error: payload instanceof ApiError
});

export const REQUEST_STOP_SERVICE = "REQUEST_STOP_SERVICE";
export const REQUEST_STOP_SERVICE_FINISHED = "REQUEST_STOP_SERVICE_FINISHED";

export interface RequestStopService extends BaseAction<undefined> { }
export interface RequestStopServiceFinished extends BaseAction<RequestResponse<Resource<BotService>>> { }

export const requestStopService = (): RequestStopService => ({
  type: REQUEST_STOP_SERVICE,
});

export const requestStopServiceFinished = ({ payload }: RequestFinishedActionParameters<Resource<BotService>>): RequestStopServiceFinished => ({
  type: REQUEST_STOP_SERVICE_FINISHED,
  payload,
  error: payload instanceof ApiError
});

export const REQUEST_SERVICE_STATUS = "REQUEST_SERVICE_STATUS";
export const REQUEST_SERVICE_STATUS_FINISHED = "REQUEST_SERVICE_STATUS_FINISHED";

export interface RequestServiceStatus extends BaseAction<undefined> { }
export interface RequestServiceStatusFinished extends BaseAction<RequestResponse<Resource<BotService>>> { }

export const requestServiceStatus = (): RequestServiceStatus => ({
  type: REQUEST_SERVICE_STATUS,
});

export const requestServiceStatusFinished = ({ payload }: RequestFinishedActionParameters<Resource<BotService>>): RequestServiceStatusFinished => ({
  type: REQUEST_SERVICE_STATUS_FINISHED,
  payload,
  error: payload instanceof ApiError
});

export const SERVICE_NOTFOUND_ERROR = "SERVICE_NOTFOUND_ERROR";
export interface ServiceNotFoundError extends BaseAction<DefaultError> { }

export const serviceNotFoundError = (errorMessage: string): ServiceNotFoundError => ({
  type: SERVICE_NOTFOUND_ERROR,
  payload: new DefaultError(errorMessage),
  error: true
});

export const UPDATE_SERVICE_STATUS = "UPDATE_SERVICE_STATUS";
export interface UpdateServiceStatus extends BaseAction<{serviceId: string, status: ProvisioningStateValues}> { }

export const updateServiceStatus = (serviceId: string, status: ProvisioningStateValues): UpdateServiceStatus => ({
  type: UPDATE_SERVICE_STATUS,
  payload: {serviceId, status},
});

