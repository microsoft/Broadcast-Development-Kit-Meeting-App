import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

import AppState from "../AppState";
import { authenticateUser, getUserRole } from "@/services/auth";
import { AuthStatusCode, UserProfile, UserRoles } from "../../models/auth/types";
import {
  requestUserProfile,
  requestUserProfileError,
  requestUserProfileFinished,
  updateAuthStatus,
  userAuthenticationError,
  userSetAccessedAs,
} from "./actions";
import { FEATUREFLAG_DISABLE_AUTHENTICATION } from "../config/constants";

export const loadUserProfile =
  (teamsClient: any): ThunkAction<void, AppState, undefined, AnyAction> =>
  async (dispatch, getState) => {

    dispatch(requestUserProfile());

    const config = getState().config.values;
    const disableAuthFlag =
      config?.featureFlags &&
      config?.featureFlags[FEATUREFLAG_DISABLE_AUTHENTICATION];
    const defaultRole = disableAuthFlag?.userRole ?? UserRoles.Producer;
    const isAuthEnabled = !(disableAuthFlag && disableAuthFlag.isActive);

    try {
      console.log({
        isAuthEnabled
      });

      const userRole = isAuthEnabled
        ? await getUserRole(teamsClient, config?.authConfig?.groupId)
        : defaultRole;

      console.log({
        userRole
      })
      const role = userRole === UserRoles.Attendee ? userRole : null;
      const accessedAs = isAuthEnabled ? role : defaultRole;
      const context = getState().teamsContext.values;

      const userProfile: UserProfile = {
        id: context?.userObjectId || null,
        userName: context?.userPrincipalName || "",
        userRole: userRole,
        accessedAs,
      };

      !isAuthEnabled && dispatch(updateAuthStatus(AuthStatusCode.Authenticated,""));
      dispatch(requestUserProfileFinished(userProfile));
    } catch (error) {
      console.error("[auth/asyncActions] loadUserProfile", { error });
      dispatch(
        requestUserProfileError(
          "An error has ocurred while trying to load the user profile.",
          error
        )
      );
    }
  };

export const authenticate =
  (
    teamsClient: any
  ): ThunkAction<Promise<AnyAction>, AppState, undefined, AnyAction> =>
  async (dispatch, getState) => {
    dispatch(updateAuthStatus(AuthStatusCode.Authenticating));
    try {
      const jsonResult = await authenticateUser(teamsClient);
      const authResult = JSON.parse(jsonResult) as Object;
      const apiToken = authResult["access_token"];

      dispatch(userSetAccessedAs(UserRoles.Producer));
      return dispatch(updateAuthStatus(AuthStatusCode.Authenticated, apiToken));
    } catch (error) {
      console.error("[auth/asyncActions] authenticate", { error });
      // If error, the Producer role is no longer required because the
      // AuthenticateUser component will redirect to the attendee view
      dispatch(userSetAccessedAs(UserRoles.Attendee));
      dispatch(updateAuthStatus(AuthStatusCode.AuthenticationError));
      return dispatch(
        userAuthenticationError(
          "An error has ocurred while trying to authenticate the user.",
          error
        )
      );
    }
  };
