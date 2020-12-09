import React, { Component } from 'react';
//import eventImage from "../../Images/eventimage.jpg";
import { Link } from "react-router-dom";

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


                    <img className="fixedSizeImg" src={`/api/event/public/image/${event.imageName}`} alt="sampleImage" />


                    <div className="desc">
                        <div className="itemPrice">
                            <h3>
                                <i className="fas fa-ticket-alt"></i> {event.ticketPrice ? event.ticketPrice + "$" : "FREE"}
                            </h3>
                        </div>
                        <h3>{event.name}</h3>
                        <div className="detailsOverflow">
                            <b> <i className="far fa-calendar-alt"> </i> Date: </b> {new Date(event.startDate).toLocaleDateString("en-US", dateOptions)} <br />
                            <b> <i className="far fa-clock"></i> Time:</b> {new Date(event.startDate).toLocaleTimeString("en-US", timeOptions)} <br />
                            <b> <i className="fas fa-thumbtack"></i> Location:</b> {event.location} <br />
                            <b> <i className="fas fa-bullhorn"></i> Category:</b> {event.category.categoryName} <br />
                            <b> <i className="fas fa-info-circle"></i> Description:</b>  {event.description} <br />
                        </div>
                    </div>


                    <Link to={`/eventDetails/${event.id}`} style={{ textDecoration: 'none' }}>
                        <div className="detailsbtn">
                            <button type="button" className="btn btn-danger btn-lg btn-block">
                                <i className="fas fa-angle-double-right"></i> {" "}
                             Event details
                            </button>
                        </div>
                    </Link>

                </div>

            </div>
        )
    }
}

export default EventItem;
