// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { InjectionStream, NewInjectionStream, NewStream, Stream, StreamProtocol } from "@/models/calls/types";

export interface CallDetailsProps {
  callId: string;
  isStreamSettingsEnabled: boolean;
  isInjectionStreamSettingsEnabled:boolean;
  isCallEnabled: boolean;
  isPrimarySpeakerEnabled: boolean;
  isStageEnabled: boolean;
  mainStreams: Stream[];
  participantStreams: Stream[];
  activeStreams: Stream[];
  injectionStream: InjectionStream | null;
  isPollingEnabled: boolean;
  pollingTime: number;
  meetingId: string;
  callProtocol: StreamProtocol;
  isBotMuted: boolean;
}
