import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createEvent } from "../../actions/eventActions";
import { uploadImage } from "../../actions/uploadActions";
import classnames from "classnames";
import { Link } from "react-router-dom";

class AddEvent extends Component {


    constructor() {
        super()

        this.state = {
            name: "",
            location: "",
            description: "",
            imageName: "default.jpg",
            ticketPrice: "",
            startDate: "",
            endDate: "",
            category: {
                id: "1",
                categoryName: ""
            },
            errors: {},
            selectedFile: null
        }

        this.onChangeVariable = this.onChange.bind(this);
        this.onSubmitVariable = this.onSubmit.bind(this);
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
            imageName: this.state.imageName,
            ticketPrice: this.state.ticketPrice,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            category: this.state.category
        }

        if (this.state.selectedFile !== null) {

            const fd = new FormData();
            fd.append('imageFile', this.state.selectedFile);
            fd.append('imageName', this.state.imageName);

            this.props.uploadImage(fd);
            //this.fileUploadHandler();
        }

        this.props.createEvent(newEvent, this.props.history)
    }



    fileSelectedHandler = event => {
        const timestamp = Date.now();
        this.setState({
            selectedFile: event.target.files[0],
            imageName: timestamp + ".jpg"
        })
    }

    /*fileUploadHandler = () => {
        const fd = new FormData();
        fd.append('imageFile', this.state.selectedFile);
        fd.append('imageName', this.state.imageName);
        axios.post('http://localhost:8080/api/event/uploadimage', fd)
            .then(res => {
                console.log(res);
            });
    }*/

    render() {

        const { errors } = this.state;

        return (

            <div className="project">
                <div className="container">
                    <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center">Create New Event</h5>
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
                                    onChange={this.onChangeVariable}
                                >
                                    <option value="1">Education</option>
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
                                    value={this.state.startDate}
                                    onChange={this.onChangeVariable} />
                                <div className="invalid-feedback"> {errors.startDate} </div>
                            </div>

                            <h6>End Date</h6>
                            <div className="form-group">
                                <input type="datetime-local"
                                    className={classnames("form-control form-control-lg", { "is-invalid": errors.endDate })}
                                    name="endDate"
                                    value={this.state.endDate}
                                    onChange={this.onChangeVariable} />
                                <div className="invalid-feedback"> {errors.endDate} </div>
                            </div>

                            <h6>Upload image</h6>
                            <div className="form-group files color">
                                <input className="imageInput" type="file" onChange={this.fileSelectedHandler} />
                            </div><br />

                            <button type="submit" className="btn btn-info btn-block mt-4">Create</button>

                            <Link to={`/browseEvents`} style={{ textDecoration: 'none' }}>
                                <button type="button" className="btn btn-danger btn-block mt-4"><i className="fas fa-arrow-circle-left"></i> Cancel </button> {" "}
                            </Link>
                            <br /><br />

                        </form>
                    </div>

                </div>
            </div>

        )
    }
}


AddEvent.propTypes = {
    createEvent: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, { createEvent, uploadImage })(AddEvent);
