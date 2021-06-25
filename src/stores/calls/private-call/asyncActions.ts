import {
  CallStreamKey,
  InjectionStream,
  NewInjectionStream,
  PrivateCall,
  StartStreamRequest,
  StopStreamRequest,
  Stream,
  StreamSrtConfiguration,
} from "@/models/calls/types";
import { ApiClient, Resource } from "@/services/api";
import { CallService } from "@/services/CallService";
import AppState from "@/stores/AppState";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  closeNewInjectionStreamSettings,
  requestCall,
  requestCallFinished,
  requestDisconnectCall,
  requestDisconnectCallFinished,
  requestJoinCall,
  requestJoinCallFinished,
  requestMuteBot,
  requestMuteBotFinished,
  requestRefreshStreamKey,
  requestRefreshStreamKeyFinished,
  requestStartInjectionStream,
  requestStartInjectionStreamFinished,
  requestStartStream,
  requestStartStreamFinished,
  requestStopStream,
  requestStopStreamFinished,
  requestStoptInjectionStream,
  requestStoptInjectionStreamFinished,
  requestUnmuteBot,
  requestUnmuteBotFinished,
} from "./actions";
import { closeNewStreamSettings } from "./actions/newStreamSettings";

export const getCallByMeetingIdAsync =
  (meetingId: string): ThunkAction<void, AppState, undefined, AnyAction> =>
  async (dispatch) => {
    dispatch(requestCall());
    const call = await CallService.getCallByMeetingId(meetingId);
    dispatch(requestCallFinished({ payload: call }));
  };

export const joinCallAsync =
  (meetingUrl: string): ThunkAction<void, AppState, undefined, AnyAction> =>
  async (dispatch, getState) => {
    dispatch(requestJoinCall(meetingUrl));
    
    const joinCallResponse = await CallService.initializeCall(meetingUrl);

    dispatch(requestJoinCallFinished({ payload: joinCallResponse }));
  };

export const disconnectCallAsync =
  (callId: string): ThunkAction<void, AppState, undefined, AnyAction> =>
  async (dispatch, getState) => {
    const call = getState().privateCall.activeCall;

    if (call) {
      dispatch(requestDisconnectCall());

      const disonnectCallResponse = await ApiClient.delete<
        Resource<PrivateCall>
      >({ url: `/call/${callId}` });
      /*
          TODO: Review
          At the moment, when we disconnect a call, we just update the call in the state.
          Should we remove it from the state?
        */
      dispatch(
        requestDisconnectCallFinished({ payload: disonnectCallResponse })
      );
    }
  };

export const startStreamAsync =
  (
    request: StartStreamRequest
  ): ThunkAction<void, AppState, undefined, AnyAction> =>
  async (dispatch, getState) => {
    const state = getState();

    const call = state.privateCall.activeCall;
    if (!call) {
      return;
    }

    const stream = call.streams.find((s) => s.id === request.participantId);
    if (!stream) {
      return;
    }

    dispatch(requestStartStream());

    const startStreamResponse = await ApiClient.post<Resource<Stream>>({
      url: `/call/${call.id}/stream/start-extraction`,
      payload: {
        callId: call.id,
        resourceType: stream.type,
        participantId: stream.id,
        participantGraphId: stream.participantGraphId,
        protocol: request.protocol,
        latency: (request.config as StreamSrtConfiguration).latency,
        mode: (request.config as StreamSrtConfiguration).mode,
        streamUrl: request.config.streamUrl || null,
        streamKey: request.config.streamKey || null,
        timeOverlay: request.config.timeOverlay,
        audioFormat: request.config.audioFormat,
      },
    });

    dispatch(requestStartStreamFinished({ payload: startStreamResponse }));

    /*
        TODO: Review
        We should analyze how to handle UI state in the application state, to improve the semantic
        of the code, and make it more readable or understandable.
      */
    dispatch(closeNewStreamSettings());
  };

export const stopStreamAsync =
  (participantId: string): ThunkAction<void, AppState, undefined, AnyAction> =>
  async (dispatch, getState) => {
    const state = getState();
    const call = state.privateCall.activeCall;
    if (!call) {
      return;
    }

    const stream = call.streams.find((o) => o.id === participantId);
    if (!stream) {
      return;
    }

    dispatch(requestStopStream());

    // call api
    const stopStreamResponse = await ApiClient.post<Resource<Stream>>({
      url: `/call/${call.id}/stream/stop-extraction`,
      payload: {
        callId: call.id,
        resourceType: stream.type,
        participantId: stream.id,
        participantGraphId: stream.participantGraphId,
      },
    });

    dispatch(requestStopStreamFinished({ payload: stopStreamResponse }));
  };

export const refreshStreamKeyAsync =
  (callId: string): ThunkAction<void, AppState, undefined, AnyAction> =>
  async (dispatch) => {
    dispatch(requestRefreshStreamKey());

    const refreshStreamKeyResponse = await ApiClient.post<CallStreamKey>({
      url: `/call/${callId}/generate-stream-key`,
    });

    dispatch(
      requestRefreshStreamKeyFinished({ payload: refreshStreamKeyResponse })
    );
  };

export const startInjectionAsync =
  ({
    callId,
    streamUrl,
    streamKey,
    protocol,
    mode,
    latency,
    enableSsl,
  }: NewInjectionStream): ThunkAction<void, AppState, undefined, AnyAction> =>
  async (dispatch, getState) => {
    // TODO: Review this action dispatch(injectionRequestCancelled());

    dispatch(requestStartInjectionStream());
    // Call API
    const startInjectionResponse = await ApiClient.post<InjectionStream>({
      url: `/call/${callId}/stream/start-injection`,
      payload: {
        callId,
        streamUrl,
        streamKey,
        protocol,
        mode,
        latency,
        enableSsl,
      },
    });

    dispatch(
      requestStartInjectionStreamFinished({ payload: startInjectionResponse })
    );

    dispatch(closeNewInjectionStreamSettings()); // ask if necessary
  };

export const stopInjectionAsync =
  (
    callId: string,
    streamId: string
  ): ThunkAction<void, AppState, undefined, AnyAction> =>
  async (dispatch, getState) => {
    dispatch(requestStoptInjectionStream());
    const response = await ApiClient.post<InjectionStream>({
      url: `/call/${callId}/stream/${streamId}/stop-injection`,
    });

    dispatch(requestStoptInjectionStreamFinished({ payload: response }));
  };

export const muteBotAsync =
  (callId: string): ThunkAction<void, AppState, undefined, AnyAction> =>
  async (dispatch) => {
    dispatch(requestMuteBot());
    var response = await CallService.mute(callId);
    dispatch(
      requestMuteBotFinished({
        payload: response,
      })
    );
  };

export const unmuteBotAsync =
  (callId: string): ThunkAction<void, AppState, undefined, AnyAction> =>
  async (dispatch) => {
    dispatch(requestUnmuteBot());

    var response = await CallService.unmute(callId);

    dispatch(
      requestUnmuteBotFinished({
        payload: response,
      })
    );
  };
