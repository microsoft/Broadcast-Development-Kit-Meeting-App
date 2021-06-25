import AppState from "@/stores/AppState";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { ATTENDEE_PATH } from "@/models/global/constants";
import { AuthStatusCode } from "@/models/auth/types";

interface IPrivateRouteDataProps {
  component: React.ComponentType;
  path: string;
  exact?: boolean;
}

const PrivateRoute: React.FC<IPrivateRouteDataProps> = ({
  component: Component,
  ...rest
}) => {
  const authStatus: AuthStatusCode = useSelector((appState: AppState) => appState.auth.authStatus.status)
  const isAuthenticated: boolean = authStatus === AuthStatusCode.Authenticated;

  return (
    <Route
      {...rest}
      render={() =>
        isAuthenticated ? <Component /> : <Redirect to={ATTENDEE_PATH} />
      }
    />
  );
};

export default PrivateRoute;
