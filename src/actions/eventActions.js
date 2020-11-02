import axios from "axios";
import { GET_ERRORS, GET_EVENT, GET_EVENTS, DELETE_EVENT, GET_MONTHLY_EVENTS, GET_TODAY_EVENTS, GET_EVENTS_BY_CATEGORY, GET_EVENTS_BY_NAME, GET_NUMBERS_OF_EVENTS } from "./types";


export const createEvent = (event, history) => async dispatch => {
    try {
        await axios.post("/api/event", event);
        history.push(`/eventDetails/${event.id}`);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};


export const getEvents = () => async dispatch => {

    const res = await axios.get("/api/event/all");
    dispatch({
        type: GET_EVENTS,
        payload: res.data
    });
    dispatch({
        type: GET_ERRORS,
        payload: {}
    });
};


export const getEvent = (id, history) => async dispatch => {

    try {
        const res = await axios.get(`/api/event/${id}`);
        dispatch({
            type: GET_EVENT,
            payload: res.data
        });
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (error) {
        history.push('/browseEvents');
    }
};


export const deleteEvent = (id, history) => async dispatch => {
    if (window.confirm("Are you sure? This will delete the event!")) {
        await axios.delete(`/api/event/${id}`);
        history.push("/browseEvents");
        dispatch({
            type: DELETE_EVENT,
            payload: id
        });
    }


}


export const getMonthlyEvents = () => async dispatch => {
    try {
        const res = await axios.get("/api/event/month");
        dispatch({
            type: GET_MONTHLY_EVENTS,
            payload: res.data
        });
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }

};


export const getTodayEvents = () => async dispatch => {
    try {
        const res = await axios.get("/api/event/today");
        dispatch({
            type: GET_TODAY_EVENTS,
            payload: res.data
        });
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }


};


export const getEventsByCategory = (category) => async dispatch => {
    try {
        const res = await axios.get(`/api/event/all/${category}`);
        dispatch({
            type: GET_EVENTS_BY_CATEGORY,
            payload: res.data
        });
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }

};

export const getEventsByName = (title) => async dispatch => {
    try {
        const res = await axios.get(`/api/event/search?title=${title}`);
        dispatch({
            type: GET_EVENTS_BY_NAME,
            payload: res.data
        });
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const getNumbersOfEvents = () => async dispatch => {
    const res = await axios.get(`/api/event/count`);
    dispatch({
        type: GET_NUMBERS_OF_EVENTS,
        payload: res.data
    });
}

