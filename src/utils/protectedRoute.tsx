import { useMsal } from "@azure/msal-react";
import { useContext, useEffect, useState } from "react";
import { graphConfig, loginRequest } from "./msalConfig";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { useDispatch } from "react-redux";
import React, { createContext } from "react";

// Interfaces
interface AuthContextType {
  user: any[];
  state: any[];
  role: any[];
}

interface AuthProviderProps {
  children: React.ReactNode;
}

// Contexte
const AuthContext = createContext<AuthContextType>({
  user: [],
  state: [],
  role: []
});

export const useAuthe = () => useContext(AuthContext);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { instance, accounts } = useMsal();
  const [isMsalInitialized, setIsMsalInitialized] = useState(false); // Vérifie l'initialisation
  const [role, setRole] = useState<any[]>([]);
  const [state, setState] = useState<any[]>([]);
  const [user, setUser] = useState<any[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Vérifiez si MSAL est initialisé
    const initializeMsal = async () => {
      try {
        // Assurez-vous que MSAL est prêt
        await instance.initialize(); // Assurez-vous que `initialize` est appelé

        const activeAccount = instance.getActiveAccount();
        if (!accounts || accounts.length === 0) {
          // Si l'utilisateur n'est pas connecté, redirigez-le
          await instance.loginRedirect(loginRequest);
        }
        setIsMsalInitialized(true); // Confirme que MSAL est prêt
      } catch (error) {
        console.error("Erreur lors de l'initialisation de MSAL :", error);
      }
    };

    initializeMsal();
  }, [instance, accounts]);

  useEffect(() => {
    if (!isMsalInitialized) return; // Attendre l'initialisation

    const fetchTokenAndUserData = async () => {
      try {
        const activeAccount = instance.getActiveAccount();
        const tokenResponse = await instance.acquireTokenSilent({
          ...loginRequest,
          account: activeAccount || accounts[0]
        });

        console.log("Token response", tokenResponse);

        sessionStorage.setItem(
          "token",
          JSON.stringify(tokenResponse.idToken)
        );

        // Récupérer les informations utilisateur via MS Graph
        const headers = new Headers();
        const bearer = "Bearer " + tokenResponse.accessToken;
        headers.append("Authorization", bearer);

        const options = {
          method: "GET",
          headers: headers
        };

        const response = await fetch(graphConfig.graphMeEndpoint, options);
        const userData = await response.json();
        setUser(userData); // Met à jour les données utilisateur
      } catch (error) {
        if (error instanceof InteractionRequiredAuthError) {
          // Revenir à une interaction en cas d'échec silencieux
          await instance.acquireTokenPopup(loginRequest);
        } else {
          console.error(
            "Erreur lors de la récupération du token ou des données utilisateur :",
            error
          );
        }
      }
    };

    fetchTokenAndUserData();
  }, [isMsalInitialized, instance, accounts]);

  const contextValue: AuthContextType = {
    user,
    state,
    role
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
