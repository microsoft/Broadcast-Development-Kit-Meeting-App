// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import AppState from '@/stores/AppState';
import { createSelector} from 'reselect';
import { BotServiceAppState } from './reducer';

export const selectBotService = createSelector(
  (state: AppState) => state.botService,
  (state: AppState, botServiceId: string) => botServiceId,
  _selectBotService,
)

function _selectBotService(state: BotServiceAppState, botServiceId: string){
  const botService = state.botServices.find(service => service.id === botServiceId);
  return botService;
}