import React, { Component } from 'react';
import logo from "../../Images/logo.png";
import { Link } from "react-router-dom";

class Header extends Component {

    render() {
        return (
            <React.Fragment>
                <div>
                    <nav className="navbar navbar-expand-sm bg-info navbar-dark">

                        <Link to="/">
                            <div className="navbar-brand">
                                <img src={logo} height="30" className="d-inline-block align-top" alt=""></img>
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

                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <button className="btn btn btn-secondary my-2 my-sm-0" type="button"> <i className="fas fa-sign-in-alt"></i> Login</button>
                            </Link>

                            <Link to="/register" style={{ textDecoration: 'none' }}>
                                <button className="btn btn btn-success my-2 my-sm-0" type="button"> <i className="fas fa-user-plus"></i> Register</button>
                            </Link>
                        </div>


                    </nav>
                </div>
            </React.Fragment>
        );
    }
}

export default Header;