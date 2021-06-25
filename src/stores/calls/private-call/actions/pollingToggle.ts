import BaseAction from "@/stores/base/BaseAction";

export const POLLING_TOGGLE = "POLLING_TOGGLE ";

export interface PollingToggle extends BaseAction<{ isPollingEnabled: boolean }> { }

export const togglePolling = (isPollingEnabled: boolean): PollingToggle => ({
    type: POLLING_TOGGLE,
    payload: {
      isPollingEnabled,
    },
  });