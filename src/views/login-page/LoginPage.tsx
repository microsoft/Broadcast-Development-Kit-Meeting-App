import React from "react";
import { useSelector } from "react-redux";
import { Button, Flex, Text } from "@fluentui/react-northstar";

import AppState from "@/stores/AppState";
import { redirectUser } from "@/services/auth";
import { AuthConfig } from "@/models/auth/types";
import { TeamsContextState } from "@/stores/teamsContext/reducer";

const LoginPage: React.FC = () => {
  const authConfig: AuthConfig = useSelector((appState: AppState) => appState.config.values?.authConfig)!;
  const context: TeamsContextState = useSelector((appState: AppState) => appState.teamsContext);

  return (
    <Flex
      style={{
        paddingLeft: "4px",
        paddingRight: "4px",
        marginTop: "0px !important",
        height: "100vh"
      }}
      column
      hAlign="center"
      vAlign="center"
    >
      <Text className="tabComponent">
        In order to configure the settings for this meeting you need to authenticate against the APIs using your credentials. 
        Please click the <b>Sign In</b> button below to authenticate. To cancel the operation and continue as an attendee, please close this popup.
      </Text>
      <Button
        style={{ marginTop: "12px" }}
        primary
        content="Sign In"
        onClick={() => { redirectUser(authConfig, context.values?.loginHint || "") }}
      />
    </Flex>
  )
}

export default LoginPage;
