import { DELETE_USER, GET_ALL_USERS } from "../actions/types";

const initialState = {
    userList: []
}

function adminReducer(state = initialState, action) {
    switch (action.type) {

        case GET_ALL_USERS:
            return {
                ...state,
                userList: action.payload
            }

        case DELETE_USER:
            return {
                ...state,
                userList: state.userList.filter(
                    user => user.id !== action.payload
                )
            };

        default:
            return state;
    }
};

export default adminReducer;