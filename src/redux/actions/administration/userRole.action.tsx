
import API from "@/pages/api/API";
import settings, { headers } from "@/pages/api/config";
import { ADD_USER_ROLE_FAILURE,
     ADD_USER_ROLE_REQUEST, 
     ADD_USER_ROLE_SUCCESS,
     GET_USER_ROLE_FAILURE,
     GET_USER_ROLE_REQUEST,
     GET_USER_ROLE_SUCCESS, } 
from "@/redux/types/administration/utilisateurs/userRole.type";
import axios from "axios";




export const addUserRole = (data: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: ADD_USER_ROLE_REQUEST })
        API.post(`${settings.USER_ROLE_URL}`, data, { headers })
            .then((res: any) => {
                dispatch({ type: ADD_USER_ROLE_SUCCESS, payload: res.data })
                resolve(res);
                console.log(res.data)
            })
            .catch((err: any) => {
                dispatch({ type: ADD_USER_ROLE_FAILURE, payload: err })
                reject(err);
                console.log(err)
            })
    });
};


export const getAllUserRoles = () => (dispatch: any) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: GET_USER_ROLE_REQUEST });
    axios.get(`${settings.USER_ROLE_URL}`, {headers} )
      .then((res) => {
        const data = res.data;
        dispatch({ type: GET_USER_ROLE_SUCCESS, payload: { data } });
        resolve(data);
      })
      .catch((error) => {
        dispatch({ type: GET_USER_ROLE_FAILURE, payload: error });
        reject(error);
        console.log(error);
      });
  });
};

