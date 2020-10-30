import { GET_EVENTS, GET_EVENT, DELETE_EVENT, GET_MONTHLY_EVENTS, GET_TODAY_EVENTS, GET_EVENTS_BY_CATEGORY } from "../actions/types";

const initialState = {
    events: [],
    event: {}
};


export default function (state = initialState, action) {
    switch (action.type) {

        case GET_EVENTS:
            return {
                ...state,
                events: action.payload
            };

        case GET_EVENT:
            return {
                ...state,
                event: action.payload
            };

        case DELETE_EVENT:
            return {
                ...state,
                events: state.events.filter(event => event.id !== action.payload)
            };

        case GET_MONTHLY_EVENTS:
            return {
                ...state,
                events: action.payload
            };

        case GET_TODAY_EVENTS:
            return {
                ...state,
                events: action.payload
            };

        case GET_EVENTS_BY_CATEGORY:
            return {
                ...state,
                events: action.payload
            }


        default:
            return state;
    }
}