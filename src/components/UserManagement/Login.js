import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Login extends Component {
    render() {
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center"> Log In</h1>
                            <p className="lead text-center">Log in to share your events!</p>
                            <hr /><br />
                            <form action="dashboard.html">

                                <h6>E-mail</h6>
                                <div className="form-group">
                                    <input type="email" className="form-control form-control-lg" placeholder="Email Address" name="email" />
                                </div>

                                <h6>Password</h6>
                                <div className="form-group">
                                    <input type="password" className="form-control form-control-lg" placeholder="Password" name="password" />
                                </div> <br />

                                <button className="btn btn-block btn-info my-2 my-sm-0" type="submit"> <i className="fas fa-sign-in-alt"></i> Submit</button>

                                <Link to={"/"} style={{ textDecoration: 'none' }}>
                                    <button type="button" className="btn btn-danger btn-block mt-4"><i className="fas fa-arrow-circle-left"></i> Cancel </button> {" "}
                                </Link>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;
