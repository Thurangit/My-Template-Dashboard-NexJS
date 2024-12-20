import {
    ADD_USER_ROLE_FAILURE,
    ADD_USER_ROLE_REQUEST,
    ADD_USER_ROLE_SUCCESS,
    DELETE_USER_ROLE_FAILURE,
    DELETE_USER_ROLE_REQUEST,
    DELETE_USER_ROLE_SUCCESS,
    EDIT_USER_ROLE_FAILURE,
    EDIT_USER_ROLE_REQUEST,
    EDIT_USER_ROLE_SUCCESS,
    GET_USER_ROLE_FAILURE,
    GET_USER_ROLE_REQUEST,
    GET_USER_ROLE_SUCCESS
}
    from "../../../types/administration/utilisateurs/userRole.type";

interface userRoleState {
    userRole: any[];
    addUserRole: any[];
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: userRoleState = {
    userRole: [],
    addUserRole: [],
    loading: false,
    success: false,
    error: null,
};

const userRoleReducer = (state: userRoleState = initialState, action: any) => {
    switch (action.type) {

        // 
        case GET_USER_ROLE_REQUEST:
            return {
                ...state,
                loading: true,
                userRole: action.payload,
                error: null,
                success: false
            };

        case GET_USER_ROLE_SUCCESS:
            return {
                ...state,
                loading: false,
                userRole: action.payload,
                success: true,
            };

        case GET_USER_ROLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };

        // ADD
        case ADD_USER_ROLE_REQUEST:
            return {
                ...state,
                loading: true,
                addUserRole: action.payload,
                error: null,
                success: false
            };

        case ADD_USER_ROLE_SUCCESS:
            return {
                ...state,
                loading: false,
                addUserRole: action.payload,
                success: true
            };

        case ADD_USER_ROLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };


        // EDIT
        case EDIT_USER_ROLE_REQUEST:
            return {
                ...state,
                loading: true,
                addUserRole: action.payload,
                error: null,
                success: false
            };

        case EDIT_USER_ROLE_SUCCESS:
            return {
                ...state,
                loading: false,
                addUserRole: action.payload,
                success: true
            };

        case EDIT_USER_ROLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };

        // DELETE
        case DELETE_USER_ROLE_REQUEST:
            return {
                ...state,
                loading: true,
                userRole: action.payload,
                error: null,
                success: false
            };

        case DELETE_USER_ROLE_SUCCESS:
            return {
                ...state,
                loading: false,
                userRole: action.payload,
                success: true
            };

        case DELETE_USER_ROLE_FAILURE:
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
export default userRoleReducer;
