// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Config } from "../../models/config/types";
import BaseAction from "../base/BaseAction";
import { DefaultError } from "../../models/error/types";

export const REQUEST_CONFIG = "REQUEST_CONFIG";
export const REQUEST_CONFIG_FINISHED = "REQUEST_CONFIG_FINISHED";
export const REQUEST_CONFIG_ERROR = "REQUEST_CONFIG_ERROR";

export interface RequestConfig extends BaseAction<undefined> {}
export interface RequestConfigFinished extends BaseAction<{ config: Config }> {}
export interface RequestConfigError extends BaseAction<DefaultError> {}

export const requestConfig = (): RequestConfig => ({
  type: REQUEST_CONFIG,
});

export const requestConfigFinished = (
  config: Config
): RequestConfigFinished => ({
  type: REQUEST_CONFIG_FINISHED,
  payload: { config },
});

export const requestConfigError = (
  errorMessage: string,
  error: unknown
): RequestConfigError => ({
  type: REQUEST_CONFIG_ERROR,
  payload: new DefaultError(errorMessage, error),
  error: true,
});
