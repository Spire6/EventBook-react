import React, { Component } from 'react';
import { getEvent } from "../../actions/eventActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteEvent } from "../../actions/eventActions";
import { GOOGLE_API_KEY } from "../../maps/config";
import Paypal from '../PayPal/PayPal';


class EventItemDetails extends Component {

    constructor() {
        super()

        this.state = {
            id: "",
            name: "",
            location: "",
            description: "",
            imageName: "",
            ticketPrice: "",
            startDate: "",
            endDate: "",
            user: {
                id: "",
                username: "",
                fullName: ""
            },
            category: {
                id: "",
                categoryName: ""
            }
        }
    }

    static getDerivedStateFromProps(nextProps, state) {
        //state = nextProps.event;
        return nextProps.event;
    }


    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getEvent(id, this.props.history);
    }

    onDeleteClick = id => {
        this.props.deleteEvent(id, this.props.history);
    }


    render() {

        const { user } = this.props.security;
        const { event } = this.props;
        let editDeleteButtons;

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

        const startDate = new Date(this.state.startDate).toLocaleDateString("en-US", dateOptions);
        const startTime = new Date(this.state.startDate).toLocaleTimeString("en-US", timeOptions);
        const endDate = new Date(this.state.endDate).toLocaleDateString("en-US", dateOptions);
        const endTime = new Date(this.state.endDate).toLocaleTimeString("en-US", timeOptions);
        const imageUrl = `/api/event/public/image/${event.imageName}`;

        const activeUserButtons = (
            <div>
                <Link to={"/browseEvents"} style={{ textDecoration: 'none' }}>
                    <button type="button" className="btn btn-secondary mt-4"><i className="fas fa-arrow-circle-left"></i> Back to to events </button> {" "}
                </Link>

                <Link to={`/updateEvent/${this.state.id}`} style={{ textDecoration: 'none' }}>
                    <button type="button" className="btn btn-success mt-4 inactive"> <i className="fas fa-edit"></i> Edit </button> {" "}
                </Link>

                <button type="button" className="btn btn-danger mt-4" onClick={this.onDeleteClick.bind(this, this.state.id)}>
                    <i className="fas fa-trash-alt" ></i> Remove
        </button>
            </div>
        );

        const notActiveUserButtons = (
            <div>
                <Link to={"/browseEvents"} style={{ textDecoration: 'none' }}>
                    <button type="button" className="btn btn-secondary mt-4"><i className="fas fa-arrow-circle-left"></i> Back to to events </button> {" "}
                </Link>

            </div>
        );


        if (user.username === this.state.user.username) {
            editDeleteButtons = activeUserButtons;
        } else if (this.props.security.validToken !== false && user.roles.includes("Admin")) {
            editDeleteButtons = activeUserButtons;
        }
        else {
            editDeleteButtons = notActiveUserButtons;
        }


        return (

            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="itemDetails">
                            <div className="backBtn">

                                {editDeleteButtons}

                            </div>

                            <div className="priceInDetails">

                                <i className="fas fa-ticket-alt"></i> {this.state.ticketPrice ? this.state.ticketPrice + "$" : "FREE"}

                            </div>


                            <img className="fixedSizeImg" src={imageUrl} alt="eventImage" />


                            <div className="descDetails">
                                <p className="eventTitle"> {this.state.name} </p>
                                <h5> <b> <i> <i className="fas fa-clock"></i>
                                    {" " + startDate} {" - "}
                                    {startTime}
                                </i></b></h5>
                                <h5> <b> <i> <i className="fas fa-bullhorn"></i> {this.state.category.categoryName} </i></b></h5>

                            </div>


                            <div className="longDetails">

                                <iframe className="googleMap"
                                    title="map"
                                    width="450"
                                    height="250"
                                    frameBorder="0"
                                    src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_API_KEY}&q=${event.location}`} allowFullScreen>
                                </iframe>

                                <h3> <i className="fas fa-calendar-alt"></i> Details</h3>

                                <b> Starts Date: </b> {startDate + " - " + startTime}  <br />
                                <b> End Date: </b> {endDate + " - " + endTime} <br />
                                <b>Location:</b> {this.state.location} <br />
                                <b>Category:</b> {this.state.category.categoryName} <br />
                                <b>Organizer:</b> {this.state.user.fullName} <br />
                                <b>Ticket:</b> {this.state.ticketPrice ? this.state.ticketPrice + "$" : "FREE"} <br /> <br />

                                <hr />
                                <h3> <i className="fas fa-info-circle"></i> Description</h3>
                                {this.state.description}
                                <hr />


                                <h2> <i className="fas fa-ticket-alt"></i> Buy a ticket Now! </h2> <br />


                                <div className="paypalbtn">

                                    {this.state.ticketPrice ?
                                        <Paypal price={this.state.ticketPrice}
                                            eventId={this.state.id}
                                            username={user.username} />
                                        :
                                        <div className="text-success">
                                            <b>The event is free, there is no tickets available!</b>
                                        </div>
                                    }
                                </div> <br />


                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}


EventItemDetails.propTypes = {
    getEvent: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired,
    deleteEvent: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    event: state.event.event,
    security: state.security
})

export default connect(mapStateToProps, { getEvent, deleteEvent })(EventItemDetails);
