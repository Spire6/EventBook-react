import React, { Component } from 'react';
import EventItem from './Event/EventItem';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getEvents, getMonthlyEvents, getTodayEvents, getEventsByCategory, getEventsByName, getNumbersOfEvents } from "../actions/eventActions";
import PropTypes from "prop-types";
import { StickyContainer, Sticky } from "react-sticky";

class BrowseEvents extends Component {

    constructor() {
        super();
        this.state = {
            errors: {}
        }
    }

    static getDerivedStateFromProps(nextProps, state) {
        if (nextProps.errors) {
            return { errors: nextProps.errors }
        } else {
            return null;
        }
    }

    componentDidMount() {
        this.props.getEvents();
        this.props.getNumbersOfEvents();
    }

    allEventsOnClick() {
        this.props.getEvents();
    }

    monthlyEventsOnClick() {
        this.props.getMonthlyEvents();
    }

    todayEventsOnClick() {
        this.props.getTodayEvents();
    }

    categoryOnChange(categoryName) {
        this.props.getEventsByCategory(categoryName);
    }

    searchByNameOnChange(title) {
        this.props.getEventsByName(title);
    }

    render() {

        const { errors } = this.state;
        const { events } = this.props.event;
        const { countEvents } = this.props.event;
        let BoardContent;

        const boardAlgorithm = (errors) => {
            if (errors.eventNotFound) {
                return (
                    <div className="col-sm-9">
                        <div className="alert alert-danger text-center" role="alert">
                            {errors.eventNotFound}
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="col-sm-9">
                        <div className="alert alert-info text-center" role="alert">
                            Total: {events.length} results found.
                        </div>
                        {
                            events.map(event => (
                                <EventItem key={event.id} event={event} />
                            ))
                        }
                    </div>
                );
            }
        }

        BoardContent = boardAlgorithm(errors);

        return (
            <div>
                <StickyContainer>

                    <div className="container">

                        <div className="row">
                            <div className="col-sm-3" >
                                <Sticky>{({ style }) =>
                                    <div style={style}>

                                        <form className="navbar-form navbar-left" role="search">
                                            <h3> <i className="fas fa-search"></i> Find your event!</h3> <hr /><br />
                                            <h6>Name</h6>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Quize night..." onChange={e => this.searchByNameOnChange(e.target.value)} />
                                            </div>

                                            <h6>Category</h6>
                                            <div className="form-group">
                                                <select className="browser-default custom-select"
                                                    name="category"
                                                    onChange={e => this.categoryOnChange(e.target.value)}>
                                                    <option value="">All category</option>
                                                    <option value="Education">Education</option>
                                                    <option value="Art">Art</option>
                                                    <option value="Music">Music</option>
                                                    <option value="Culture">Culture</option>
                                                    <option value="Party">Party</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </form> <br />

                                        <Link to="/createEvent" style={{ textDecoration: 'none' }}>
                                            <button type="button" className="btn btn-success btn-lg btn-block">
                                                <i className="far fa-calendar-plus"></i> Create Event
                                        </button>
                                        </Link> <br />
                                        <button type="button" className="btn btn-info btn-lg btn-block" onClick={this.allEventsOnClick.bind(this)}>All events <br />({countEvents.allEvents})<br /></button>
                                        <button type="button" className="btn btn-info btn-lg btn-block" onClick={this.monthlyEventsOnClick.bind(this)}>Events in this month<br />({countEvents.monthlyEvents})<br /></button>
                                        <button type="button" className="btn btn-info btn-lg btn-block" onClick={this.todayEventsOnClick.bind(this)}>Events today <br /> ({countEvents.dailyEvents}) <br /></button> <br /><br /><br />
                                    </div>
                                }</Sticky>
                            </div>

                            {BoardContent}

                        </div>
                    </div>
                </StickyContainer>
            </div>
        );
    }
}


BrowseEvents.propTypes = {
    event: PropTypes.object.isRequired,
    getEvents: PropTypes.func.isRequired,
    getMonthlyEvents: PropTypes.func.isRequired,
    getTodayEvents: PropTypes.func.isRequired,
    getEventsByCategory: PropTypes.func.isRequired,
    getEventsByName: PropTypes.func.isRequired,
    getNumbersOfEvents: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    event: state.event,
    errors: state.errors
});

export default connect(mapStateToProps, { getEvents, getMonthlyEvents, getTodayEvents, getEventsByCategory, getEventsByName, getNumbersOfEvents })(BrowseEvents);
