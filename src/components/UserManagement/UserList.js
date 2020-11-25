import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { deleteUser } from "../../actions/adminActions"

class UserList extends Component {

    onDeleteClick = id => {
        this.props.deleteUser(id);
    }

    render() {

        const { user } = this.props;

        return (
            <Fragment>
                <tr>
                    <td>{user.id}</td>
                    <td>{user.fullName}</td>
                    <td>{user.username}</td>
                    <td>
                        <button type="button" className="btn btn-danger" onClick={this.onDeleteClick.bind(this, user.id)}>
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            </Fragment>
        )
    }
}

UserList.propTypes = {
    deleteUser: PropTypes.func.isRequired
}

export default connect(null, { deleteUser })(UserList);