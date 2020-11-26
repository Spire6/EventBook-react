import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { login, clearErrors } from "../../actions/securityActions"

class Login extends Component {

    constructor() {
        super()

        this.state = {
            username: "",
            password: "",
            errors: {}
        };
        this.onChangeVariable = this.onChange.bind(this);
        this.onSubmitVariable = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.clearErrors();
        //redirect - Don't show login for logged in users                                
        if (this.props.security.validToken) {
            this.props.history.push("/");
        }
    }


    componentDidUpdate() {
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
        const LoginRequest = {
            username: this.state.username,
            password: this.state.password
        };

        this.props.login(LoginRequest)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    render() {

        const { errors } = this.state;

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center"> Log In</h1>
                            <p className="lead text-center">Log in to share your events!</p>
                            <hr /><br />

                            <form onSubmit={this.onSubmitVariable}>
                                <h6>E-mail</h6>
                                <div className="form-group">
                                    <input type="email"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.username
                                        })}
                                        placeholder="Email Address"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChangeVariable}
                                    />
                                    {
                                        errors.username && (
                                            <div className="invalid-feedback">{errors.username}</div>
                                        )
                                    }
                                </div>

                                <h6>Password</h6>
                                <div className="form-group">
                                    <input type="password"
                                        className={classnames("form-control form-control-lg", {
                                            "is-invalid": errors.password
                                        })}
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangeVariable}
                                    />
                                    {
                                        errors.password && (
                                            <div className="invalid-feedback">{errors.password}</div>
                                        )
                                    }
                                </div> <br />

                                <button className="btn btn-block btn-success my-2 my-sm-0" type="submit"> <i className="fas fa-sign-in-alt"></i> Submit</button>

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


Login.propTypes = {
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    security: state.security,
    errors: state.errors
});


export default connect(mapStateToProps, { login, clearErrors })(Login);
