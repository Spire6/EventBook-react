import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import errorReducer from "./errorReducer";
import eventReducer from "./eventReducer";
import securityReducer from "./securityReducer";

export default combineReducers({
    errors: errorReducer,
    event: eventReducer,
    security: securityReducer,
    admin: adminReducer
});