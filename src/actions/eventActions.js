import axios from "axios";
import { GET_ERRORS, GET_EVENT, GET_EVENTS, DELETE_EVENT, GET_NUMBERS_OF_EVENTS, GET_ALL_CATEGORY } from "./types";


export const createEvent = (event, history, image) => async dispatch => {
    try {

        //image upload
        if (image !== null) {
            await axios.put("/api/event/uploadimage", image)

        }

        const res = await axios.put("/api/event", event);

        history.push(`/eventDetails/${res.data.id}`);
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

    const res = await axios.get("/api/event/public/all");
    dispatch({
        type: GET_EVENTS,
        payload: res.data
    });
    dispatch({
        type: GET_ERRORS,
        payload: {}
    });
    dispatch({
        type: GET_EVENT,
        payload: {}
    });
};


export const getEvent = (id, history) => async dispatch => {

    try {
        const res = await axios.get(`/api/event/public/${id}`);
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
        const res = await axios.get("/api/event/public/month");
        dispatch({
            type: GET_EVENTS,
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
        const res = await axios.get("/api/event/public/today");
        dispatch({
            type: GET_EVENTS,
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
        const res = await axios.get(`/api/event/public/all/${category}`);
        dispatch({
            type: GET_EVENTS,
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
        const res = await axios.get(`/api/event/public/search?title=${title}`);
        dispatch({
            type: GET_EVENTS,
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


export const getEventsByLocation = (location) => async dispatch => {
    try {
        const res = await axios.get(`/api/event/public/search/${location}`);
        dispatch({
            type: GET_EVENTS,
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


export const getEventsByUser = () => async dispatch => {
    try {
        const res = await axios.get(`/api/event/allByUser`);
        dispatch({
            type: GET_EVENTS,
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
}


export const getNumbersOfEvents = () => async dispatch => {
    const res = await axios.get(`/api/event/public/count`);
    dispatch({
        type: GET_NUMBERS_OF_EVENTS,
        payload: res.data
    });
};


export const getAllCategories = () => async dispatch => {

    const res = await axios.get("/api/category/all");
    dispatch({
        type: GET_ALL_CATEGORY,
        payload: res.data
    });
}


export const clearErrors = () => async dispatch => {
    dispatch({
        type: GET_ERRORS,
        payload: {}
    });
}

