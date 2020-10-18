import axios from "axios";
import { GET_ERRORS, GET_EVENT, GET_EVENTS, DELETE_EVENT } from "./types";


export const createEvent = (project, history) => async dispatch => {
    try {
        const res = await axios.post("/api/event", project);
        history.push("/browseEvents");
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


export const deleteEvent = id => async dispatch => {
    if (window.confirm("Are you sure? This will delete the event!")) {
        await axios.delete(`/api/event/${id}`);
        dispatch({
            type: DELETE_EVENT,
            payload: id
        });
    }


}