// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Flex, Input, Text } from "@fluentui/react-northstar";
import * as React from "react";
import { useEffect, useState } from "react";
import * as microsoftTeams from "@microsoft/teams-js";

const ConfigPage: React.FC = () => {

  useEffect(() => {
    //At this point, microsoft client SDK is already initialized and we have the context ready
    microsoftTeams.settings.setValidityState(true);
    microsoftTeams.appInitialization.notifySuccess();

    microsoftTeams.settings.registerOnSaveHandler(
      (saveEvent: microsoftTeams.settings.SaveEvent) => {
        // Calculate host dynamically to enable local debugging
        const host = "https://" + window.location.host;
        microsoftTeams.settings.setSettings({
          contentUrl: host + `/?name={loginHint}&tenant={tid}&group={groupId}&theme={theme}`,
          websiteUrl: host + "/public?name={loginHint}&tenant={tid}&group={groupId}&theme={theme}",
          suggestedDisplayName: "Broadcast Development Kit",
          removeUrl: host + "/remove?theme={theme}",
          entityId: "something",
        });
        saveEvent.notifySuccess();
      }
    );

  }, [])
  return (
    <Flex column gap="gap.small" className="tabComponent">
      <Text>Please click <b>Save</b> below to add this extension to the meeting.</Text>
    </Flex>
  );
}

export default ConfigPage;
