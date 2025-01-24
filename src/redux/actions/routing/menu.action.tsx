



import axios from "axios";


import {
  ADD_MENU_FAILURE,
  ADD_MENU_REQUEST,
  ADD_MENU_SUCCESS,
  DELETE_MENU_FAILURE,
  DELETE_MENU_REQUEST,
  DELETE_MENU_SUCCESS,
  EDIT_MENU_FAILURE,
  EDIT_MENU_REQUEST,
  EDIT_MENU_SUCCESS,
  GET_MENU_FAILURE,
  GET_MENU_REQUEST,
  GET_MENU_SUCCESS
} from "@/redux/types/routing/menu.type";
import API from "@/redux/API";
import settings, { headers } from "@/redux/config";


export const getMenuPagine = (params: any) => (dispatch: any) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: GET_MENU_REQUEST });
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
    axios.get(`${settings.MENU_URL}/PagedLists`, { ...queryParams, headers })
      .then((res) => {
        const data = res.data;
        const paginationData = {
          page: params.page,
          pageSize: params.pageSize,
          totalCount: data.totalCount,
          totalActif: data.totalActif,
        };
        dispatch({ type: GET_MENU_SUCCESS, payload: { data, paginationData } });
        resolve({ data, paginationData });
      })
      .catch((error) => {
        dispatch({ type: GET_MENU_FAILURE, payload: error });
        reject(error);
        console.log(error);
      });
  });
};


export const addMenu = (data: any) => (dispatch: any) => {

    return new Promise((resolve, reject) => {
      dispatch({ type: ADD_MENU_REQUEST })
      axios
        .post(`${settings.MENU_URL}`,data, {headers})
        .then((res: any) => {
          dispatch({ type: ADD_MENU_SUCCESS, payload: res.data })
          resolve(res);
          console.log(res.data)
        })
        .catch((err: any) => {
          dispatch({ type: ADD_MENU_FAILURE, payload: err })
          reject(err);
          console.log(err)
        })
    });
  };