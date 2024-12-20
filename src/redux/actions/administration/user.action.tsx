import {
    ADD_USER_FAILURE,
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    DELETE_USER_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    EDIT_USER_FAILURE,
    EDIT_USER_REQUEST,
    EDIT_USER_SUCCESS,
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS
}
    from "../../types/administration/utilisateurs/user.type";
import {
    GET_ROLE_FAILURE,
    GET_ROLE_REQUEST,
    GET_ROLE_SUCCESS
} from "@/redux/types/administration/utilisateurs/role.type";
import axios from "axios";
import API from "@/pages/api/API";
import settings, { headers } from "@/pages/api/config";

// Users
export const addUser = (data: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: ADD_USER_REQUEST })
        API.post(`${settings.ACCESS_URL}/users`, data, { headers })
            .then((res: any) => {
                dispatch({ type: ADD_USER_SUCCESS, payload: res.data })
                resolve(res);
                console.log(res.data)
            })
            .catch((err: any) => {
                dispatch({ type: ADD_USER_FAILURE, payload: err })
                reject(err);
                console.log(err)
            })
    });
};
export const updateUser = (UserId: any, data: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: EDIT_USER_REQUEST });
        API.put(`${settings.ACCESS_URL}/users/${UserId}`, data, { headers })
            .then((res) => {
                dispatch({ type: EDIT_USER_SUCCESS, payload: res.data });
                resolve(res.data);
                console.log(res);
            })
            .catch((error) => {
                dispatch({ type: EDIT_USER_FAILURE, payload: error });
                reject(error);
                console.log(error);
            });
    });
};
export const deasactiveUser = (UserId: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: DELETE_USER_REQUEST });
        axios.put(`${settings.ACCESS_URL}/users/deasactive/${UserId}`, { headers })
            .then((res) => {
                dispatch({ type: DELETE_USER_SUCCESS, payload: res.data });
                resolve(res.data);
                console.log(res);
            })
            .catch((error) => {
                dispatch({ type: DELETE_USER_FAILURE, payload: error });
                reject(error);
                console.log(error);
            });
    });
};

// Session

export const sendUserSession = (session: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: ADD_USER_REQUEST })
        API.post(`${settings.ACCESS_URL}/sessions`, session, { headers })
            .then((res: any) => {
                dispatch({ type: ADD_USER_SUCCESS, payload: res.data })
                resolve(res);
                console.log(res.data)
            })
            .catch((err: any) => {
                dispatch({ type: ADD_USER_FAILURE, payload: err })
                reject(err);
                console.log(err)
            })
    });
};

export const restoreUser = (UserId: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: EDIT_USER_REQUEST });
        axios.put(`${settings.ACCESS_URL}/users/restore/${UserId}`, { headers })
            .then((res) => {
                dispatch({ type: EDIT_USER_SUCCESS, payload: res.data });
                resolve(res.data);
                console.log(res);
            })
            .catch((error) => {
                dispatch({ type: EDIT_USER_FAILURE, payload: error });
                reject(error);
                console.log(error);
            });
    });
};
export const getAllUsers = () => (dispatch:any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: GET_USER_REQUEST });
        axios.get(`${settings.ACCESS_URL}/users`, { headers })
            .then((res) => {
                const data = res.data;
                dispatch({ type: GET_USER_SUCCESS, payload: { data } });
                resolve(data);
            })
            .catch((error) => {
                dispatch({ type: GET_USER_FAILURE, payload: error });
                reject(error);
                console.log(error);
            });
    });
};
export const getUsersPagines = (params: any) => (dispatch:any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: GET_USER_REQUEST });
        const queryParams = {
            params: {
                page: params.page,
                pageSize: params.pageSize,
                sortBy1: params.sortBy1,
                sortOrder1: params.sortOrder1,
                sortBy2: params.sortBy2,
                sortOrder2: params.sortOrder2,
                searchTerm: params.searchTerm,
                firstName: params.firstName,
                lastName: params.lastName,
                mail: params.mail,
                isConnected: params.isConnected,
                employeeNumber: params.employeeNumber,
                loginAS400 : params.loginAS400,
                company: params.company,
                isActive: params.isActive
            }
        };
        axios.get(`${settings.ACCESS_URL}/users/pagines`, { ...queryParams, headers })
            .then((res) => {
                const data = res.data;
                const paginationData = {
                    page: params.page,
                    pageSize: params.pageSize,
                    totalCount: data.item2,
                    totalActive: data.item3
                }
                dispatch({ type: GET_USER_SUCCESS, payload: { data, paginationData } });
                resolve({ data, paginationData });
            })
            .catch((error) => {
                dispatch({ type: GET_USER_FAILURE, payload: error });
                reject(error);
                console.log(error);
            });
    });
};

// Role by userId

export const addUserRole = (data: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: ADD_USER_REQUEST })
        API.post(`${settings.ACCESS_URL}/usersroles`, data, { headers })
            .then((res: any) => {
                dispatch({ type: ADD_USER_SUCCESS, payload: res.data })
                resolve(res);
                console.log(res.data)
            })
            .catch((err: any) => {
                dispatch({ type: ADD_USER_FAILURE, payload: err })
                reject(err);
                console.log(err)
            })
    });
};
export const deasactiveUserRole = (UserId: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: DELETE_USER_REQUEST });
        axios.put(`${settings.ACCESS_URL}/usersroles/deasactive/${UserId}`, { headers })
            .then((res) => {
                dispatch({ type: DELETE_USER_SUCCESS, payload: res.data });
                resolve(res.data);
                console.log(res);
            })
            .catch((error) => {
                dispatch({ type: DELETE_USER_FAILURE, payload: error });
                reject(error);
                console.log(error);
            });
    });
};
export const getRoleByUserPagine = (params: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: GET_ROLE_REQUEST });
        // Construct the query parameters based on the input params
        const queryParams = {
            params: {
                page: params.page,
                pageSize: params.pageSize,
                userId: params.userId,
                sortBy1: params.sortBy1,
                sortOrder1: params.sortOrder1,
                sortBy2: params.sortBy2,
                sortOrder2: params.sortOrder2,
                searchTerm: params.searchTerm,
            },
        };
        axios.get(`${settings.ACCESS_URL}/usersroles/pagines`, { ...queryParams, headers })
            .then((res) => {
                const data = res.data;
                const paginationData = {
                    page: params.page,
                    pageSize: params.pageSize,
                    totalCount: data.item2,
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

// Site by userId
export const addUserSite = (data: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: ADD_USER_REQUEST })
        API.post(`${settings.ACCESS_URL}/userssites`, data, { headers })
            .then((res: any) => {
                dispatch({ type: ADD_USER_SUCCESS, payload: res.data })
                resolve(res);
                console.log(res.data)
            })
            .catch((err: any) => {
                dispatch({ type: ADD_USER_FAILURE, payload: err })
                reject(err);
                console.log(err)
            })
    });
};
export const deasactiveUserSite = (UserId: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: DELETE_USER_REQUEST });
        axios.put(`${settings.ACCESS_URL}/userssites/deasactive/${UserId}`, { headers })
            .then((res) => {
                dispatch({ type: DELETE_USER_SUCCESS, payload: res.data });
                resolve(res.data);
                console.log(res);
            })
            .catch((error) => {
                dispatch({ type: DELETE_USER_FAILURE, payload: error });
                reject(error);
                console.log(error);
            });
    });
};
export const getSiteByUserPagine = (params: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: GET_ROLE_REQUEST });
        // Construct the query parameters based on the input params
        const queryParams = {
            params: {
                page: params.page,
                pageSize: params.pageSize,
                userId: params.userId,
                sortBy1: params.sortBy1,
                sortOrder1: params.sortOrder1,
                sortBy2: params.sortBy2,
                sortOrder2: params.sortOrder2,
                company: params.company,
                city: params.city,
            },
        };
        axios.get(`${settings.ACCESS_URL}/userssites/pagines`, { ...queryParams, headers })
            .then((res) => {
                const data = res.data;
                const paginationData = {
                    page: params.page,
                    pageSize: params.pageSize,
                    totalCount: data.item2,
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

// Authorization user
export const addAuthorization = (data: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: ADD_USER_REQUEST })
        API.post(`${settings.ACCESS_URL}/authorization`, data, { headers })
            .then((res: any) => {
                dispatch({ type: ADD_USER_SUCCESS, payload: res.data })
                resolve(res);
                console.log(res.data)
            })
            .catch((err: any) => {
                dispatch({ type: ADD_USER_FAILURE, payload: err })
                reject(err);
                console.log(err)
            })
    });
};
export const deasactiveAuthorization = (autorizationId: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: DELETE_USER_REQUEST });
        axios.put(`${settings.ACCESS_URL}/authorization/deasactive/${autorizationId}`, { headers })
            .then((res) => {
                dispatch({ type: DELETE_USER_SUCCESS, payload: res.data });
                resolve(res.data);
                console.log(res);
            })
            .catch((error) => {
                dispatch({ type: DELETE_USER_FAILURE, payload: error });
                reject(error);
                console.log(error);
            });
    });
};
export const restoreAuthorization = (autorizationId: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: EDIT_USER_REQUEST });
        axios.put(`${settings.ACCESS_URL}/authorization/restore/${autorizationId}`, { headers })
            .then((res) => {
                dispatch({ type: EDIT_USER_SUCCESS, payload: res.data });
                resolve(res.data);
                console.log(res);
            })
            .catch((error) => {
                dispatch({ type: EDIT_USER_FAILURE, payload: error });
                reject(error);
                console.log(error);
            });
    });
};
export const inValideAuthorization = (autorizationId: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: DELETE_USER_REQUEST });
        axios.put(`${settings.ACCESS_URL}/authorization/invalide/${autorizationId}`, { headers })
            .then((res) => {
                dispatch({ type: DELETE_USER_SUCCESS, payload: res.data });
                resolve(res.data);
                console.log(res);
            })
            .catch((error) => {
                dispatch({ type: DELETE_USER_FAILURE, payload: error });
                reject(error);
                console.log(error);
            });
    });
};

export const valideAuthorization = (autorizationId: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: EDIT_USER_REQUEST });
        axios.put(`${settings.ACCESS_URL}/authorization/valide/${autorizationId}`, { headers })
            .then((res) => {
                dispatch({ type: EDIT_USER_SUCCESS, payload: res.data });
                resolve(res.data);
                console.log(res);
            })
            .catch((error) => {
                dispatch({ type: EDIT_USER_FAILURE, payload: error });
                reject(error);
                console.log(error);
            });
    });
};
export const getAuthorizationPagine = (params: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: GET_USER_REQUEST });
        // Construct the query parameters based on the input params
        const queryParams = {
            params: {
                page: params.page,
                pageSize: params.pageSize,
                userId: params.userId,
                sortBy1: params.sortBy1,
                sortOrder1: params.sortOrder1,
                sortBy2: params.sortBy2,
                sortOrder2: params.sortOrder2,
                searchTerm: params.searchTerm,
            },
        };
        axios.get(`${settings.ACCESS_URL}/authorization/pagines`, { ...queryParams, headers })
            .then((res) => {
                const data = res.data;
                const paginationData = {
                    page: params.page,
                    pageSize: params.pageSize,
                    totalCount: data.item2,
                };
                dispatch({ type: GET_USER_SUCCESS, payload: { data, paginationData } });
                resolve({ data, paginationData });
            })
            .catch((error) => {
                dispatch({ type: GET_USER_FAILURE, payload: error });
                reject(error);
                console.log(error);
            });
    });
};

// State user
export const addUserState = (data: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: ADD_USER_REQUEST })
        API.post(`${settings.ACCESS_URL}/userstate`, data, { headers })
            .then((res: any) => {
                dispatch({ type: ADD_USER_SUCCESS, payload: res.data })
                resolve(res);
                console.log(res.data)
            })
            .catch((err: any) => {
                dispatch({ type: ADD_USER_FAILURE, payload: err })
                reject(err);
                console.log(err)
            })
    });
};
export const updateUserState = (UserId: any, data: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: EDIT_USER_REQUEST });
        API.put(`${settings.ACCESS_URL}/userstate/${UserId}`, data, { headers })
            .then((res) => {
                dispatch({ type: EDIT_USER_SUCCESS, payload: res.data });
                resolve(res.data);
                console.log(res);
            })
            .catch((error) => {
                dispatch({ type: EDIT_USER_FAILURE, payload: error });
                reject(error);
                console.log(error);
            });
    });
};
export const deasactiveUserState = (autorizationId: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: DELETE_USER_REQUEST });
        axios.put(`${settings.ACCESS_URL}/userstate/deasactive/${autorizationId}`, { headers })
            .then((res) => {
                dispatch({ type: DELETE_USER_SUCCESS, payload: res.data });
                resolve(res.data);
                console.log(res);
            })
            .catch((error) => {
                dispatch({ type: DELETE_USER_FAILURE, payload: error });
                reject(error);
                console.log(error);
            });
    });
};
export const restoreUserState = (autorizationId: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: EDIT_USER_REQUEST });
        axios.put(`${settings.ACCESS_URL}/userstate/restore/${autorizationId}`, { headers })
            .then((res) => {
                dispatch({ type: EDIT_USER_SUCCESS, payload: res.data });
                resolve(res.data);
                console.log(res);
            })
            .catch((error) => {
                dispatch({ type: EDIT_USER_FAILURE, payload: error });
                reject(error);
                console.log(error);
            });
    });
};

export const inValideUserState = (autorizationId: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: DELETE_USER_REQUEST });
        axios.put(`${settings.ACCESS_URL}/userstate/deactivate/${autorizationId}`, { headers })
            .then((res) => {
                dispatch({ type: DELETE_USER_SUCCESS, payload: res.data });
                resolve(res.data);
                console.log(res);
            })
            .catch((error) => {
                dispatch({ type: DELETE_USER_FAILURE, payload: error });
                reject(error);
                console.log(error);
            });
    });
};

export const valideUserState = (autorizationId: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: EDIT_USER_REQUEST });
        axios.put(`${settings.ACCESS_URL}/userstate/active/${autorizationId}`, { headers })
            .then((res) => {
                dispatch({ type: EDIT_USER_SUCCESS, payload: res.data });
                resolve(res.data);
                console.log(res);
            })
            .catch((error) => {
                dispatch({ type: EDIT_USER_FAILURE, payload: error });
                reject(error);
                console.log(error);
            });
    });
};
export const getUserStatePagine = (params: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: GET_USER_REQUEST });
        // Construct the query parameters based on the input params
        const queryParams = {
            params: {
                page: params.page,
                pageSize: params.pageSize,
                userId: params.userId,
                sortBy1: params.sortBy1,
                sortOrder1: params.sortOrder1,
                sortBy2: params.sortBy2,
                sortOrder2: params.sortOrder2,
                searchTerm: params.searchTerm,
            },
        };
        axios.get(`${settings.ACCESS_URL}/userstate/pagines`, { ...queryParams, headers })
            .then((res) => {
                const data = res.data;
                const paginationData = {
                    page: params.page,
                    pageSize: params.pageSize,
                    totalCount: data.item2,
                };
                dispatch({ type: GET_USER_SUCCESS, payload: { data, paginationData } });
                resolve({ data, paginationData });
            })
            .catch((error) => {
                dispatch({ type: GET_USER_FAILURE, payload: error });
                reject(error);
                console.log(error);
            });
    });
};



// Section et Services
export const addUserSection = (data: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: ADD_USER_REQUEST })
        API.post(`${settings.ACCESS_URL}/usersection`, data, { headers })
            .then((res: any) => {
                dispatch({ type: ADD_USER_SUCCESS, payload: res.data })
                resolve(res);
                console.log(res.data)
            })
            .catch((err: any) => {
                dispatch({ type: ADD_USER_FAILURE, payload: err })
                reject(err);
                console.log(err)
            })
    });
};
export const updateUserSection = (UserId: any, data: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: EDIT_USER_REQUEST });
        API.put(`${settings.ACCESS_URL}/usersection/${UserId}`, data, { headers })
            .then((res) => {
                dispatch({ type: EDIT_USER_SUCCESS, payload: res.data });
                resolve(res.data);
                console.log(res);
            })
            .catch((error) => {
                dispatch({ type: EDIT_USER_FAILURE, payload: error });
                reject(error);
                console.log(error);
            });
    });
};
export const deasactiveUserSection = (userSectionId: any, userId: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: DELETE_USER_REQUEST });
        axios.put(`${settings.ACCESS_URL}/usersection/deasactive/${userSectionId}/${userId}`, { headers })
            .then((res) => {
                dispatch({ type: DELETE_USER_SUCCESS, payload: res.data });
                resolve(res.data);
                console.log(res);
            })
            .catch((error) => {
                dispatch({ type: DELETE_USER_FAILURE, payload: error });
                reject(error);
                console.log(error);
            });
    });
};
export const getUserSectionPagines = (params: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: GET_USER_REQUEST });
        // Construct the query parameters based on the input params
        const queryParams = {
            params: {
                page: params.page,
                pageSize: params.pageSize,
                userId: params.userId,
                sortBy1: params.sortBy1,
                sortOrder1: params.sortOrder1,
                sortBy2: params.sortBy2,
                sortOrder2: params.sortOrder2,
                searchTerm: params.searchTerm,
                section: params.section,
                service: params.service,
                site: params.site,
                isBeneficiary: params.isBeneficiary,
                isClientOperationManager: params.isClientOperationManager,
                status: params.status
            },
        };
        axios.get(`${settings.ACCESS_URL}/usersection/pagines`, { ...queryParams, headers })
            .then((res) => {
                const data = res.data;
                const paginationData = {
                    page: params.page,
                    pageSize: params.pageSize,
                    totalCount: data.item2,
                    totalActif: data.item3,
                };
                dispatch({ type: GET_USER_SUCCESS, payload: { data, paginationData } });
                resolve({ data, paginationData });
            })
            .catch((error) => {
                dispatch({ type: GET_USER_FAILURE, payload: error });
                reject(error);
                console.log(error);
            });
    });
};
export const restoreUserSection = (userSectionId: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: EDIT_USER_REQUEST });
        axios.put(`${settings.ACCESS_URL}/usersection/restore/${userSectionId}`, { headers })
            .then((res) => {
                dispatch({ type: EDIT_USER_SUCCESS, payload: res.data });
                resolve(res.data);
                console.log(res);
            })
            .catch((error) => {
                dispatch({ type: EDIT_USER_FAILURE, payload: error });
                reject(error);
                console.log(error);
            });
    });
};
// MSGraph Users 
export const getAllUsersMSGraph = () => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: GET_USER_REQUEST });
        axios.get(`${settings.USER_URL}/allusers`, { headers })
            .then((res) => {
                const data = res.data;
                dispatch({ type: GET_USER_SUCCESS, payload: { data } });
                resolve(data);
            })
            .catch((error) => {
                dispatch({ type: GET_USER_FAILURE, payload: error });
                reject(error);
                console.log(error);
            });
    });
};
export const getAllUsersMSGraphPagines = (params: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: GET_USER_REQUEST });
        const queryParams = {
            params: {
                page: params.page,
                pageSize: params.pageSize,
                sortBy1: params.sortBy1,
                sortOrder1: params.sortOrder1,
                sortBy2: params.sortBy2,
                sortOrder2: params.sortOrder2,
                searchTerm: params.searchTerm,
                firstName: params.firstName,
                lastName: params.lastName,
                mail: params.mail,
                isUser: params.isUser,
                displayName: params.displayName
            }
        };
        axios.get(`${settings.USER_URL}/pagines`, { ...queryParams, headers })
            .then((res) => {
                const data = res.data;
                const paginationData = {
                    page: params.page,
                    pageSize: params.pageSize,
                    totalCount: data.item2,
                    totalUser: data.item3
                }
                dispatch({ type: GET_USER_SUCCESS, payload: { data, paginationData } });
                resolve({ data, paginationData });
            })
            .catch((error) => {
                dispatch({ type: GET_USER_FAILURE, payload: error });
                reject(error);
                console.log(error);
            });
    });
};
export const getProfileM365UUID = (params: any) => (dispatch: any) => {
    return new Promise((resolve, reject) => {
        dispatch({ type: GET_USER_REQUEST });
        axios.get(`${settings.ACCESS_URL}/users/profil/${params}`, { headers })
            .then((res) => {
                dispatch({ type: GET_USER_SUCCESS, payload: res.data });
                console.log("Utilisateur à afficher", `${settings.ACCESS_URL}/users/profil/${params}`)
                resolve(res.data);
            })
            .catch((error) => {
                dispatch({ type: GET_USER_FAILURE, payload: error });
                reject(error);
                console.log(error);
            });
    });
};