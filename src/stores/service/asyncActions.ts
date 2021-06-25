import { BotService, ProvisioningStateValues } from "@/models/botService/types";
import { CallService } from "@/services/CallService";
import AppState from "@/stores/AppState";
import { VirtualMachineService } from "@/services/VirtualMachineService";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  requestServiceStatus,
  requestServiceStatusFinished,
  requestStartService,
  requestStartServiceFinished,
  requestStopService,
  requestStopServiceFinished,
  serviceNotFoundError,
  updateServiceStatus,
} from "./actions";
import { DEFAULT_SERVICE_ID } from "./constants";

export const getVirtualMachineStateAsync =
  (): ThunkAction<void, AppState, undefined, AnyAction> => async (dispatch) => {
    dispatch(requestServiceStatus());
    const response = await VirtualMachineService.getVirtualMachineState(
      DEFAULT_SERVICE_ID
    );
    dispatch(requestServiceStatusFinished({ payload: response }));
  };

export const startVirtualMachineAsync =
  (): ThunkAction<void, AppState, undefined, AnyAction> =>
  async (dispatch, getState) => {
    const state = getState();
    const service = state.botService.botServices.find(
      (s: BotService) => s.id === DEFAULT_SERVICE_ID
    );

    if (service) {
      dispatch(requestStartService());

      dispatch(
        updateServiceStatus(
          DEFAULT_SERVICE_ID,
          ProvisioningStateValues.Provisioning
        )
      );

      const response = await VirtualMachineService.startVirtualMachine(
        DEFAULT_SERVICE_ID
      );
      dispatch(requestStartServiceFinished({ payload: response }));
    } else {
      dispatch(
        serviceNotFoundError(`Service: '${DEFAULT_SERVICE_ID}' not Found`)
      );
    }
  };

export const stopVirtualMachineAsync =
  (): ThunkAction<void, AppState, undefined, AnyAction> =>
  async (dispatch, getState) => {
    const state = getState();
    const callId = state.privateCall.activeCall?.id;
    if (callId) {
      await CallService.endCall(callId);
    }

    const service = state.botService.botServices.find(
      (s: BotService) => s.id === DEFAULT_SERVICE_ID
    );

    if (service) {
      dispatch(requestStopService());

      dispatch(
        updateServiceStatus(
          DEFAULT_SERVICE_ID,
          ProvisioningStateValues.Deprovisioning
        )
      );

      const response = await VirtualMachineService.stopVirtualMachine(
        DEFAULT_SERVICE_ID
      );
      dispatch(requestStopServiceFinished({ payload: response }));
    } else {
      dispatch(
        serviceNotFoundError(`Service: '${DEFAULT_SERVICE_ID}' not Found`)
      );
    }
  };
