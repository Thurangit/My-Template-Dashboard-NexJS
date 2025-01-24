



import axios from "axios";


import {
  ADD_ROLE_FAILURE,
  ADD_ROLE_REQUEST,
  ADD_ROLE_SUCCESS,
  DELETE_ROLE_FAILURE,
  DELETE_ROLE_REQUEST,
  DELETE_ROLE_SUCCESS,
  EDIT_ROLE_FAILURE,
  EDIT_ROLE_REQUEST,
  EDIT_ROLE_SUCCESS,
  GET_ROLE_FAILURE,
  GET_ROLE_REQUEST,
  GET_ROLE_SUCCESS
} from "@/redux/types/administration/utilisateurs/role.type";
import API from "@/redux/API";
import settings, { headers } from "@/redux/config";


export const getRolePagine = (params: any) => (dispatch: any) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: GET_ROLE_REQUEST });
    // Construct the query parameters based on the input params
    const queryParams = {
      params: {
        page: params.page,
        pageSize: params.pageSize,
        sortBy1: params.sortBy1,
        sortOrder1: params.sortOrder1,
        sortBy2: params.sortBy2,
        sortOrder2: params.sortOrder2,
        searchTerm: params.searchTerm,
        label: params.label,
        description: params.description,
      },
    };
    axios.get(`${settings.ROLE_URL}/PagedLists`, { ...queryParams, headers })
      .then((res) => {
        const data = res.data;
        const paginationData = {
          page: params.page,
          pageSize: params.pageSize,
          totalCount: data.item2,
          totalActif: data.item3,
        };
        dispatch({ type: GET_ROLE_SUCCESS, payload: { data, paginationData } });
        resolve({ data, paginationData });
      })
      .catch((error) => {
        dispatch({ type: GET_ROLE_FAILURE, payload: error });
        reject(error);
        console.log(error);
      });
  });
};


export const getAllRoles = () => (dispatch:any) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: GET_ROLE_REQUEST });
    axios.get(`${settings.ROLE_URL}`, {headers} )
      .then((res) => {
        const data = res.data;
        dispatch({ type: GET_ROLE_SUCCESS, payload: { data } });
        resolve(data);
      })
      .catch((error) => {
        dispatch({ type: GET_ROLE_FAILURE, payload: error });
        reject(error);
        console.log(error);
      });
  });
};

export const getRoleById = (value: any) => (dispatch:any) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: GET_ROLE_REQUEST });
    axios.get(`${settings.ROLE_URL}/${value}`, {headers})
      .then((res) => {
        const data = res.data;
        dispatch({ type: GET_ROLE_SUCCESS, payload: { data } });
        resolve(data);
      })
      .catch((error) => {
        dispatch({ type: GET_ROLE_FAILURE, payload: error });
        reject(error);
        console.log(error);
      });
  });
};

export const addRole = (data: any) => (dispatch: any) => {

  return new Promise((resolve, reject) => {
    dispatch({ type: ADD_ROLE_REQUEST })
    axios
      .post(`${settings.ROLE_URL}`,data, {headers})
      .then((res: any) => {
        dispatch({ type: ADD_ROLE_SUCCESS, payload: res.data })
        resolve(res);
        console.log(res.data)
      })
      .catch((err: any) => {
        dispatch({ type: ADD_ROLE_FAILURE, payload: err })
        reject(err);
        console.log(err)
      })
  });
};




export const deleteRole = (RoleId: any) => (dispatch: any) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: DELETE_ROLE_REQUEST });

    axios.delete(`${settings.ROLE_URL}/${RoleId}`, {headers})
      .then(() => {
        dispatch({ type: DELETE_ROLE_SUCCESS, payload: RoleId });
        resolve(RoleId);
      })
      .catch((error) => {
        dispatch({ type: DELETE_ROLE_FAILURE, payload: error });
        reject(error);
        console.log(error);
      });
  });
};

export const updateRole = (RoleId: any, data: any) => (dispatch: any) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: EDIT_ROLE_REQUEST });
    API.put(`${settings.ROLE_URL}/${RoleId}`, data, {headers})
      .then((res) => {
        dispatch({ type: EDIT_ROLE_SUCCESS, payload: res.data });
        resolve(res.data);
        console.log(res);
      })
      .catch((error) => {
        dispatch({ type: EDIT_ROLE_FAILURE, payload: error });
        reject(error);
        console.log(error);
      });
  });
};
