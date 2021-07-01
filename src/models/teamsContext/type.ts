// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export interface ITeamsMeeting {
    hasCallInProgress: boolean;
    callId: string | null;
  }

  export enum FrameContexts {
    Settings = "settings",
    PreMeeting = "content",
    SidePanel = "sidePanel",
    Remove = "remove",
    Initializing = "initializing",
    Unknown = "unknown",
  }
