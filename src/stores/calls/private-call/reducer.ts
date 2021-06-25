import { Resource } from "@/services/api";
import baseReducer from "@/stores/base/BaseReducer";
import { Reducer } from "redux";
import {
  CallContext,
  CallState,
  CallStreamKey,
  NewCall,
  NewInjectionStream,
  NewStream,
  PrivateCall,
  Stream,
  StreamMode,
  StreamProtocol,
  StreamType,
} from "@/models/calls/types";
import * as PrivateCallsActions from "./actions";
import { PollingSettings } from "@/models/global/types";

export const PRODUCER_DEFAULT_POLLING_TIME = 2000;

export type PrivateCallState = {
  callContext: CallContext;
  activeCall: undefined | null | PrivateCall;
  newCall: null | NewCall;
  newStream: null | NewStream;
  newInjectionStream: null | NewInjectionStream;
  activeCallsLoading: boolean;
  activeCallsError: null | string;
} & PollingSettings;

export const INITIAL_STATE: PrivateCallState = {
  callContext: {
    publicContext: null,
    privateContext: null,
  },
  newStream: null,
  newInjectionStream: null,
  newCall: null,
  activeCall: undefined,
  activeCallsLoading: false,
  activeCallsError: null,
  isPollingEnabled: false,
  pollingTime: PRODUCER_DEFAULT_POLLING_TIME,
};

export const callsReducer: Reducer = baseReducer(INITIAL_STATE, {
  [PrivateCallsActions.REQUEST_JOIN_CALL](
    state: PrivateCallState,
    action: PrivateCallsActions.RequestJoinCall
  ): PrivateCallState {
    return {
      ...state,
      newCall: {
        callUrl: action.payload!.callUrl,
        status: CallState.Establishing,
      },
    };
  },
  [PrivateCallsActions.REQUEST_JOIN_CALL_FINISHED](
    state: PrivateCallState,
    action: PrivateCallsActions.RequestJoinCallFinished
  ): PrivateCallState {
    /*
      NOTE: If the action is exceuted, is because it is not flagged as error,
      so we can infer the payload type
    */
    // add new call to active calls
    const resource = action.payload! as Resource<PrivateCall>;
    const call = resource.resource;
    const callWitDefaults = fillDefaults(call, defaultCallValues);

    return {
      ...state,
      newCall: null,
      activeCall: callWitDefaults,
    };
  },
  [PrivateCallsActions.REQUEST_CALL_FINISHED](
    state: PrivateCallState,
    action: PrivateCallsActions.RequestCallFinished
  ): PrivateCallState {
    const existingCall = state.activeCall;

    const payloadCall = action.payload as PrivateCall;

    const call = payloadCall
      ? fillDefaults(payloadCall, existingCall ?? defaultCallValues)
      : payloadCall;

    return {
      ...state,
      activeCall: call,
    };
  },
  [PrivateCallsActions.REQUEST_DISCONNECT_CALL_FINISHED](
    state: PrivateCallState,
    action: PrivateCallsActions.RequestDisconnectCallFinished
  ): PrivateCallState {
    return {
      ...state,
      activeCall: null,
    };
  },
  [PrivateCallsActions.REQUEST_START_STREAM_FINISHED](
    state: PrivateCallState,
    action: PrivateCallsActions.RequestStartStreamFinished
  ): PrivateCallState {
    /*
      NOTE: If the action is exceuted, is because it is not flagged as error,
      so we can infer the payload type
    */

    const resource = action.payload! as Resource<Stream>;

    const updatedStream: Stream = {
      ...resource.resource,
    };

    const call = state.activeCall;

    return {
      ...state,
      activeCall: call
        ? {
            ...call,
            streams: call.streams.map((stream) =>
              stream.id === updatedStream.id ? updatedStream : stream
            ),
          }
        : // other call
          call,
    };
  },
  [PrivateCallsActions.REQUEST_STOP_STREAM_FINISHED](
    state: PrivateCallState,
    action: PrivateCallsActions.RequestStopStream
  ): PrivateCallState {
    /*
      NOTE: If the action is exceuted, is because it is not flagged as error,
      so we can infer the payload type
    */

    const resource = action.payload! as Resource<Stream>;

    const updatedStream: Stream = {
      ...resource.resource,
    };

    const call = state.activeCall;

    return {
      ...state,
      activeCall: call
        ? {
            ...call,
            streams: call.streams.map((stream) =>
              stream.id === updatedStream.id ? updatedStream : stream
            ),
          }
        : // other call
          call,
    };
  },
  [PrivateCallsActions.OPEN_NEW_STREAM_SETTINGS](
    state: PrivateCallState,
    action: PrivateCallsActions.OpenNewStreamSettings
  ): PrivateCallState {
    const call = state.activeCall;

    if (!call) {
      return state;
    }

    const payload = action.payload!;

    return {
      ...state,
      newStream: {
        callId: payload.callId,
        participantId: payload.participantId,
        streamType: payload.streamType,
        participantName: payload.participantName,
        mode: call.defaultMode,
        advancedSettings: {
          latency: call.defaultLatency,
          passphrase: call.defaultPassphrase,
          unmixedAudio: false,
        },
      },
    };
  },
  [PrivateCallsActions.CLOSE_NEW_STREAM_SETTINGS](
    state: PrivateCallState,
    action: PrivateCallsActions.CloseNewStreamSettings
  ): PrivateCallState {
    return {
      ...state,
      newStream: null,
    };
  },
  [PrivateCallsActions.OPEN_NEW_INJECTION_STREAM_SETTINGS](
    state: PrivateCallState,
    action: PrivateCallsActions.OpenNewInjectionStreamSettings
  ): PrivateCallState {
    const call = state.activeCall;
    if (!call) {
      return state;
    }

    return {
      ...state,
      newInjectionStream: { callId: call.id },
    };
  },
  [PrivateCallsActions.CLOSE_NEW_INJECTION_STREAM_SETTINGS](
    state: PrivateCallState,
    action: PrivateCallsActions.CloseNewInjectionStreamSettings
  ): PrivateCallState {
    return {
      ...state,
      newInjectionStream: null,
    };
  },
  [PrivateCallsActions.UPDATE_CALL_DEFAULTS](
    state: PrivateCallState,
    action: PrivateCallsActions.UpdateCallDefaults
  ): PrivateCallState {
    const defaults = action.payload!.defaults;

    const call = state.activeCall;

    if (!call) {
      return state;
    }

    const updated: PrivateCall = {
      ...call,
      defaultProtocol: defaults.protocol,
      defaultLatency: defaults.latency ?? call.defaultLatency,
      defaultPassphrase: defaults.passphrase ?? call.defaultPassphrase,
      defaultMode: defaults.mode ?? call.defaultMode,
    };

    return {
      ...state,
      activeCall: updated,
    };
  },
  [PrivateCallsActions.POLLING_TOGGLE](
    state: PrivateCallState,
    action: PrivateCallsActions.PollingToggle
  ): PrivateCallState {
    return {
      ...state,
      isPollingEnabled: action.payload!.isPollingEnabled,
    };
  },
  [PrivateCallsActions.REQUEST_REFRESH_STREAM_KEY_FINISHED](
    state: PrivateCallState,
    action: PrivateCallsActions.RequestRefreshStreamKeyFinished
  ): PrivateCallState {
    /*
      NOTE: If the action is executed, is because it is not flagged as error,
      so we can infer the payload type
    */

    const payload = action.payload! as CallStreamKey;
    const call = state.activeCall!;

    if (!call) {
      return state;
    }

    const updated: PrivateCall = {
      ...call,
      privateContext: {
        streamKey: payload.streamKey,
      },
    };

    return {
      ...state,
      activeCall: updated,
    };
  },
});

const defaultCallValues = {
  defaultLatency: 750,
  defaultPassphrase: "",
};

const fillDefaults = (
  call: PrivateCall,
  defaults: Partial<PrivateCall>
): PrivateCall => ({
  ...call,
  defaultLatency: defaults.defaultLatency ?? defaultCallValues.defaultLatency,
  defaultPassphrase:
    defaults.defaultPassphrase ?? defaultCallValues.defaultPassphrase,
  defaultProtocol: defaults.defaultProtocol ?? StreamProtocol.RTMP,
  defaultMode: defaults.defaultMode ?? StreamMode.Listener,
  streams: call.streams ? call.streams.map((o) => ({
    ...o,
    audioSharing: o.type !== StreamType.VbSS,
  })):[],
});
