import { AuthConfig, UserRoles } from "@/models/auth/types";
import jwtDecode from "jwt-decode";

const AUTHORIZE_ENDPOINT = "/oauth2/v2.0/authorize";
const LOGIN_PAGE_ENDPOINT = "/auth/start";
const CALLBACK_ENDPOINT = "/auth/end";

export const getUserRole = async (
  teamsClient: any,
  groupId: string | undefined
): Promise<UserRoles> => {
  try {
    const authToken = await getMsTeamsAuthToken(teamsClient);
    const decodedToken = jwtDecode(authToken) as Object;
    const userRole =
      decodedToken["groups"] && decodedToken["groups"].includes(groupId)
        ? UserRoles.Producer
        : UserRoles.Attendee;

    return userRole;
  } catch (error) {
    console.error("[services/auth/index] getUserRole", { error });
    return UserRoles.Attendee;
  }
};

export const authenticateUser = async (teamsClient: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    teamsClient.authentication.authenticate({
      width: 300,
      height: 500,
      url: `${window.location.origin}${LOGIN_PAGE_ENDPOINT}`,
      successCallback: (result: string) => resolve(result || "{}"),
      failureCallback: (reason: string) => reject(reason),
    });
  });
};

export const redirectUser = (authConfig: AuthConfig, loginHint: string) => {
  const { spaClientId, clientId: apiClientId, instance, tenantId } = authConfig;

  const state = window.crypto.getRandomValues(new Uint8Array(8)).join("");
  localStorage.setItem("auth.state", state);
  localStorage.removeItem("auth.error");

  // TODO: create helper to convert object to query strings
  const queryStrings = `client_id=${spaClientId}
    &response_type=token
    &response_mode=fragment
    &redirect_uri=${window.location.origin}${CALLBACK_ENDPOINT}
    &scope=api://${apiClientId}/access_as_producer%20offline_access%20openid
    &nonce=54321
    &state=${state}
    &grant_type=refresh_token
    &login_hint=${loginHint}`;
  const authorizeEndpoint = `${instance}${tenantId}${AUTHORIZE_ENDPOINT}?${queryStrings}`;

  window.location.assign(authorizeEndpoint);
};

const getMsTeamsAuthToken = (teamsClient: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    teamsClient.authentication.getAuthToken({
      successCallback: (token: string): void => {
        resolve(token);
      },
      failureCallback: (error: string) => {
        reject(error);
      },
    });
  });
};
