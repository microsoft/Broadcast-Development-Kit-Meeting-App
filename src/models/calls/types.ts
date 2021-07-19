// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
export enum StreamProtocol {
  SRT = 0,
  RTMP = 1,
}

export enum CallState {
  Establishing,
  Established,
  Terminating,
  Terminated,
  Idle,
}

export enum CallType {
  Default,
  Event,
}

export interface ConnectionPool {
  used: number;
  available: number;
}

export enum StreamState {
  Disconnected,
  Starting,
  Started,
  Stopping,
  StartingError,
  StoppingError,
  Error,
}

export const ActiveStatuses = [StreamState.Started, StreamState.Stopping];
export const InactiveStatuses = [
  StreamState.Disconnected,
  StreamState.Starting,
];

export enum StreamType {
  VbSS,
  PrimarySpeaker,
  Participant,
}

export const SpecialStreamTypes = [StreamType.VbSS, StreamType.PrimarySpeaker];

export enum StreamMode {
  Caller = 1,
  Listener = 2,
}

export interface CallContext {
  publicContext: null | PublicContext;
  privateContext: null | PrivateContext;
}

export interface PublicContext {}

export interface PrivateContext {
  streamKey: string;
}

export interface PrivateCall {
  id: string;
  joinUrl: string;
  displayName: string; // Call/Room name
  state: CallState; // Initializing, Established, Terminating, Terminated
  errorMessage: string | null; // Error message (if any)
  createdAt: Date;
  meetingType: CallType; // Unknown, Normal, Event
  botFqdn: string | null;
  botIp: string | null;
  connectionPool: ConnectionPool;
  defaultProtocol: StreamProtocol;
  defaultPassphrase: string;
  defaultKeyLength: KeyLength;
  defaultLatency: number;
  defaultMode: StreamMode;
  streams: Stream[];
  injectionStream: InjectionStream | null;
  publicContext: PublicContext | null;
  privateContext: PrivateContext | null;
}

export interface Stream {
  aadId: string;
  id: string; //internal id
  participantGraphId: string; //id form teams meeting
  displayName: string; // User name or Stream name
  photoUrl: string | undefined;
  type: StreamType; // VbSS, PrimarySpeaker, Participant
  state: StreamState; // Disconnected, Initializing, Established, Disconnecting, Error
  isHealthy: boolean;
  healthMessage: string;
  isSharingScreen: boolean;
  isSharingVideo: boolean;
  isSharingAudio: boolean;
  audioMuted: boolean;
  details: StreamDetails | null;
}

export interface StartStreamRequest {
  participantId?: string;
  type: StreamType;
  callId: string;
  protocol: StreamProtocol;
  config: StreamConfiguration;
}

export interface StopStreamRequest {
  participantGraphId: string;
  participantId?: string;
  resourceType: StreamType;
  callId: string;
}

export type StreamConfiguration = {
  streamUrl: string;
  streamKey: string;
  unmixedAudio: boolean;
  audioFormat: number;
  timeOverlay: boolean;
};

export interface StreamSrtConfiguration extends StreamConfiguration {
  keyLength: KeyLength;
  mode: StreamMode;
  latency: number;
}

export interface NewCall {
  callUrl: string;
  status: CallState;
  errorMessage?: string;
}

export interface CallDefaults {
  protocol: StreamProtocol;
  latency: number;
  passphrase: string;
  keyLength: KeyLength;
  mode: StreamMode;
}

export interface NewStream {
  callId: string;
  participantId?: string;
  participantName?: string;
  streamType: StreamType;
  mode?: StreamMode;
  advancedSettings: {
    url?: string;
    latency?: number;
    passphrase?: string;
    keyLength?: KeyLength;
    unmixedAudio: boolean;
  };
}

export interface StreamDetails {
  streamUrl: string;
  passphrase: string;
  latency: number;
  previewUrl: string;
  keyLength: KeyLength;
  audioDemuxed: boolean;
}

export interface ParticipantStreamResponse {
  callId: string;
  participantAadId: string;
  streamState: StreamState;
}

export interface NewInjectionStream {
  callId: string;
  streamUrl?: string;
  streamKey?: string;
  protocol?: StreamProtocol;
  mode?: StreamMode;
  latency?: number;
  enableSsl?: boolean;
  keyLength? : KeyLength;
}

export interface InjectionStream {
  id: string;
  callId: string;
  injectionUrl?: string;
  protocol: StreamProtocol;
  streamMode: StreamMode;
  state?: StreamState;
  startingAt: string;
  startedAt: string;
  endingAt: string;
  endedAt: string;
  latency: number;
  passphrase: string;
  audioMuted: boolean;
  keyLength: KeyLength;
}

export interface PublicCall {
  state: CallState;
  streamState: StreamState;
  publicContext: PublicContext;
}

export interface NewStreamSettingsOpenParameters {
  callId: string;
  streamType: StreamType;
  participantId?: string;
  participantName?: string;
}

export interface NewInjectionStreamSettingsOpenParameters {
  callId: string;
}

export interface CallStreamKey {
  streamKey: string;
  callId: string;
}

export enum KeyLength {
  None = 0,
  SixteenBytes = 16,
  TwentyFourBytes = 24,
  ThirtyTwoBytes = 32,
}
