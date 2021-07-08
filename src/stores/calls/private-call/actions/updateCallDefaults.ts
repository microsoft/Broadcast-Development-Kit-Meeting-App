// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import BaseAction from "@/stores/base/BaseAction";
import { CallDefaults} from "../../../../models/calls/types";

export const UPDATE_CALL_DEFAULTS = 'UPDATE_CALL_DEFAULTS';
export interface UpdateCallDefaults
  extends BaseAction<{
    callId: string;
    defaults: CallDefaults;
  }> {}

export const updateCallDefaults = ({
  callId,
  defaults,
}: {
  callId: string;
  defaults: CallDefaults;
}): UpdateCallDefaults => ({
  type: UPDATE_CALL_DEFAULTS,
  payload: {
    callId,
    defaults,
  },
});