import { ADD_MENU_FAILURE, ADD_MENU_REQUEST, ADD_MENU_SUCCESS, DELETE_MENU_FAILURE, DELETE_MENU_REQUEST, DELETE_MENU_SUCCESS, EDIT_MENU_FAILURE, EDIT_MENU_REQUEST, EDIT_MENU_SUCCESS, GET_MENU_FAILURE, GET_MENU_REQUEST, GET_MENU_SUCCESS } from "@/redux/types/routing/menu.type";


interface menuState {
    menu: any[];
    addmenu: any[];
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: menuState = {
    menu: [],
    addmenu: [],
    loading: false,
    success: false,
    error: null,
};

const menuReducer = (state: menuState = initialState, action: any) => {
    switch (action.type) {

        // 
        case GET_MENU_REQUEST:
            return {
                ...state,
                loading: true,
                menu: action.payload,
                error: null,
                success: false
            };

        case GET_MENU_SUCCESS:
            return {
                ...state,
                loading: false,
                menu: action.payload,
                success: true,
            };

        case GET_MENU_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };

        // ADD
        case ADD_MENU_REQUEST:
            return {
                ...state,
                loading: true,
                addmenu: action.payload,
                error: null,
                success: false
            };

        case ADD_MENU_SUCCESS:
            return {
                ...state,
                loading: false,
                addmenu: action.payload,
                success: true
            };

        case ADD_MENU_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };


        // EDIT
        case EDIT_MENU_REQUEST:
            return {
                ...state,
                loading: true,
                addmenu: action.payload,
                error: null,
                success: false
            };

        case EDIT_MENU_SUCCESS:
            return {
                ...state,
                loading: false,
                addmenu: action.payload,
                success: true
            };

        case EDIT_MENU_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            };

        // DELETE
        case DELETE_MENU_REQUEST:
            return {
                ...state,
                loading: true,
                menu: action.payload,
                error: null,
                success: false
            };

        case DELETE_MENU_SUCCESS:
            return {
                ...state,
                loading: false,
                menu: action.payload,
                success: true
            };

        case DELETE_MENU_FAILURE:
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
export default menuReducer;
