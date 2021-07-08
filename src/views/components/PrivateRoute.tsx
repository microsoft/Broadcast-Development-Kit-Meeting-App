// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ATTENDEE_PATH } from "@/models/global/constants";
import AppState from "@/stores/AppState";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { AuthStatusCode } from "../../models/auth/types";


interface BaseComponentDataProps {
  component: React.ComponentType;
  path: string;
  exact?: boolean;
}

type PrivateRouteProps = BaseComponentDataProps;

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const authStatus = useSelector((appState: AppState) => appState.auth.authStatus.status);
  const isAuthenticated = () => authStatus === AuthStatusCode.Authenticated;

  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated() ? <Component /> : <Redirect to={ATTENDEE_PATH} />
      }
    />
  );
};

export default PrivateRoute;
