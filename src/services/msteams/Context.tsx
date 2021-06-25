import { Context } from "@microsoft/teams-js";

const getContextPromise = (teamsClient: any, timeout = 10000): Promise<Context> => {
  return new Promise((resolve, reject) => {
    let shouldReject = true;
    teamsClient.getContext((teamsContext: Context) => {
      shouldReject = false;
      resolve({
        ...teamsContext,
        meetingId: teamsContext.meetingId,
        chatId: teamsContext.chatId,
      });
    });
    setTimeout(() => {
      if (shouldReject) {
        console.error("Error getting context: Timeout. Make sure you are running the app within teams context and have initialized the sdk");
        reject("Error getting context: Timeout");
      }
    }, timeout);
  });
}

export const getContext = (teamsClient: any, timeout = 10000): Promise<Context> => getContextPromise(teamsClient, timeout);

