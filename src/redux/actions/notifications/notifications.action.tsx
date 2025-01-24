



import axios from "axios";


import {
  ADD_NOTIFICATIONS_FAILURE,
  ADD_NOTIFICATIONS_REQUEST,
  ADD_NOTIFICATIONS_SUCCESS,
  DELETE_NOTIFICATIONS_FAILURE,
  DELETE_NOTIFICATIONS_REQUEST,
  DELETE_NOTIFICATIONS_SUCCESS,
  EDIT_NOTIFICATIONS_FAILURE,
  EDIT_NOTIFICATIONS_REQUEST,
  EDIT_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS
} from "@/redux/types/notifications/notifications.type";
import API from "@/redux/API";
import settings, { headers } from "@/redux/config";


export const getNotificationPagine = (params: any) => (dispatch: any) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: GET_NOTIFICATIONS_REQUEST });
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
       
      },
    };
    axios.get(`${settings.NOTIFICATIONS_URL}/PagedLists`, { ...queryParams, headers })
      .then((res) => {
        const data = res.data;
        const paginationData = {
          page: params.page,
          pageSize: params.pageSize,
          totalCount: data.item2,
          totalActif: data.item3,
        };
        dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: { data, paginationData } });
        resolve({ data, paginationData });
      })
      .catch((error) => {
        dispatch({ type: GET_NOTIFICATIONS_FAILURE, payload: error });
        reject(error);
        console.log(error);
      });
  });
};


export const getAllNotifications = () => (dispatch:any) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: GET_NOTIFICATIONS_REQUEST });
    axios.get(`${settings.NOTIFICATIONS_URL}`, {headers} )
      .then((res) => {
        const data = res.data;
        dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: { data } });
        resolve(data);
      })
      .catch((error) => {
        dispatch({ type: GET_NOTIFICATIONS_FAILURE, payload: error });
        reject(error);
        console.log(error);
      });
  });
};

export const getNotificationById = (value: any) => (dispatch:any) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: GET_NOTIFICATIONS_REQUEST });
    axios.get(`${settings.NOTIFICATIONS_URL}/${value}`, {headers})
      .then((res) => {
        const data = res.data;
        dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: { data } });
        resolve(data);
      })
      .catch((error) => {
        dispatch({ type: GET_NOTIFICATIONS_FAILURE, payload: error });
        reject(error);
        console.log(error);
      });
  });
};

export const addNotification = (data: any) => (dispatch: any) => {

  return new Promise((resolve, reject) => {
    dispatch({ type: ADD_NOTIFICATIONS_REQUEST })
    axios
      .post(`${settings.NOTIFICATIONS_URL}`,data, {headers})
      .then((res: any) => {
        dispatch({ type: ADD_NOTIFICATIONS_SUCCESS, payload: res.data })
        resolve(res);
        console.log(res.data)
      })
      .catch((err: any) => {
        dispatch({ type: ADD_NOTIFICATIONS_FAILURE, payload: err })
        reject(err);
        console.log(err)
      })
  });
};




export const deleteNotification = (NotificationId: any) => (dispatch: any) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: DELETE_NOTIFICATIONS_REQUEST });

    axios.delete(`${settings.NOTIFICATIONS_URL}/${NotificationId}`, {headers})
      .then(() => {
        dispatch({ type: DELETE_NOTIFICATIONS_SUCCESS, payload: NotificationId });
        resolve(NotificationId);
      })
      .catch((error) => {
        dispatch({ type: DELETE_NOTIFICATIONS_FAILURE, payload: error });
        reject(error);
        console.log(error);
      });
  });
};

export const updateNotification = (NotificationId: any, data: any) => (dispatch: any) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: EDIT_NOTIFICATIONS_REQUEST });
    API.put(`${settings.NOTIFICATIONS_URL}/${NotificationId}`, data, {headers})
      .then((res) => {
        dispatch({ type: EDIT_NOTIFICATIONS_SUCCESS, payload: res.data });
        resolve(res.data);
        console.log(res);
      })
      .catch((error) => {
        dispatch({ type: EDIT_NOTIFICATIONS_FAILURE, payload: error });
        reject(error);
        console.log(error);
      });
  });
};
