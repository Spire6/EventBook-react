import React from 'react';
import { Link } from "react-router-dom";
import calendarLogo from "../../Images/calendar.svg";

const BrowseEventsButton = () => {
    return (
        <React.Fragment>
            <Link to="/browseEvents" style={{ textDecoration: 'none' }}>

                <div className="bigbtn">
                    <div className="bigbtn-text">
                        <img src={calendarLogo} height="150" width="150" className="d-inline-block align-top" alt=""></img> <br></br>
                    Explore events!
                </div>
                    <div className="dashDescr">
                        Explore local events without registration!
                </div>
                </div>

            </Link>
        </React.Fragment>
    )
}

export default BrowseEventsButton;
