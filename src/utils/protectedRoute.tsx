// // components/ProtectedRoute.js
import { useMsal } from "@azure/msal-react";
import { useContext, useEffect, useState } from "react";
//import { useRouter } from "next/router";
import { graphConfig, loginRequest, msalInstance } from "./msalConfig";
//import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { useDispatch } from "react-redux";
import { getProfileM365UUID } from "@/redux/actions/administration/user.action";
import { getRolePrivilegeByRoleId } from "@/redux/actions/administration/rolePrivilege.action";
import React, { createContext } from 'react';




// Créer un contexte d'authentification
const AuthContext = createContext<any>(null);

export const useAuthe = () => useContext(AuthContext);


const AuthProvider: React.FC = ({ children }: any) => {
  const { instance, accounts } = useMsal();
  //const router = useRouter();
  const [role, setRole] = useState([]);
  const [state, setState] = useState([]);
  const [user, setUser] = useState([]); // récupérer l'utilisateur connecté
  const [rolePrivilege, setRolePrivilege] = useState([])
  const [labels, setLabels] = useState([]);


  useEffect(() => {
    
      //const activeAccount = msalInstance.getActiveAccount();
      
      if (!accounts || accounts.length === 0) {
        // Utiliser handleRedirectPromise pour ne rediriger que si nécessair
         instance.handleRedirectPromise()
          .then((response: any) => {
            if (response) {
              console.log("Redirection réussie :", response);
              sessionStorage.setItem('token', JSON.stringify(response.idToken));
              console.log("Token 1 : ",response.idToken)
              fetchUserProfile(response.idToken);
            }
          })
          .catch((error: any) => {
            console.error("Erreur de redirection :", error);
          });
  
        // Après la redirection, si toujours pas de compte, alors déclencher login
        if (!msalInstance.getActiveAccount()) {
          instance.loginRedirect(loginRequest)
            .catch((error: any) => {
              console.error('Erreur lors de la tentative de connexion :', error);
            });
        }
      } 
  
  }, [instance]);
  
  // Fonction pour récupérer les informations de profil utilisateur
  const fetchUserProfile = (accessToken: any) => {
    const headers = new Headers();
    headers.append("Authorization", "Bearer " + accessToken);
    
    fetch(graphConfig.graphMeEndpoint, { method: "GET", headers })
      .then((response) => response.json())
      .then((data) => {
        console.log("Profil utilisateur :", data);
      })
      .catch((error) => console.error("Erreur lors de la récupération du profil utilisateur :", error));
  };
  

  const dispatch: any = useDispatch();

  const UUID = accounts[0]?.idTokenClaims?.oid;


  useEffect(() => {
    dispatch(getProfileM365UUID(UUID))
      .then((res: any) => {
        console.log('utilisateur connecté', res);
        setUser(res);
        setRole(res.roles);
        setState(res.states)
      })
      .catch((err: any) => {
        console.error(err);
      });
  }, [UUID]);

  useEffect(() => {
    if (role.length > 0) {
      Promise.all(role.map((r: any) => dispatch(getRolePrivilegeByRoleId(r.id))))
        .then((responses) => {
          console.log('privileges', responses);
          const allPrivileges: any = responses.flat();
          setRolePrivilege(allPrivileges);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [role]);

  useEffect(() => {
    if (rolePrivilege.length > 0) {
      const extractedLabels: any = rolePrivilege.map((item: any) => item.privilege?.label).filter(Boolean);
      setLabels(extractedLabels);
    }
  }, [rolePrivilege]);


  const getAllPrivileges = [...new Set(labels)].map(label => ({ label }));

  console.log('les roles privileges', getAllPrivileges)
  //console.log('welcome',accounts[0].idTokenClaims.oid)


  return (
    <AuthContext.Provider value={{ getAllPrivileges, user, state, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

