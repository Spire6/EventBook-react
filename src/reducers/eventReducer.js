import { GET_EVENTS, GET_EVENT, DELETE_EVENT, GET_MONTHLY_EVENTS, GET_TODAY_EVENTS, GET_EVENTS_BY_CATEGORY, GET_EVENTS_BY_NAME, GET_NUMBERS_OF_EVENTS, GET_ALL_CATEGORY } from "../actions/types";

const initialState = {
    events: [],
    event: {},
    countEvents: {},
    categories: []
};


function eventReducer(state = initialState, action) {
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

        case GET_EVENTS_BY_NAME:
            return {
                ...state,
                events: action.payload
            }

        case GET_NUMBERS_OF_EVENTS:
            return {
                ...state,
                countEvents: action.payload
            }

        case GET_ALL_CATEGORY:
            return {
                ...state,
                categories: action.payload
            }

        default:
            return state;
    }
}

export default eventReducer;