// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { StatusCode } from "@/models/global/types";
import AppState from "@/stores/AppState";
import { Divider } from "@fluentui/react-northstar";
import React from "react";
import { useSelector } from "react-redux";

const Footer: React.FC = (props) => {
  const version = useSelector((appState: AppState) =>
    appState.config.status.code === StatusCode.LOADED
      ? `${appState.config.values?.buildNumber}`
      : ""
  );

  return (
    <div id="Footer">
      <Divider size={1} style={{ color: "grey", paddingRight: "4px" }} />
      {props.children}
    </div>
  );
};

export default Footer;
