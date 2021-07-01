// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { NewStreamSettingsOpenParameters } from "@/models/calls/types";
import BaseAction from "@/stores/base/BaseAction";

export const OPEN_NEW_STREAM_SETTINGS = "OPEN_NEW_STREAM_SETTINGS";
export const CLOSE_NEW_STREAM_SETTINGS = "CLOSE_NEW_STREAM_SETTINGS";

export interface OpenNewStreamSettings
  extends BaseAction<NewStreamSettingsOpenParameters> {}
export interface CloseNewStreamSettings extends BaseAction<undefined> {}

export const openNewStreamSettings = ({
  callId,
  streamType,
  participantId,
  participantName,
}: NewStreamSettingsOpenParameters): OpenNewStreamSettings => ({
  type: OPEN_NEW_STREAM_SETTINGS,
  payload: {
    callId,
    streamType,
    participantId,
    participantName,
  },
});

export const closeNewStreamSettings = (): CloseNewStreamSettings => ({
  type: CLOSE_NEW_STREAM_SETTINGS,
});
