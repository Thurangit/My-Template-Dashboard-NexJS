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
}
    from "../../../types/administration/utilisateurs/role.type";

interface roleState {
    role: any[];
    addRole: any[];
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: roleState = {
    role: [],
    addRole: [],
    loading: false,
    success: false,
    error: null,
};

const roleReducer = (state: roleState = initialState, action: any) => {
    switch (action.type) {

        // 
        case GET_ROLE_REQUEST:
            return {
                ...state,
                loading: true,
                role: action.payload,
                error: null,
                success: false
            };

        case GET_ROLE_SUCCESS:
            return {
                ...state,
                loading: false,
                role: action.payload,
                success: true,
            };

        case GET_ROLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };

        // ADD
        case ADD_ROLE_REQUEST:
            return {
                ...state,
                loading: true,
                addRole: action.payload,
                error: null,
                success: false
            };

        case ADD_ROLE_SUCCESS:
            return {
                ...state,
                loading: false,
                addRole: action.payload,
                success: true
            };

        case ADD_ROLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };


        // EDIT
        case EDIT_ROLE_REQUEST:
            return {
                ...state,
                loading: true,
                addRole: action.payload,
                error: null,
                success: false
            };

        case EDIT_ROLE_SUCCESS:
            return {
                ...state,
                loading: false,
                addRole: action.payload,
                success: true
            };

        case EDIT_ROLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };

        // DELETE
        case DELETE_ROLE_REQUEST:
            return {
                ...state,
                loading: true,
                role: action.payload,
                error: null,
                success: false
            };

        case DELETE_ROLE_SUCCESS:
            return {
                ...state,
                loading: false,
                role: action.payload,
                success: true
            };

        case DELETE_ROLE_FAILURE:
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
export default roleReducer;
