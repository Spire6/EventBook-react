import React, { Component } from 'react';
import EventItem from './Event/EventItem';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getEvents } from "../actions/eventActions";
import PropTypes from "prop-types";
import { StickyContainer, Sticky } from "react-sticky";

class BrowseEvents extends Component {


    componentDidMount() {
        this.props.getEvents();
    }

    render() {

        const { events } = this.props.event

        return (
            <div>
                <StickyContainer>

                    <div className="container">

                        <div className="row">
                            <div className="col-sm-3" >
                                <Sticky>{({ style }) =>
                                    <div style={style}>
                                        <form className="navbar-form navbar-left" role="search">
                                            <h2>Find your event!</h2>
                                            <div className="form-group">
                                                <input type="text" className="form-control" placeholder="Quize night..." />
                                            </div>
                                            <button type="submit" className="btn btn-info btn-lg btn-block">
                                                <i className="fas fa-search"></i> Search
                                        </button>
                                        </form> <br /> <br /> <br />

                                        <Link to="/createEvent" style={{ textDecoration: 'none' }}>
                                            <button type="button" className="btn btn-success btn-lg btn-block">
                                                <i className="far fa-calendar-plus"></i> Create Event
                                        </button>
                                        </Link> <br />
                                        <button type="button" className="btn btn-info btn-lg btn-block">All events <br />(55)<br /></button>
                                        <button type="button" className="btn btn-info btn-lg btn-block">Events in a month <br />(12)<br /></button>
                                        <button type="button" className="btn btn-info btn-lg btn-block">Events today <br /> (3) <br /></button> <br /><br /><br />
                                    </div>
                                }</Sticky>
                            </div>

                            <div className="col-sm-9">


                                {
                                    events.map(event => (
                                        <EventItem key={event.id} event={event} />
                                    ))
                                }


                            </div>

                        </div>
                    </div>
                </StickyContainer>
            </div>
        );
    }
}


BrowseEvents.propTypes = {
    event: PropTypes.object.isRequired,
    getEvents: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    event: state.event,
});

export default connect(mapStateToProps, { getEvents })(BrowseEvents);
