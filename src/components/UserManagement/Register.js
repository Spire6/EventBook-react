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

    componentDidMount() {
        //redirect - Don't show registration for logged in users                                
        if (this.props.security.validToken) {
            this.props.history.push("/");
        }
    }

    static getDerivedStateFromProps(nextProps, state) {
        if (nextProps.errors) {
            return { errors: nextProps.errors }
        }
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

        const { errors } = this.state;

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
                                        className={classnames("form-control form-control-lg", { "is-invalid": errors.fullName })}
                                        placeholder="Full name"
                                        name="fullName"
                                        value={this.state.fullName}
                                        onChange={this.onChangeVariable} />
                                    {
                                        errors.fullName && (
                                            <div className="invalid-feedback">{errors.fullName}</div>
                                        )
                                    }
                                </div>

                                <h6>E-mail address</h6>
                                <div className="form-group">
                                    <input type="email"
                                        className={classnames("form-control form-control-lg", { "is-invalid": errors.username })}
                                        placeholder="E-mail"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChangeVariable} />
                                    {
                                        errors.username && (
                                            <div className="invalid-feedback">{errors.username}</div>
                                        )
                                    }
                                </div>

                                <h6>Password </h6>
                                <div className="form-group">
                                    <input type="password"
                                        className={classnames("form-control form-control-lg", { "is-invalid": errors.password })}
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangeVariable} />
                                    {
                                        errors.password && (
                                            <div className="invalid-feedback">{errors.password}</div>
                                        )
                                    }
                                </div>

                                <h6>Confirm password </h6>
                                <div className="form-group">
                                    <input type="password"
                                        className={classnames("form-control form-control-lg", { "is-invalid": errors.confirmPassword })}
                                        placeholder="Confirm password"
                                        name="confirmPassword"
                                        value={this.state.confirmPassword}
                                        onChange={this.onChangeVariable} />
                                    {
                                        errors.confirmPassword && (
                                            <div className="invalid-feedback">{errors.confirmPassword}</div>
                                        )
                                    }
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
    security: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
    errors: state.errors,
    security: state.security
});

export default connect(mapStateToProps, { createNewUser })(Register);