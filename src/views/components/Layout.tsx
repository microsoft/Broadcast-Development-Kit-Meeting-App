// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import * as React from "react";
import { Flex } from "@fluentui/react-northstar";

interface LayoutProps {
  footer?: React.ReactNode;
}

//TODO: Move styles into css file
export const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <Flex
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Flex
        column
        style={{
          height: "92%",
          minHeight: "92%",
          borderColor: "blue",
        }}
      >
        {props.children}
      </Flex>
    </Flex>
  );
};
