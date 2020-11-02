import axios from "axios";

export const uploadImage = (fd) => async dispatch => {

    await axios.post('http://localhost:8080/api/event/uploadimage', fd)
        .then(res => {
            console.log(res);
        });
};
