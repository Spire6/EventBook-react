import React, { Component } from 'react';
import { getEventsByUser } from "../../actions/eventActions";
import { getAllUsers } from "../../actions/adminActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EventItem from '../Event/EventItem';
import UserList from './UserList';

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
        this.props.getAllUsers();
    }

    render() {
        const { user } = this.props.security;
        const { events } = this.props.event;
        const { userList } = this.props.admin;
        const { errors } = this.state;
        let eventsBoard;
        let usersBoard;

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
                        <div className="alert alert-success text-center" role="alert">
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


        eventsBoard = boardAlgorithm(errors);

        if (user.roles.includes("Admin")) {
            usersBoard = (
                <div className="userDetailsTitle">
                    <h2>User list</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Full Name</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userList.map(user => (
                                    <UserList key={user.id} user={user} />
                                ))
                            }
                        </tbody>
                    </table>


                </div>
            );
        }


        return (
            <div className="row">
                <div className="col-md-8 m-auto">

                    <div className="userImage">
                        <i className="fas fa-user-circle"></i>
                    </div>

                    <div className="userDetails">
                        <h2>{user.fullName}</h2>
                        <h5>({user.roles.includes("Admin") ? "Admin" : "User"})</h5>
                        <h6>{user.username}</h6>

                    </div>
                    <hr />


                    {usersBoard}

                    <div className="userDetailsTitle">
                        <h3>My events</h3>
                        <hr />
                    </div>


                    <div className="myEvents">
                        {eventsBoard}
                    </div>

                </div>
            </div>
        )
    }
}


UserDetails.propTypes = {
    getEventsByUser: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired,
    getAllUsers: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    event: state.event,
    security: state.security,
    admin: state.admin,
    errors: state.errors
})

export default connect(mapStateToProps, { getEventsByUser, getAllUsers })(UserDetails);
