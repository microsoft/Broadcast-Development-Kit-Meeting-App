// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import React, { CSSProperties, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Provider as FluentProvider,
} from "@fluentui/react-northstar";

import * as microsoftTeams from "@microsoft/teams-js";
import AppState from "@/stores/AppState";
import { loadConfig } from "@/stores/config/asyncActions";
import { ConfigState } from "@/stores/config/reducer";
import { getExtensionContext } from "@/stores/teamsContext/asyncActions";
import { TeamsContextState } from "@/stores/teamsContext/reducer";
import { StatusCode } from "@/models/global/types";
import { FrameContexts } from "@/models/teamsContext/type";
import ConfigPage from "@/views/config-page/ConfigPage";
import SidePanelPage from "@/views/side-panel-page/SidePanelPage";
import { AlertMessage } from "@/views/components/AlertMessage";
import PreMeetingPage from "./views/pre-meeting-page/PreMeetingPage";
import RemovePage from "./views/remove-page/RemovePage";
import { getTheme } from "./services/msteams/Theme";
import { setTheme } from "./stores/ui/actions";
import { Theme } from "./models/ui/types";

const App: React.FC = () => {

  const updateTheme = (theme: string | undefined): void => {
    const msTeamsTheme = getTheme(theme);
    dispatch(setTheme(msTeamsTheme));
  }

  microsoftTeams.initialize();
  microsoftTeams.registerOnThemeChangeHandler(updateTheme);

  const dispatch = useDispatch();
  const teamsContext: TeamsContextState = useSelector(
    (appState: AppState) => appState.teamsContext
  );
  const config: ConfigState = useSelector(
    (appState: AppState) => appState.config
  );

  const msTeamsTheme: Theme = useSelector((appState: AppState) => appState.ui.theme);

  useEffect(() => {
    dispatch(loadConfig());
    dispatch(getExtensionContext(microsoftTeams));
  }, []);

  const isExtensionReady =
    teamsContext.status.code === StatusCode.LOADED &&
    config.status.code === StatusCode.LOADED;
  const frameContext = teamsContext.values?.frameContext as
    | FrameContexts
    | undefined;

  const renderContext = (frameContext?: FrameContexts) => {
    const { SidePanel, PreMeeting, Settings, Remove } = FrameContexts;
    switch (frameContext) {
      case SidePanel:
        return <SidePanelPage />;
      case PreMeeting:
        return <PreMeetingPage />;
      case Settings:
        return <ConfigPage />;
      case Remove:
        return <RemovePage />;
      default:
        return null;
    }
  };

  const appStyles = {
    width: "100%",
    maxHeight: "100vh",
    overflow: "auto",
    overflowY: "auto",
    overflowX: "hidden",
    margin: "auto",
    border: "none",
    display: "flex",
    flexDirection: "column",
    backgroundColor: (msTeamsTheme.name === "dark" ? "rgb(32, 31, 31)" : undefined)
  }

  return (
    <Fragment>
      {isExtensionReady && (
        <FluentProvider theme={msTeamsTheme.value}>
          <div id="app" style={appStyles as CSSProperties}>
            <AlertMessage />
            {renderContext(frameContext)}
          </div>
        </FluentProvider>
      )}
    </Fragment>
  );
};

export default App;
