import { ApiError } from "./types";

export const fillApiErrorWithDefaults = (error: Partial<ApiError>, requestUrl: string): ApiError => {
  const errorResponse = new ApiError();

  errorResponse.status = error.status || 0;
  errorResponse.message = error.message || 'An error ocurred'; //TODO: Change this message
  errorResponse.errors = error.errors!.length ? error.errors! : ['An error ocurred'];
  errorResponse.url = error.url || requestUrl;

  return errorResponse;
};
