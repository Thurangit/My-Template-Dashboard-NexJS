
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from "redux";
//import thunk from "redux-thunk";

import userReducer from './reducers/administration/utilisateurs/user.reducer';
import roleReducer from './reducers/administration/utilisateurs/role.reducer';
import rolePrivilegeReducer from './reducers/administration/rolePrivilege';
import userRoleReducer from './reducers/administration/utilisateurs/userRole.reducer';
import menuReducer from './reducers/routing/menu.reducer';
import submenuReducer from './reducers/routing/submenu.reducer';


const store = configureStore({
  reducer: combineReducers({
    userReducer,
    roleReducer,
    rolePrivilegeReducer,
    userRoleReducer,
    menuReducer,
    submenuReducer,
  }),
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }),
});


export default store


