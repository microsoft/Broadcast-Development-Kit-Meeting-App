// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import Axios, { Method, AxiosRequestConfig } from "axios";
import { fillApiErrorWithDefaults } from "@/models/error/helpers";
import { ApiError } from "@/models/error/types";
import { retrieveConfig } from "@/stores/config/loader";

export enum RequestMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE",
  Options = "OPTIONS",
  Head = "HEAD",
  Patch = "PATCH",
}

export interface RequestParameters {
  url: string;
  shouldOverrideBaseUrl?: boolean;
  payload?: unknown;
  method?: RequestMethod;
  config?: AxiosRequestConfig;
}

export class ApiClient {
  public static async post<T>({
    url,
    shouldOverrideBaseUrl,
    payload,
  }: RequestParameters): Promise<RequestResponse<T>> {
    return baseRequest<T>({
      url,
      shouldOverrideBaseUrl,
      payload,
      method: RequestMethod.Post,
    });
  }

  public static async put<T>({
    url,
    shouldOverrideBaseUrl,
    payload,
  }: RequestParameters): Promise<RequestResponse<T>> {
    return baseRequest<T>({
      url,
      shouldOverrideBaseUrl,
      payload,
      method: RequestMethod.Put,
    });
  }

  public static async get<T>({
    url,
    shouldOverrideBaseUrl,
    payload,
    config,
  }: RequestParameters): Promise<RequestResponse<T>> {
    return baseRequest<T>({
      url,
      shouldOverrideBaseUrl,
      payload,
      method: RequestMethod.Get,
      config,
    });
  }

  public static async delete<T>({
    url,
    shouldOverrideBaseUrl,
    payload,
  }: RequestParameters): Promise<RequestResponse<T>> {
    return baseRequest<T>({
      url,
      shouldOverrideBaseUrl,
      payload,
      method: RequestMethod.Delete,
    });
  }
}

const baseRequest = async <T>({
  url,
  shouldOverrideBaseUrl,
  payload,
  method,
  config,
}: RequestParameters): Promise<RequestResponse<T>> => {
  try {
    const { apiBaseUrl } = await retrieveConfig();

    const requestConfig: AxiosRequestConfig = {
      url: shouldOverrideBaseUrl ? url : `${apiBaseUrl}${url}`,
      method: method as Method,
      data: payload,
      headers: {
        "x-client": "Meeting Extension",
      },
      ...config,
    };

    const [response] = await Promise.all([Axios(requestConfig), delay()]);

    const { status, data, request } = response;

    if (data.success === false) {
      const errorResponse = fillApiErrorWithDefaults(
        {
          status,
          message: data.errors.join(" - "),
          errors: data.errors,
          url: request ? request.responseURL : url,
          raw: response,
        },
        url
      );

      return errorResponse;
    }

    return data as T;
  } catch (error) {
    //The request was made and the server responded with an status code different of 2xx
    console.log({
      error: JSON.stringify(error),
    });
    if (error.response) {
      const { value } = error.response.data;

      //TODO: Modify how we parse de error. Acording to our exception responses, we should look the property value

      const errors: string[] =
        value && Object.prototype.hasOwnProperty.call(value, "errors")
          ? [value?.title, value?.detail, concatErrorMessages(value?.errors)]
          : [value?.title, value?.detail];

      const serverError = fillApiErrorWithDefaults(
        {
          status: error.response.status,
          message: errors.filter(Boolean).join(" - "),
          errors,
          url: error.request.responseURL,
          raw: error.response,
        },
        url
      );

      return serverError;
    }

    //The request was made but no response was received
    if (error.request) {
      const { status, statusText, responseURL } = error.request;

      const unknownError = fillApiErrorWithDefaults(
        {
          status,
          message: `${error.message} ${statusText}`,
          errors: [statusText],
          url: responseURL,
          raw: error.request,
        },
        url
      );

      return unknownError;
    }

    //Something happened during the setup
    const defaultError = fillApiErrorWithDefaults(
      {
        status: 0,
        message: error.message,
        errors: [error.message],
        url: url,
        raw: error,
      },
      url
    );

    return defaultError;
  }
};

const concatErrorMessages = (errors: Record<string, unknown>): string[] => {
  const errorsArray: string[] = [];

  Object.values(errors).forEach((element) => {
    Array.isArray(element)
      ? errorsArray.push(element.join(" - "))
      : errorsArray.push(JSON.stringify(element));
  });

  return errorsArray;
};

const delay = (duration = 250): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export type RequestResponse<T> = T | ApiError;

export interface Resource<T> {
  id: string;
  resource: T;
}

export function setToken(token: string): void {
  Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
