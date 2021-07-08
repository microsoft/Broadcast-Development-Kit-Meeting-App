// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { BotService, ProvisioningStateValues } from "@/models/botService/types";
import { Reducer } from "redux";
import * as ServiceActions from "./actions";
import baseReducer from "../base/BaseReducer";
import { Resource } from "@/services/api";

export interface BotServiceAppState {
  botServices: BotService[];
  loading: boolean;
}

export const INITIAL_STATE: BotServiceAppState = {
  botServices: [],
  loading: true,
};

export const botServiceReducer: Reducer = baseReducer(INITIAL_STATE, {
  [ServiceActions.REQUEST_START_SERVICE_FINISHED](state: BotServiceAppState,
    action: ServiceActions.RequestServiceStatusFinished): BotServiceAppState {
      const botService = action.payload! as Resource<BotService>;
    return {
      ...state,
      botServices: [botService.resource],
      }
  },
  [ServiceActions.REQUEST_STOP_SERVICE_FINISHED](state: BotServiceAppState,
    action: ServiceActions.RequestServiceStatusFinished): BotServiceAppState {
      const botService = action.payload! as Resource<BotService>;
    return {
      ...state,
      botServices: [botService.resource],
      }
  },
  [ServiceActions.REQUEST_SERVICE_STATUS_FINISHED](state: BotServiceAppState,
    action: ServiceActions.RequestServiceStatusFinished): BotServiceAppState {
      const botService = action.payload! as Resource<BotService>;
    return {
      ...state,
      botServices: [botService.resource],
      }
  },
  [ServiceActions.UPDATE_SERVICE_STATUS](state: BotServiceAppState,
    action: ServiceActions.UpdateServiceStatus): BotServiceAppState {
      const service: BotService | undefined = state.botServices.find( (service: BotService) => service.id === action.payload!.serviceId);

      if(!service){
        return state;
      }

      service.infrastructure.provisioningDetails.state.id = action.payload!.status;
      service.infrastructure.provisioningDetails.state.name = ProvisioningStateValues[action.payload!.status];

      const botServices: BotService[] = [...state.botServices.filter( (service: BotService) => service.id !== action.payload!.serviceId),
      service];

    return {
      ...state,
      botServices
      }
  }
});
