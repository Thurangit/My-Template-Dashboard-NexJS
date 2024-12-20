import {  ADD_NOTIFICATIONS_FAILURE,
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
    GET_NOTIFICATIONS_SUCCESS } from "@/redux/types/notifications/notifications.type";


interface rolePrivilegeState {
    rolePrivilege: any[];
    addRolePrivilege: any[];
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: rolePrivilegeState = {
    rolePrivilege: [],
    addRolePrivilege: [],
    loading: false,
    success: false,
    error: null,
};

const notificationsReducer = (state: rolePrivilegeState = initialState, action: any) => {
    switch (action.type) {

        // 
        case GET_NOTIFICATIONS_REQUEST:
            return {
                ...state,
                loading: true,
                rolePrivilege: action.payload,
                error: null,
                success: false
            };

        case GET_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                rolePrivilege: action.payload,
                success: true,
            };

        case GET_NOTIFICATIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };

        // ADD
        case ADD_NOTIFICATIONS_REQUEST:
            return {
                ...state,
                loading: true,
                addRolePrivilege: action.payload,
                error: null,
                success: false
            };

        case ADD_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                addRolePrivilege: action.payload,
                success: true
            };

        case ADD_NOTIFICATIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };


        // EDIT
        case EDIT_NOTIFICATIONS_REQUEST:
            return {
                ...state,
                loading: true,
                addRolePrivilege: action.payload,
                error: null,
                success: false
            };

        case EDIT_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                addRolePrivilege: action.payload,
                success: true
            };

        case EDIT_NOTIFICATIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };

        // DELETE
        case DELETE_NOTIFICATIONS_REQUEST:
            return {
                ...state,
                loading: true,
                rolePrivilege: action.payload,
                error: null,
                success: false
            };

        case DELETE_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                rolePrivilege: action.payload,
                success: true
            };

        case DELETE_NOTIFICATIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };

        default:
            return state;
    }
};
export default notificationsReducer;
