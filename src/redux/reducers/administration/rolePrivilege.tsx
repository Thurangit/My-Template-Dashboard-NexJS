import {  ADD_ROLE_PRIVILEGE_FAILURE,
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
    GET_ROLE_PRIVILEGE_SUCCESS } from "@/redux/types/administration/rolePrivilege.type";


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

const rolePrivilegeReducer = (state: rolePrivilegeState = initialState, action: any) => {
    switch (action.type) {

        // 
        case GET_ROLE_PRIVILEGE_REQUEST:
            return {
                ...state,
                loading: true,
                rolePrivilege: action.payload,
                error: null,
                success: false
            };

        case GET_ROLE_PRIVILEGE_SUCCESS:
            return {
                ...state,
                loading: false,
                rolePrivilege: action.payload,
                success: true,
            };

        case GET_ROLE_PRIVILEGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };

        // ADD
        case ADD_ROLE_PRIVILEGE_REQUEST:
            return {
                ...state,
                loading: true,
                addRolePrivilege: action.payload,
                error: null,
                success: false
            };

        case ADD_ROLE_PRIVILEGE_SUCCESS:
            return {
                ...state,
                loading: false,
                addRolePrivilege: action.payload,
                success: true
            };

        case ADD_ROLE_PRIVILEGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };


        // EDIT
        case EDIT_ROLE_PRIVILEGE_REQUEST:
            return {
                ...state,
                loading: true,
                addRolePrivilege: action.payload,
                error: null,
                success: false
            };

        case EDIT_ROLE_PRIVILEGE_SUCCESS:
            return {
                ...state,
                loading: false,
                addRolePrivilege: action.payload,
                success: true
            };

        case EDIT_ROLE_PRIVILEGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };

        // DELETE
        case DELETE_ROLE_PRIVILEGE_REQUEST:
            return {
                ...state,
                loading: true,
                rolePrivilege: action.payload,
                error: null,
                success: false
            };

        case DELETE_ROLE_PRIVILEGE_SUCCESS:
            return {
                ...state,
                loading: false,
                rolePrivilege: action.payload,
                success: true
            };

        case DELETE_ROLE_PRIVILEGE_FAILURE:
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
export default rolePrivilegeReducer;
