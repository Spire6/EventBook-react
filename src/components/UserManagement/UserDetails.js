import React, { Component } from 'react';
import { getEventsByUser } from "../../actions/eventActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EventItem from '../Event/EventItem';

class UserDetails extends Component {

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
        this.props.getEventsByUser();
    }

    render() {
        const { user } = this.props.security;
        const { events } = this.props.event;
        const { errors } = this.state;
        let BoardContent;

        const boardAlgorithm = (errors) => {
            if (errors.eventNotFound) {
                return (
                    <div className="alert alert-danger text-center" role="alert">
                        {errors.eventNotFound}
                    </div>
                );
            } else {
                return (
                    <div className="">
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
            <div className="row">
                <div className="col-md-8 m-auto">

                    <div className="userImage">
                        <i className="fas fa-user-circle"></i>
                    </div>

                    <div className="userDetails">
                        <h2>{user.fullName}</h2>
                        <h5>{user.username}</h5>
                    </div>

                    <hr />

                    <div className="myEventsTitle">
                        <h3>My events</h3>
                        <hr />
                    </div>


                    <div className="myEvents">
                        {BoardContent}
                    </div>

                </div>
            </div>
        )
    }
}


UserDetails.propTypes = {
    getEventsByUser: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    event: state.event,
    security: state.security,
    errors: state.errors
})

export default connect(mapStateToProps, { getEventsByUser })(UserDetails);
