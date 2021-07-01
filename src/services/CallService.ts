// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ApiClient, RequestResponse, Resource } from "./api";
import { ApiError } from "@/models/error/types";
import { InjectionStream, PrivateCall, StartStreamRequest, StopStreamRequest, Stream } from "@/models/calls/types";

export class CallService {
  private static readonly baseEndpoint = "call";

  public static async getCallByMeetingId(
    meetingId: string
  ): Promise<RequestResponse<PrivateCall | null>> {
    const response = await ApiClient.get<PrivateCall>({
      url: `/call/by-meeting-id/${meetingId}`,
    });

    const isError = response instanceof ApiError;

    if (isError) {
      //Check if it is a 404 NOT FOUND;
      const errorResponse = response as ApiError;
      if (errorResponse.status === 404) {
        //If the call/participant was not found, we don't want to throw an error.
        return null;
      }
    }

    return response;
  }

  public static async initializeCall(
    meetingUrl: string
  ): Promise<RequestResponse<Resource<PrivateCall>>> {
    const joinCallResponse = await ApiClient.post<Resource<PrivateCall>>({
      url: "/call/initialize-call",
      payload: {
        MeetingUrl: meetingUrl,
      },
    });
    return joinCallResponse;
  }

  public static async endCall(callId: string): Promise<RequestResponse<Resource<PrivateCall>>> {
    const response = ApiClient.delete<Resource<PrivateCall>>({
      url: `/call/${callId}`,
    });

    return response;
  }

  public static async startStream(
    callId: string,
    payload: StartStreamRequest
  ): Promise<RequestResponse<Resource<Stream>>> {
      const response = await ApiClient.post<Resource<Stream>>(
        {
          url:`/${this.baseEndpoint}/${callId}/stream/start-extraction/`,
          payload: payload,
        }
      );

      return response
  }

  public static async stopStream(
    callId: string,
    payload: StopStreamRequest
  ): Promise<RequestResponse<Resource<Stream>>> {

    const response = await ApiClient.post<Resource<Stream>>(
      {
        url:`/${this.baseEndpoint}/${callId}/stream/stop-extraction`,
        payload: payload,
      }
    );

    return response;
  }

  public static async mute(callId: string): Promise<RequestResponse<InjectionStream>> {

    const response = await ApiClient.post<InjectionStream>(
      {
        url: `/${this.baseEndpoint}/${callId}/mute`,
      }
    )
    return response;
  }

  public static async unmute(callId: string): Promise<RequestResponse<InjectionStream>> {

    const response = await ApiClient.post<InjectionStream>(
      {
        url: `/${this.baseEndpoint}/${callId}/unmute`,
      }
    )
    return response;
  }
}
