import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Flex,
  Loader,
  Provider as FluentProvider,
  teamsDarkTheme,
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
import { AlertMessage } from '@/views/components/AlertMessage';
import PreMeetingPage from "./views/pre-meeting-page/PreMeetingPage";
import RemovePage from "./views/remove-page/RemovePage";

const App: React.FC = () => {
  microsoftTeams.initialize();

  const dispatch = useDispatch();
  const teamsContext: TeamsContextState = useSelector((appState: AppState) => appState.teamsContext);
  const config: ConfigState = useSelector((appState: AppState) => appState.config);

  useEffect(() => {
    dispatch(loadConfig());
    dispatch(getExtensionContext(microsoftTeams));
  }, []);

  const isExtensionReady = teamsContext.status.code === StatusCode.LOADED && config.status.code === StatusCode.LOADED;
  const frameContext = teamsContext.values?.frameContext as FrameContexts | undefined;

  const renderContent = (isExtensionReady: boolean, frameContext?: FrameContexts) => {
    if (!isExtensionReady) {
      return (
        <Flex vAlign="center" hAlign="center" style={{ height: '100vh' }}>
          <Loader label="Loading extension..." labelPosition="below" />
        </Flex>)
    } else {
      const { SidePanel, PreMeeting, Settings, Remove } = FrameContexts;
      switch (frameContext) {
        case SidePanel:
          return <SidePanelPage />
        case PreMeeting:
          return <PreMeetingPage />
        case Settings:
          return <ConfigPage />
        case Remove:
          return <RemovePage />
        default:
          return null;
      }
    }
  }

  return (
    <FluentProvider theme={teamsDarkTheme}>
      <div
        id="app"
        style={{
          width: "100%",
          minHeight: "100vh",
          overflow: "hidden",
          margin: "auto",
          border: "none",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgb(32, 31, 31)"
        }}
      >
        <AlertMessage />
        {
          renderContent(isExtensionReady, frameContext)
        }
      </div>
    </FluentProvider>
  );
};

export default App;
