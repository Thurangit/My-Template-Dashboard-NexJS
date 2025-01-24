import { ADD_SUBMENU_FAILURE, ADD_SUBMENU_REQUEST, ADD_SUBMENU_SUCCESS, DELETE_SUBMENU_FAILURE, DELETE_SUBMENU_REQUEST, DELETE_SUBMENU_SUCCESS, EDIT_SUBMENU_FAILURE, EDIT_SUBMENU_REQUEST, EDIT_SUBMENU_SUCCESS, GET_SUBMENU_FAILURE, GET_SUBMENU_REQUEST, GET_SUBMENU_SUCCESS } from "@/redux/types/routing/submenu.type";


interface submenuState {
    submenu: any[];
    addsubmenu: any[];
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: submenuState = {
    submenu: [],
    addsubmenu: [],
    loading: false,
    success: false,
    error: null,
};

const submenuReducer = (state: submenuState = initialState, action: any) => {
    switch (action.type) {

        // 
        case GET_SUBMENU_REQUEST:
            return {
                ...state,
                loading: true,
                submenu: action.payload,
                error: null,
                success: false
            };

        case GET_SUBMENU_SUCCESS:
            return {
                ...state,
                loading: false,
                submenu: action.payload,
                success: true,
            };

        case GET_SUBMENU_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };

        // ADD
        case ADD_SUBMENU_REQUEST:
            return {
                ...state,
                loading: true,
                addsubmenu: action.payload,
                error: null,
                success: false
            };

        case ADD_SUBMENU_SUCCESS:
            return {
                ...state,
                loading: false,
                addsubmenu: action.payload,
                success: true
            };

        case ADD_SUBMENU_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };


        // EDIT
        case EDIT_SUBMENU_REQUEST:
            return {
                ...state,
                loading: true,
                addsubmenu: action.payload,
                error: null,
                success: false
            };

        case EDIT_SUBMENU_SUCCESS:
            return {
                ...state,
                loading: false,
                addsubmenu: action.payload,
                success: true
            };

        case EDIT_SUBMENU_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };

        // DELETE
        case DELETE_SUBMENU_REQUEST:
            return {
                ...state,
                loading: true,
                submenu: action.payload,
                error: null,
                success: false
            };

        case DELETE_SUBMENU_SUCCESS:
            return {
                ...state,
                loading: false,
                submenu: action.payload,
                success: true
            };

        case DELETE_SUBMENU_FAILURE:
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
export default submenuReducer;
