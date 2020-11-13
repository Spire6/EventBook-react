import React, { Component } from 'react';
import { getEvent, createEvent, getAllCategories } from "../../actions/eventActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import bsCustomFileInput from 'bs-custom-file-input';


class UpdateEvent extends Component {

    constructor() {
        super()

        this.state = {
            id: "",
            name: "",
            location: "",
            description: "",
            imageName: "",
            ticketPrice: '',
            organizer: "",
            startDate: "",
            endDate: "",
            category: {
                id: "",
                categoryName: ""
            },

            errors: {},
            selectedFile: null,
            newImage: "",
            firstLoad: true
        }

        this.onChangeVariable = this.onChange.bind(this);
        this.onSubmitVariable = this.onSubmit.bind(this);
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
            imageName,
            ticketPrice,
            organizer,
            startDate,
            endDate,
            category
        } = nextProps.event;

        this.setState({
            id,
            name,
            location,
            description,
            imageName,
            ticketPrice,
            organizer,
            startDate,
            endDate,
            category
        });
    }


    componentDidMount() {
        this.props.getAllCategories();
        const { id } = this.props.match.params;
        this.props.getEvent(id, this.props.history);
        bsCustomFileInput.init();
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
            imageName: this.state.imageName,
            ticketPrice: this.state.ticketPrice,
            organizer: this.state.organizer,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            category: this.state.category
        }

        if (this.state.selectedFile !== null) {

            const fd = new FormData();
            fd.append('imageFile', this.state.selectedFile);
            fd.append('imageName', this.state.imageName);

            this.props.createEvent(updatedEvent, this.props.history, fd)
        } else {
            this.props.createEvent(updatedEvent, this.props.history, null)
        }

    }


    fileSelectedHandler = event => {
        const timestamp = Date.now();
        this.setState({
            selectedFile: event.target.files[0],
            imageName: timestamp + ".jpg",
            newImage: URL.createObjectURL(event.target.files[0])
        });
    }


    render() {

        const { event } = this.props;
        const categories = this.props.categories;
        const { errors } = this.state;
        const { newImage } = this.state;

        const actualImgPrev = (
            <div>
                <img className="fixedSizeImg float-right" src={`/api/event/public/image/${event.imageName}`} alt="" />
            </div>
        )
        const newImgPrev = (
            <div>
                <img className="fixedSizeImg float-right" src={this.state.newImage} alt="" />
            </div>
        )

        let imagePreview;

        if (newImage) {
            imagePreview = newImgPrev;
        } else {
            imagePreview = actualImgPrev;
        }


        return (
            <div className="project">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">

                            <div className="updateTitle">
                                {imagePreview}
                                <h5 className="display-4">Edit Event</h5>
                                <h1 className=""> {this.state.name} </h1>
                            </div>

                            <hr />

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
                                        {
                                            categories.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.categoryName}</option>
                                            ))
                                        }
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
                                        className="form-control form-control-lg"
                                        name="endDate"
                                        value={this.state.endDate}
                                        onChange={this.onChangeVariable} />
                                </div> <br />

                                <h6>Change event image</h6>
                                <div className="form-group">
                                    <div className="custom-file">
                                        <input id="inputGroupFile01"
                                            type="file"
                                            className={classnames("custom-file-input", { "is-invalid": errors.image })}
                                            accept="image/x-png,image/jpeg"
                                            onChange={this.fileSelectedHandler} />
                                        <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file (jpg/png)</label>
                                        {errors.image && <div className="invalid-feedback">{errors.image}</div>}
                                    </div>
                                </div><br />


                                <button type="submit" className="btn btn-info btn-block mt-4"> <i className="far fa-save"></i> Save event</button>

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
    getAllCategories: PropTypes.func.isRequired,
    createEvent: PropTypes.func.isRequired,
    event: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    event: state.event.event,
    categories: state.event.categories,
    errors: state.errors,
    security: state.security
})

export default connect(mapStateToProps, { getEvent, createEvent, getAllCategories })(UpdateEvent);
