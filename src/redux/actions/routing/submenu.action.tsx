



import axios from "axios";


import {
  ADD_SUBMENU_FAILURE,
  ADD_SUBMENU_REQUEST,
  ADD_SUBMENU_SUCCESS,
  DELETE_SUBMENU_FAILURE,
  DELETE_SUBMENU_REQUEST,
  DELETE_SUBMENU_SUCCESS,
  EDIT_SUBMENU_FAILURE,
  EDIT_SUBMENU_REQUEST,
  EDIT_SUBMENU_SUCCESS,
  GET_SUBMENU_FAILURE,
  GET_SUBMENU_REQUEST,
  GET_SUBMENU_SUCCESS
} from "@/redux/types/routing/submenu.type";
import API from "@/redux/API";
import settings, { headers } from "@/redux/config";


export const getSubmenuPagine = (params: any) => (dispatch: any) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: GET_SUBMENU_REQUEST });
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
        Icon: params.icon,
      },
    };
    axios.get(`${settings.SUBMENU_URL}/PagedLists`, { ...queryParams, headers })
      .then((res) => {
        const data = res.data;
        const paginationData = {
          page: params.page,
          pageSize: params.pageSize,
          totalCount: data.totalCount,
          totalActif: data.totalActif,
        };
        dispatch({ type: GET_SUBMENU_SUCCESS, payload: { data, paginationData } });
        resolve({ data, paginationData });
      })
      .catch((error) => {
        dispatch({ type: GET_SUBMENU_FAILURE, payload: error });
        reject(error);
        console.log(error);
      });
  });
};


export const addSubmenu = (data: any) => (dispatch: any) => {

    return new Promise((resolve, reject) => {
      dispatch({ type: ADD_SUBMENU_REQUEST })
      axios
        .post(`${settings.SUBMENU_URL}`,data, {headers})
        .then((res: any) => {
          dispatch({ type: ADD_SUBMENU_SUCCESS, payload: res.data })
          resolve(res);
          console.log(res.data)
        })
        .catch((err: any) => {
          dispatch({ type: ADD_SUBMENU_FAILURE, payload: err })
          reject(err);
          console.log(err)
        })
    });
  };