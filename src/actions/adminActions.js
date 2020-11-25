import axios from "axios";
import { GET_ALL_USERS, DELETE_USER } from "./types";


export const getAllUsers = () => async dispatch => {
    const res = await axios.get("/api/users/all");
    dispatch({
        type: GET_ALL_USERS,
        payload: res.data
    });
}

export const deleteUser = id => async dispatch => {

    if (window.confirm("Are you sure?")) {
        await axios.delete(`/api/users/${id}`);

        dispatch({
            type: DELETE_USER,
            payload: id
        });
    }
}

