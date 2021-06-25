import {
  AuthStatusCode,
  AuthStatus,
  UserProfile,
} from "../../models/auth/types";
import { Reducer } from "redux";
import baseReducer from "../base/BaseReducer";
import * as AuthActions from "./actions";

export interface AuthState {
  userProfile: UserProfile;
  authStatus: AuthStatus;
}

export const INITIAL_STATE: AuthState = {
  userProfile: {
    id: null,
    userName: null,
    userRole: null,
    accessedAs: null,
  },
  authStatus: {
    status: AuthStatusCode.Unauthenticated,
    errorMessage: null,
    apiToken: null,
  },
};

export const authReducer: Reducer = baseReducer(INITIAL_STATE, {
  [AuthActions.REQUEST_USER_PROFILE_FINISHED](
    state: AuthState,
    action: AuthActions.RequestUserProfileFinished
  ): AuthState {
    return {
      ...state,
      userProfile: {
        ...state.userProfile,
        ...action.payload!.userProfile
      },
    };
  },
  [AuthActions.UPDATE_AUTH_STATUS](
    state: AuthState,
    action: AuthActions.UpdateAuthStatus
  ): AuthState {
    return {
      ...state,
      authStatus: {
        ...state.authStatus,
        status: action.payload!.status,
        apiToken: action.payload!.apiToken?? null
      },
    };
  },
  [AuthActions.USER_SET_ACCESSED_AS](
    state: AuthState,
    action: AuthActions.UserSetAccessedAs
  ): AuthState {
    return {
      ...state,
      userProfile: {
        ...state.userProfile,
        accessedAs: action.payload!.userRole,
      },
    };
  },
});
