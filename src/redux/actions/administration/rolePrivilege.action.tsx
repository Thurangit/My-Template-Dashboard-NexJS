
import axios from "axios";


import {
  ADD_ROLE_PRIVILEGE_FAILURE,
  ADD_ROLE_PRIVILEGE_REQUEST,
  ADD_ROLE_PRIVILEGE_SUCCESS,
  DELETE_ROLE_PRIVILEGE_FAILURE,
  DELETE_ROLE_PRIVILEGE_REQUEST,
  DELETE_ROLE_PRIVILEGE_SUCCESS,
  EDIT_ROLE_PRIVILEGE_FAILURE,
  EDIT_ROLE_PRIVILEGE_REQUEST,
  EDIT_ROLE_PRIVILEGE_SUCCESS,
  GET_ROLE_PRIVILEGE_FAILURE,
  GET_ROLE_PRIVILEGE_REQUEST,
  GET_ROLE_PRIVILEGE_SUCCESS
} from "@/redux/types/administration/rolePrivilege.type";
import API from "@/pages/api/API";
import settings, { headers } from "@/pages/api/config";



export const getAllRolePrivileges = () => (dispatch:any) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: GET_ROLE_PRIVILEGE_REQUEST });
    axios.get(`${settings.ROLE_PRIVILEGE_URL}`, {headers} )
      .then((res) => {
        const data = res.data;
        dispatch({ type: GET_ROLE_PRIVILEGE_SUCCESS, payload: { data } });
        resolve(data);
      })
      .catch((error) => {
        dispatch({ type: GET_ROLE_PRIVILEGE_FAILURE, payload: error });
        reject(error);
        console.log(error);
      });
  });
};

export const getRolePrivilegeById = (value: any) => (dispatch:any) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: GET_ROLE_PRIVILEGE_REQUEST });
    axios.get(`${settings.ROLE_PRIVILEGE_URL}/${value}`, {headers})
      .then((res) => {
        const data = res.data;
        dispatch({ type: GET_ROLE_PRIVILEGE_SUCCESS, payload: { data } });
        resolve(data);
      })
      .catch((error) => {
        dispatch({ type: GET_ROLE_PRIVILEGE_FAILURE, payload: error });
        reject(error);
        console.log(error);
      });
  });
};

export const addRolePrivilege = (data: any) => (dispatch: any) => {

  return new Promise((resolve, reject) => {
    dispatch({ type: ADD_ROLE_PRIVILEGE_REQUEST })
    axios
      .post(`${settings.ROLE_PRIVILEGE_URL}`,data, {headers})
      .then((res: any) => {
        dispatch({ type: ADD_ROLE_PRIVILEGE_SUCCESS, payload: res.data })
        resolve(res);
        console.log(res.data)
      })
      .catch((err: any) => {
        dispatch({ type: ADD_ROLE_PRIVILEGE_FAILURE, payload: err })
        reject(err);
        console.log(err)
      })
  });
};




export const deleteRolePrivilege = (RoleId: any) => (dispatch: any) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: DELETE_ROLE_PRIVILEGE_REQUEST });

    axios.delete(`${settings.ROLE_PRIVILEGE_URL}/${RoleId}`, {headers})
      .then(() => {
        dispatch({ type: DELETE_ROLE_PRIVILEGE_SUCCESS, payload: RoleId });
        resolve(RoleId);
      })
      .catch((error) => {
        dispatch({ type: DELETE_ROLE_PRIVILEGE_FAILURE, payload: error });
        reject(error);
        console.log(error);
      });
  });
};

export const updateRolePrivilege = (RoleId: any, data: any) => (dispatch: any) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: EDIT_ROLE_PRIVILEGE_REQUEST });
    API.put(`${settings.ROLE_PRIVILEGE_URL}/${RoleId}`, data, {headers})
      .then((res) => {
        dispatch({ type: EDIT_ROLE_PRIVILEGE_SUCCESS, payload: res.data });
        resolve(res.data);
        console.log(res);
      })
      .catch((error) => {
        dispatch({ type: EDIT_ROLE_PRIVILEGE_FAILURE, payload: error });
        reject(error);
        console.log(error);
      });
  });
};


export const getRolePrivilegeByRoleId = (value: any) => (dispatch:any) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: GET_ROLE_PRIVILEGE_REQUEST });
    axios.get(`${settings.ROLE_PRIVILEGE_URL}/roleid/${value}`, {headers})
      .then((res) => {
        const data = res.data;
        dispatch({ type: GET_ROLE_PRIVILEGE_SUCCESS, payload: { data } });
        resolve(data);
      })
      .catch((error) => {
        dispatch({ type: GET_ROLE_PRIVILEGE_FAILURE, payload: error });
        reject(error);
        console.log(error);
      });
  });
};
