import React, { Component } from 'react';
import eventImage from "../Images/eventimage.jpg";
import { getEvent } from "../actions/eventActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteEvent } from "../actions/eventActions";

class EventItemDetails extends Component {

    constructor() {
        super()

        this.state = {
            id: "",
            name: "",
            location: "",
            description: "",
            startDate: "",
            endDate: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        const {
            id,
            name,
            location,
            description,
            startDate,
            endDate
        } = nextProps.event;

        this.setState({
            id,
            name,
            location,
            description,
            startDate,
            endDate
        });
    }


    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getEvent(id, this.props.history);
    }

    onDeleteClick = id => {
        this.props.deleteEvent(id);
    }


    render() {
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

        return (

            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="itemDetails">
                            <div className="backBtn">
                                <Link to={"/browseEvents"} style={{ textDecoration: 'none' }}>
                                    <button type="button" className="btn btn-info mt-4"><i className="fas fa-arrow-circle-left"></i> Back to to events </button> {" "}
                                </Link>
                                <Link to={`/updateEvent/${this.state.id}`} style={{ textDecoration: 'none' }}>
                                    <button type="button" className="btn btn-success mt-4"><i className="fas fa-edit"></i> Edit </button> {" "}
                                </Link>

                                <Link to={"/browseEvents"} style={{ textDecoration: 'none' }}>
                                    <button type="button" className="btn btn-danger mt-4" onClick={this.onDeleteClick.bind(this, this.state.id)}>
                                        <i className="fas fa-trash-alt" ></i> Remove
                                    </button>
                                </Link>

                            </div>

                            <div className="eventImageDetails">
                                <img src={eventImage} alt="eventImage" />
                            </div>

                            <div className="price">
                                <h1>
                                    <i className="fas fa-ticket-alt"></i> 49$
                                </h1>
                            </div>

                            <div className="descDetails">
                                <h1> {this.state.name} </h1>
                                <h5> <b> <i> <i className="fas fa-clock"></i>
                                    {" " + startDate} {" - "}
                                    {startTime}
                                </i></b></h5>
                                <h5> <b> <i> <i className="fas fa-bullhorn"></i> Education </i></b></h5>
                            </div>


                            <div className="details">
                                <h3> <i className="fas fa-calendar-alt"></i> Details</h3>

                                <b> Starts Date: </b> {startDate + " - " + startTime}  <br />
                                <b> End Date: </b> {endDate + " - " + endTime} <br />
                                <b>Location:</b> {this.state.location} <br />
                                <b>Category:</b> Education <br />
                                <b>Organizer:</b> User1 <br />
                                <b>Ticket:</b> 49 $ <br />

                                <hr />
                                <h3> <i className="fas fa-info-circle"></i> Description</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                  laboris nisi ut aliquip ex ea commodo consequat.</p>
                                <hr />
                                <h2> <i className="fas fa-ticket-alt"></i> Buy a ticket Now! </h2>

                                <button type="button" className="btn btn-info btn-block mt-4">PayPal</button>
                                <button type="button" className="btn btn-info btn-block mt-4">Debit or Credit Card</button>

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
    deleteEvent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    event: state.event.event
})

export default connect(mapStateToProps, { getEvent, deleteEvent })(EventItemDetails);
