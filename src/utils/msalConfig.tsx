// msalConfig.js
import { //PublicClientApplication, 
  LogLevel } from '@azure/msal-browser';
import * as msal from "@azure/msal-browser";

import { URI_REDIRECTION, SCOPE, AUTHORITHY, CLIENT_ID } from './environment';
export const msalConfig = {
  auth: {
    clientId: CLIENT_ID,
    authority: AUTHORITHY,
    redirectUri: URI_REDIRECTION,
    postLogoutRedirectUri: '/',
    navigateToLoginRequestUrl: false
  },
  cache: {
    cacheLocation: "localStorage",
    //cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: any, message: string, containsPii: any) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          default:
            return;
        }
      }
    }
  }
};


export const loginRequest = {
  // scopes: ["openid","profile","User.Read","Forecast.Read"]
  scopes: SCOPE
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For mor information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};

export const tokenRequest = {
  scopes: ["Mail.Read"]
}

export const msalInstance = new msal.PublicClientApplication(msalConfig);
