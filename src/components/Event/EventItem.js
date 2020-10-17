import React, { Component } from 'react';
import eventImage from "../../Images/eventimage.jpg"

class EventItem extends Component {
    render() {

        const { event } = this.props;

        const dateOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        };

        const timeOptions = {
            timeZone: "Europe/Budapest",
            hour12: false,
            hour: "2-digit",
            minute: "2-digit"

        };

        return (
            <div>

                <div className="item">
                    <div className="eventImage">
                        <img src={eventImage} alt="sampleImage" />
                    </div>
                    <div className="desc">
                        <h3>{event.name}</h3>
                        <b>Date:</b> {new Date(event.startDate).toLocaleDateString("en-US", dateOptions)} <br />
                        <b>Time:</b> {new Date(event.startDate).toLocaleTimeString("en-US", timeOptions)} <br />
                        <b>Location:</b> {event.location} <br /> <br />
                        <b>Description:</b> <i> {event.description} </i> <br />


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
