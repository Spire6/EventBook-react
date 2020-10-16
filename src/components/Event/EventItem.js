import React, { Component } from 'react';
import eventImage from "../../Images/eventimage.jpg"

class EventItem extends Component {
    render() {
        return (
            <div>

                <div className="item">
                    <div className="eventImage">
                        <img src={eventImage} alt="sampleImage" />
                    </div>
                    <div className="desc">
                        <h3>Summary</h3>
                        <b>Date:</b> 2020.10.25 - 2020.10.26 <br />
                        <b>Location:</b> Pécs, Hungary <br /> <br />
                        <b>Description:</b> <i> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  </i>
                    </div>
                    <div className="detailsbtn">
                        <button type="button" className="btn btn-info btn-lg btn-block">Details</button>
                    </div>
                </div>

            </div>
        )
    }
}

export default EventItem;
