// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Theme } from "@/models/ui/types";
import {
  teamsDarkV2Theme,
  teamsHighContrastTheme,
  teamsV2Theme,
} from "@fluentui/react-northstar";

export const getTheme = (theme?: string): Theme => {
  switch (theme) {
    case "default":
      return { name: theme, value: teamsV2Theme };
    case "dark":
      return { name: theme, value: teamsDarkV2Theme };
    case "contrast":
      return { name: theme, value: teamsHighContrastTheme };
    default:
      return { name: "default", value: teamsV2Theme };
  }
};
