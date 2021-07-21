// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ActiveStatuses, CallState, InactiveStatuses, SpecialStreamTypes, StreamType } from '@/models/calls/types';
import AppState from '@/stores/AppState';
import { CallDetailsProps } from '@/views/producer/call-details/types';
import { createSelector} from 'reselect';
import { TeamsContextState } from '../teamsContext/reducer';
import { PrivateCallState } from './private-call/reducer';

export const selectCallDetailsProps = createSelector((state: AppState)=> state.privateCall,
(state: AppState) => state.teamsContext,
_selectCallDetailsProps);

function _selectCallDetailsProps(callState: PrivateCallState, contextState: TeamsContextState ): CallDetailsProps{
 const { activeCall: call, newStream, newInjectionStream, isPollingEnabled, pollingTime, isBotMuted} = callState;
 const meetingId = contextState.values?.meetingId || '';

 if(!call){
   return {
    callId: '',
    isStreamSettingsEnabled: newStream !== null,
    isInjectionStreamSettingsEnabled: newInjectionStream !== null,
    isPrimarySpeakerEnabled: false,
    isStageEnabled: false,
    isCallEnabled: false,
    mainStreams: [],
    participantStreams: [],
    activeStreams: [],
    injectionStream: null,
    isPollingEnabled,
    pollingTime,
    meetingId,
    callProtocol: 0,
    isBotMuted: false
   }
 }

 return {
   callId: call.id,
  isStreamSettingsEnabled: newStream !== null,
  isInjectionStreamSettingsEnabled: newInjectionStream !== null,
  isPrimarySpeakerEnabled: call.streams.filter(
    (o) => o.type === StreamType.Participant && o.isSharingVideo && o.isSharingAudio && !o.audioMuted
  ).length > 0,
  isStageEnabled: call.streams.filter((o) => o.type === StreamType.Participant && o.isSharingScreen).length > 0,
  isCallEnabled: call.state === CallState.Established,
  isPollingEnabled,
  pollingTime,
  meetingId,
  mainStreams: call.streams.filter(
    (o) =>
      SpecialStreamTypes.includes(o.type) &&
      InactiveStatuses.includes(o.state)
  ),
  participantStreams: call.streams.filter(
    (o) =>
      o.type === StreamType.Participant && InactiveStatuses.includes(o.state)
  ),
  activeStreams: call.streams.filter((o) => ActiveStatuses.includes(o.state)),
  injectionStream: call.injectionStream,
  callProtocol: call.defaultProtocol,
  isBotMuted: isBotMuted
 }
}
