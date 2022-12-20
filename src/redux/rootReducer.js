import { combineReducers } from "redux";
import authReducer from "./auth/authReducers";
import usersReducer from "./user/userReducers";


const rootReducer = combineReducers({
    auth:authReducer,
    users:usersReducer
})

export default rootReducer