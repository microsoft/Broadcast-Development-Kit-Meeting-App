import { PublicCall, StreamType } from "@/models/calls/types";
import { ApiError } from "@/models/error/types";
import {ApiClient, RequestResponse } from "./api";

export class ParticipantService {
  private static readonly baseEndpoint = "participant";

  public static async getParticipantByMeetingId(
    meetingId: string,
    type: StreamType,
    participantAadId: string | null = null
  ): Promise<RequestResponse<PublicCall |null>> {
    const payload = {
      type: type,
      participantAadId: participantAadId,
    };

    const response = await ApiClient.post<PublicCall>({
      url: `/${this.baseEndpoint}/by-meeting-id/${meetingId}/`,
      payload,
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
}
