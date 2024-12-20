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
    from "../../../types/administration/utilisateurs/user.type";

interface userState {
    user: any[];
    addUser: any[];
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: userState = {
    user: [],
    addUser: [],
    loading: false,
    success: false,
    error: null,
};

const userReducer = (state: userState = initialState, action: any) => {
    switch (action.type) {

        // 
        case GET_USER_REQUEST:
            return {
                ...state,
                loading: true,
                USER: action.payload,
                error: null,
                success: false
            };

        case GET_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                USER: action.payload,
                success: true,
            };

        case GET_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };

        // ADD
        case ADD_USER_REQUEST:
            return {
                ...state,
                loading: true,
                addUSER: action.payload,
                error: null,
                success: false
            };

        case ADD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                addUSER: action.payload,
                success: true
            };

        case ADD_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };


        // EDIT
        case EDIT_USER_REQUEST:
            return {
                ...state,
                loading: true,
                addUSER: action.payload,
                error: null,
                success: false
            };

        case EDIT_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                addUSER: action.payload,
                success: true
            };

        case EDIT_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };

        // DELETE
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
                USER: action.payload,
                error: null,
                success: false
            };

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                USER: action.payload,
                success: true
            };

        case DELETE_USER_FAILURE:
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
export default userReducer;
