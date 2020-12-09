import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { deleteUser } from "../../actions/adminActions"
import classnames from "classnames";

class UserList extends Component {

    onDeleteClick = id => {
        this.props.deleteUser(id);
    }

    render() {

        const { user } = this.props;
        const loggedInUser = this.props.security.user.username;

        return (
            <Fragment>
                <tr>
                    <td>{user.id}</td>
                    <td>{user.fullName}</td>
                    <td>{user.username}</td>
                    <td>
                        <button
                            type="button"
                            className={classnames("btn btn-danger", { "disabled": loggedInUser == user.username })}
                            onClick={this.onDeleteClick.bind(this, user.id)}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            </Fragment>
        )
    }
}

UserList.propTypes = {
    deleteUser: PropTypes.func.isRequired,
    security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    security: state.security,
});

export default connect(mapStateToProps, { deleteUser })(UserList);