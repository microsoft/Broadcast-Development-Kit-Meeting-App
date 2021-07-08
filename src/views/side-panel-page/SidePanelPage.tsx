// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { UserProfile, UserRoles } from "@/models/auth/types";
import AppState from "@/stores/AppState";
import * as React from "react";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import * as microsoftTeams from "@microsoft/teams-js";
import LoginPage from "@/views/login-page/LoginPage";
import CallbackPage from "@/views/callback-page/CallbackPage";
import { loadUserProfile } from "@/stores/auth/asyncActions";
import Producer from "@/views/producer/Producer";
import Attendee from "@/views/attendee/Attendee";
import AuthenticateUser from "@/views/authenticate-user/AuthenticateUser";
import PrivateRoute from "@/views/private-route/PrivateRoute";
import {
  ATTENDEE_PATH,
  PRODUCER_PATH,
  AUTHENTICATE_PATH,
  AUTHENTICATION_START_PATH,
  AUTHENTICATION_END_PATH,
} from "@/models/global/constants";
import { FeatureFlagsTypes } from "@/models/config/types";
import { FEATUREFLAG_DISABLE_AUTHENTICATION } from "@/stores/config/constants";

const SidePanelPage: React.FC = () => {
  const dispatch = useDispatch();

  const userProfile: UserProfile = useSelector(
    (appState: AppState) => appState.auth.userProfile
  );

  const authFeatureFlag: FeatureFlagsTypes | undefined = useSelector(
    (appState: AppState) =>
      appState.config.values?.featureFlags &&
      appState.config.values?.featureFlags[FEATUREFLAG_DISABLE_AUTHENTICATION]
  );

  useEffect(() => {
    dispatch(loadUserProfile(microsoftTeams));
  }, []);

  const userRole = userProfile.userRole;
  const authActivated = !(authFeatureFlag && authFeatureFlag.isActive);

  return (
      <Fragment>
        <Switch>
          <PrivateRoute path={PRODUCER_PATH} component={Producer} />
          <Route path={ATTENDEE_PATH} component={Attendee} />
          <Route path={AUTHENTICATE_PATH} component={AuthenticateUser} />
          <Route path={AUTHENTICATION_START_PATH} component={LoginPage} />
          <Route path={AUTHENTICATION_END_PATH} component={CallbackPage} />
          {userRole === (UserRoles.Attendee as UserRoles) && (
            <Redirect to={ATTENDEE_PATH} />
          )}
          {userRole === (UserRoles.Producer as UserRoles) &&
            (authActivated ? (
              <Redirect to={AUTHENTICATE_PATH} />
            ) : (
              <Redirect to={PRODUCER_PATH} />
            ))}
        </Switch>
      </Fragment>
  );
};

export default withRouter(SidePanelPage);
