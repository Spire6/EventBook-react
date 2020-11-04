import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { createNewUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class Register extends Component {

    constructor() {
        super();

        this.state = {
            username: "",
            fullName: "",
            password: "",
            confirmPassword: "",
            errors: {}
        };
        this.onChangeVariable = this.onChange.bind(this);
        this.onSubmitVariable = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            fullName: this.state.fullName,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
        };

        this.props.createNewUser(newUser, this.props.history);
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your Account to share events!</p>
                            <hr /><br />

                            <form onSubmit={this.onSubmitVariable}>

                                <h6>Full name</h6>
                                <div className="form-group">
                                    <input type="text"
                                        className="form-control form-control-lg"
                                        placeholder="Full name"
                                        name="fullName"
                                        value={this.state.fullName}
                                        onChange={this.onChangeVariable} />
                                </div>

                                <h6>E-mail address</h6>
                                <div className="form-group">
                                    <input type="email"
                                        className="form-control form-control-lg"
                                        placeholder="E-mail"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChangeVariable} />
                                </div>

                                <h6>Password </h6>
                                <div className="form-group">
                                    <input type="password"
                                        className="form-control form-control-lg"
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangeVariable} />
                                </div>

                                <h6>Confirm password </h6>
                                <div className="form-group">
                                    <input type="password"
                                        className="form-control form-control-lg"
                                        placeholder="Confirm password"
                                        name="confirmPassword"
                                        value={this.state.confirmPassword}
                                        onChange={this.onChangeVariable} />
                                </div> <br />

                                <button className="btn btn-block btn-info my-2 my-sm-0" type="submit"> <i className="fas fa-user-plus"></i> Create user</button>

                                <Link to={"/"} style={{ textDecoration: 'none' }}>
                                    <button type="button" className="btn btn-danger btn-block mt-4"><i className="fas fa-arrow-circle-left"></i> Cancel </button> {" "}
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

Register.propTypes = {
    createNewUser: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, { createNewUser })(Register);