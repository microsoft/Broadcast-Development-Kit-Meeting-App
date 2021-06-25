import React, { useEffect } from "react";
import * as microsoftTeams from "@microsoft/teams-js";
import { Flex, Loader } from "@fluentui/react-northstar";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { authenticate } from "../../stores/auth/asyncActions";
import { AuthStatusCode } from "../../models/auth/types";
import AppState from "@/stores/AppState";
import { ATTENDEE_PATH, PRODUCER_PATH } from "@/models/global/constants";

const AuthenticateUser: React.FC= () => {
  const dispatch = useDispatch();
  const authStatus = useSelector((appState: AppState) => appState.auth.authStatus.status )

  useEffect(() => {
    dispatch(authenticate(microsoftTeams));
  }, []);

  const renderContent = () => {
    switch (authStatus) {
      case AuthStatusCode.Authenticating:
        return (
          <Flex vAlign="center" hAlign="center" style={{ height: '100vh' }}>
            <Loader label="Authenticating user..." labelPosition="below" />
          </Flex>
        )
      case AuthStatusCode.Authenticated:
        return <Redirect to={PRODUCER_PATH} />
      case AuthStatusCode.AuthenticationError:
        return <Redirect to={ATTENDEE_PATH} />
    }
  }

  return (
    <>
      { renderContent() }
    </>
	);
};

export default AuthenticateUser
