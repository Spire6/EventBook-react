import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createEvent } from "../../actions/eventActions";
import classnames from "classnames";

class AddEvent extends Component {


    constructor() {
        super()

        this.state = {
            name: "",
            location: "",
            description: "",
            startDate: "",
            endDate: "",
            errors: {}
        }

        this.onChangeVariable = this.onChange.bind(this);
        this.onSubmitVariable = this.onSubmit.bind(this)
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();

        const newEvent = {
            name: this.state.name,
            location: this.state.location,
            description: this.state.description,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        }

        this.props.createEvent(newEvent, this.props.history)
    }


    render() {

        const { errors } = this.state

        return (

            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create New Event</h5>
                            <hr /><br />
                            <form onSubmit={this.onSubmitVariable}>
                                <h6>Event name</h6>
                                <div className="form-group">
                                    <input type="text"
                                        className={classnames("form-control form-control-lg", { "is-invalid": errors.name })}
                                        placeholder="Event name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChangeVariable} />
                                    <div className="invalid-feedback"> {errors.name} </div>
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

                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input type="datetime-local"
                                        className={classnames("form-control form-control-lg", { "is-invalid": errors.startDate })}
                                        name="startDate"
                                        value={this.state.startDate}
                                        onChange={this.onChangeVariable} />
                                    <div className="invalid-feedback"> {errors.startDate} </div>
                                </div>

                                <h6>End Date</h6>
                                <div className="form-group">
                                    <input type="datetime-local"
                                        className="form-control form-control-lg"
                                        name="endDate"
                                        value={this.state.endDate}
                                        onChange={this.onChangeVariable} />
                                </div>

                                <button type="submit" className="btn btn-info btn-block mt-4">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}


AddEvent.propTypes = {
    createEvent: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, { createEvent })(AddEvent);
