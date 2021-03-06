import { SET_CURRENT_USER } from "../actions/types";

const initialState = {
    user: {},
    validToken: false
}


function securityReducer(state = initialState, action) {

    switch (action.type) {

        case SET_CURRENT_USER:
            return {
                ...state,
                validToken: booleanActionPayload(action.payload),
                user: action.payload
            }

        default:
            return state;
    }
}

const booleanActionPayload = (payload) => {
    if (payload) {
        return true;
    } else {
        return false;
    }
}

export default securityReducer;