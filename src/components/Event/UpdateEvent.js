import React, { Component } from 'react';
import { getEvent, createEvent } from "../../actions/eventActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import moment from "moment";
//import moment from "moment-timezone";

class UpdateEvent extends Component {

    constructor() {
        super()

        this.state = {
            id: "",
            name: "",
            location: "",
            description: "",
            ticketPrice: "",
            startDate: "",
            endDate: "",
            category: {
                id: "",
                categoryName: ""
            },
            errors: {}
        }

        this.onChangeVariable = this.onChange.bind(this);
        this.onSubmitVariable = this.onSubmit.bind(this)
    }


    componentWillReceiveProps(nextProps) {

        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }

        const {
            id,
            name,
            location,
            description,
            ticketPrice,
            startDate,
            endDate,
            category
        } = nextProps.event;

        this.setState({
            id,
            name,
            location,
            description,
            ticketPrice,
            startDate,
            endDate,
            category
        });
    }


    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getEvent(id, this.props.history);
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();

        const updatedEvent = {
            id: this.state.id,
            name: this.state.name,
            location: this.state.location,
            description: this.state.description,
            ticketPrice: this.state.ticketPrice,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            category: this.state.category
        }

        this.props.createEvent(updatedEvent, this.props.history)
    }


    render() {

        const { errors } = this.state
        const startDate = moment(this.state.startDate).format("yyyy-MM-DDThh:mm")
        const endDate = moment(this.state.endDate).format("yyyy-MM-DDThh:mm")

        return (

            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Edit Event</h5>
                            <h1 className="text-center"> {this.state.name} </h1>
                            <hr /><br />

                            <form onSubmit={this.onSubmitVariable}>
                                <h6>Event name</h6>
                                <div className="form-group">
                                    <input type="text"
                                        className={classnames("form-control form-control-lg", { "is-invalid": errors.name || errors.eventName })}
                                        placeholder="Event name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChangeVariable} />
                                    {errors.name && (<div className="invalid-feedback"> {errors.name}</div>)}
                                    {errors.eventName && (<div className="invalid-feedback"> {errors.eventName}</div>)}
                                </div>

                                <h6>Location</h6>
                                <div className="form-group">
                                    <input type="text"
                                        className={classnames("form-control form-control-lg", { "is-invalid": errors.location })}
                                        placeholder="Location"
                                        name="location"
                                        value={this.state.location}
                                        onChange={this.onChangeVariable} />
                                    <div className="invalid-feedback"> {errors.location} </div>
                                </div>

                                <h6>Category</h6>
                                <div className="form-group">
                                    <select className="browser-default custom-select"
                                        name="category"
                                        value={this.state.category.id}
                                        onChange={this.onChangeVariable}>
                                        <option value="1" selected>Education</option>
                                        <option value="2">Art</option>
                                        <option value="3">Music</option>
                                        <option value="4">Culture</option>
                                        <option value="5">Party</option>
                                        <option value="6">Other</option>
                                    </select>
                                </div>

                                <h6>Description</h6>
                                <div className="form-group">
                                    <textarea
                                        className={classnames("form-control form-control-lg", { "is-invalid": errors.description })}
                                        placeholder="Description of the event"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.onChangeVariable}
                                    ></textarea>
                                    <div className="invalid-feedback"> {errors.description} </div>
                                </div>

                                <h6>Ticket price</h6>
                                <div className="form-group">
                                    <input
                                        type="number"
                                        className="browser-default custom-select"
                                        placeholder="Free"
                                        min="0"
                                        name="ticketPrice"
                                        value={this.state.ticketPrice}
                                        onChange={this.onChangeVariable}>
                                    </input>
                                </div>

                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input type="datetime-local"
                                        className={classnames("form-control form-control-lg", { "is-invalid": errors.startDate })}
                                        name="startDate"
                                        value={startDate}
                                        onChange={this.onChangeVariable} />
                                    <div className="invalid-feedback"> {errors.startDate} </div>
                                </div>

                                <h6>End Date</h6>
                                <div className="form-group">
                                    <input type="datetime-local"
                                        className="form-control form-control-lg"
                                        name="endDate"
                                        value={endDate}
                                        onChange={this.onChangeVariable} />
                                </div>

                                <button type="submit" className="btn btn-info btn-block mt-4">Save event</button>

                                <Link to={`/eventDetails/${this.state.id}`} style={{ textDecoration: 'none' }}>
                                    <button type="button" className="btn btn-danger btn-block mt-4"><i className="fas fa-arrow-circle-left"></i> Cancel </button> {" "}
                                </Link>
                                <br /><br />

                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}


UpdateEvent.propTypes = {
    getEvent: PropTypes.func.isRequired,
    createEvent: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    event: state.event.event,
    errors: state.errors
})

export default connect(mapStateToProps, { getEvent, createEvent })(UpdateEvent);
