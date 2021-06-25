import { NewInjectionStreamSettingsOpenParameters, NewStreamSettingsOpenParameters } from "@/models/calls/types";
import BaseAction from "@/stores/base/BaseAction";

export const OPEN_NEW_INJECTION_STREAM_SETTINGS = "OPEN_NEW_INJECTION_STREAM_SETTINGS";
export const CLOSE_NEW_INJECTION_STREAM_SETTINGS = "CLOSE_NEW_INJECTION_STREAM_SETTINGS";

export interface OpenNewInjectionStreamSettings
  extends BaseAction<NewInjectionStreamSettingsOpenParameters> {}
export interface CloseNewInjectionStreamSettings extends BaseAction<undefined> {}

export const openNewInjectionStreamSettings = ({
  callId,
}: NewInjectionStreamSettingsOpenParameters): OpenNewInjectionStreamSettings => ({
  type: OPEN_NEW_INJECTION_STREAM_SETTINGS,
  payload: {
    callId,
  },
});

export const closeNewInjectionStreamSettings = (): CloseNewInjectionStreamSettings => ({
  type: CLOSE_NEW_INJECTION_STREAM_SETTINGS,
});
