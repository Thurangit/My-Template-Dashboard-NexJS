import { PublicClientApplication, LogLevel, Configuration } from "@azure/msal-browser";

// Configuration MSAL
const msalConfig: Configuration = {
  auth: {
    clientId: "b09e08e9-781c-40cf-a3b6-e648439732f8", // Remplacez par votre clientId
    authority: "https://login.microsoftonline.com/088e9b00-ffd0-458e-bfa1-acf4c596d3cb", // Remplacez par votre tenant ID
    redirectUri: "https://localhost:3000", // Assurez-vous que cette URL est enregistrée dans Azure AD
    postLogoutRedirectUri: "/", // URL de redirection après déconnexion
    navigateToLoginRequestUrl: false, // Empêche de revenir sur l'URL d'origine avec les paramètres
  },
  cache: {
    cacheLocation: "sessionStorage", // Utilisation de sessionStorage pour éviter le stockage persistant
    storeAuthStateInCookie: false, // Requis pour IE11/Edge si nécessaire
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;

        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Info:
            console.info(message);
            break;
          case LogLevel.Verbose:
            console.debug(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
          default:
            break;
        }
      },
      piiLoggingEnabled: false, // Désactive l'enregistrement des informations personnelles
    },
  },
};

// Demande de connexion avec les scopes requis
export const loginRequest = {
  scopes: ["openid", "profile", "email"], // Scopes pour l'authentification
};

// Configuration pour les requêtes Microsoft Graph
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me", // Endpoint Graph API pour récupérer les informations de l'utilisateur
};

// Demande de token avec les scopes nécessaires
export const tokenRequest = {
  scopes: ["openid", "profile", "email"], // Scopes pour l'acquisition d'un token
};

// Initialisation de l'instance MSAL
export const msalInstance = new PublicClientApplication(msalConfig);
