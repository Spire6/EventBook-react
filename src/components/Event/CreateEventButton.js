import React from 'react';
import { Link } from "react-router-dom";
import shareLogo from "../../Images/share.svg";

const CreateEventButton = () => {
    return (
        <React.Fragment>
            <Link to="/createEvent" style={{ textDecoration: 'none' }}>

                <div className="bigbtn">
                    <div className="bigbtn-text">
                        <img src={shareLogo} height="150" className="d-inline-block align-top" alt=""></img> <br></br>
                        Share an event!
				    </div>
                    <div className="dashDescr">Only registered users can create and share new events</div>
                </div>

            </Link>
        </React.Fragment>
    )
}

export default CreateEventButton;
