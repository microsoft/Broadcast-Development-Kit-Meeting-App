// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import BaseAction from "../base/BaseAction";
import {
  AuthStatusCode,
  UserProfile,
  UserRoles,
} from "../../models/auth/types";
import { DefaultError } from "@/models/error/types";

export const REQUEST_USER_PROFILE = "REQUEST_USER_PROFILE";
export const REQUEST_USER_PROFILE_FINISHED = "REQUEST_USER_PROFILE_FINISHED";
export const REQUEST_USER_PROFILE_ERROR = "REQUEST_USER_PROFILE_ERROR";

export interface RequestUserProfile extends BaseAction<undefined> {}
export interface RequestUserProfileFinished
  extends BaseAction<{ userProfile: UserProfile }> {}
export interface RequestUserProfileError extends BaseAction<DefaultError> {}

export const requestUserProfile = (): RequestUserProfile => ({
  type: REQUEST_USER_PROFILE,
});

export const requestUserProfileFinished = (
  userProfile: UserProfile
): RequestUserProfileFinished => ({
  type: REQUEST_USER_PROFILE_FINISHED,
  payload: {
    userProfile,
  },
});

export const requestUserProfileError = (
  message: string,
  rawError: any
): RequestUserProfileError => ({
  type: REQUEST_USER_PROFILE_ERROR,
  payload: new DefaultError(message, rawError),
  error: true,
});

export const UPDATE_AUTH_STATUS = "UPDATE_AUTH_STATUS";;
export const USER_AUTHENTICATICATION_ERROR = "USER_AUTHENTICATICATION_ERROR";

export interface UpdateAuthStatus extends BaseAction<{status: AuthStatusCode, apiToken?: string}>{
};

export interface UserAuthenticationError extends BaseAction<DefaultError> {}

export const updateAuthStatus = (status: AuthStatusCode, apiToken?: string): UpdateAuthStatus => ({
    type: UPDATE_AUTH_STATUS,
    payload: {
      status,
      apiToken
    }
})

export const userAuthenticationError = (
  message: string,
  rawError: any
): UserAuthenticationError => ({
  type: USER_AUTHENTICATICATION_ERROR,
  payload: new DefaultError(message, rawError),
  error: true,
});

export const USER_SET_ACCESSED_AS = "USER_SET_ACCESSED_AS";

export interface UserSetAccessedAs
  extends BaseAction<{ userRole: UserRoles }> {}

export const userSetAccessedAs = (userRole: UserRoles): UserSetAccessedAs => ({
  type: USER_SET_ACCESSED_AS,
  payload: {
    userRole,
  },
});
