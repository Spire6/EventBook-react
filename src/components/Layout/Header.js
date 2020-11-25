import React, { Component } from 'react';
import logo from "../../Images/books.png";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions.js";

class Header extends Component {


    logout() {
        this.props.logout();
        window.location.href = "/";
    }

    render() {

        const { validToken, user } = this.props.security;

        const userIsAuthenticated = (
            <div >
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/userDetails" className="nav-link active" style={{ textDecoration: 'none' }}>
                            <i className="fas fa-user"></i>
                            {" " + user.fullName}
                        </Link>
                    </li>

                    <li>
                        <Link to="/logout" onClick={this.logout.bind(this)} style={{ textDecoration: 'none' }}>
                            <button className="btn btn btn-secondary my-2 my-sm-0" type="button"> <i className="fas fa-sign-out-alt"></i> Logout</button>
                        </Link>
                    </li>
                </ul>
            </div>
        );

        const userIsNotAuthenticated = (
            <div>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <button className="btn btn btn-secondary my-2 my-sm-0" type="button"> <i className="fas fa-sign-in-alt"></i> Login</button>
                        </Link>
                    </li>

                    <li>
                        <Link to="/register" style={{ textDecoration: 'none' }}>
                            <button className="btn btn btn-success my-2 my-sm-0" type="button"> <i className="fas fa-user-plus"></i> Register</button>
                        </Link>
                    </li>
                </ul>
            </div>
        );



        let headerLinks;


        if (validToken && user) {
            headerLinks = userIsAuthenticated;
        } else {
            headerLinks = userIsNotAuthenticated;
        }



        return (
            <React.Fragment>
                <header>
                    <div>
                        <nav className="navbar navbar-expand-sm bg-custom navbar-dark">
                            <div className="container">
                                <Link to="/">
                                    <div className="navbar-brand">
                                        <img src={logo} height="30" width="30" className="d-inline-block align-top" alt=""></img>
                                    </div>
                                    <div className="navbar-brand">
                                        EventBook
                            </div>
                                </Link>

                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item">
                                            <Link to="/" style={{ textDecoration: 'none' }}>
                                                <div className="nav-link">Home <span className="sr-only">(current)</span></div>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/browseEvents" style={{ textDecoration: 'none' }}>
                                                <div className="nav-link" href="/browseEvents">Browse events<span className="sr-only">(current)</span></div>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/createEvent" style={{ textDecoration: 'none' }}>
                                                <div className="nav-link" href="/createEvent">Create event</div>
                                            </Link>
                                        </li>

                                    </ul>

                                    {headerLinks}

                                </div>

                            </div>
                        </nav>
                    </div>
                </header>
            </React.Fragment>
        );
    }
}


Header.propTypes = {
    logout: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    security: state.security
});

export default connect(mapStateToProps, { logout })(Header);