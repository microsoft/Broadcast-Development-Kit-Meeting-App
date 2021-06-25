import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import AppState from "@/stores/AppState";
import { CALL_SETTINGS_PATH } from "@/models/global/constants";
import { Button, Flex, FlexItem } from "@fluentui/react-northstar";
import { SettingsIcon } from "@fluentui/react-icons-northstar";
import { CallState } from "@/models/calls/types";

const Header: React.FC = (props) => {
  const history = useHistory();
  const match = useRouteMatch<{ id: string }>();
  const isCallEnabled = useSelector(
    (appState: AppState) =>
      appState.privateCall.activeCall?.state === CallState.Established
  );

  const callId = match.params.id;

  const onClickSettingsBtn = (event: any) => {
    history.push(`${CALL_SETTINGS_PATH}${callId}`);
  };

  return (
    <>
      <Button
        style={{
          marginRight: "4px",
          marginBottom: "4px",
        }}
        icon={<SettingsIcon />}
        iconOnly
        circular
        onClick={onClickSettingsBtn}
        disabled={!isCallEnabled}
      />
    </>
  );
};

export default Header;
