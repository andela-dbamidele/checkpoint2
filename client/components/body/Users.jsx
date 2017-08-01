import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { getUsers,
  editUserRole,
  deleteUser
} from '../../actions/usersAction';
import UserCard from './cards/UsersCard';

/**
 * @class Users
 * @extends {Component}
 */
export class Users extends Component {
  /**
   * Creates an instance of Users.
   * @param {object} props
   * @memberOf Users
   */
  constructor(props) {
    super(props);
    this.usersPerPage = 10;
    const { users } = this.props;
    this.state = {
      users: users.users,
      pageCount: Math.ceil(users.count / this.docsPerPage),
      offset: 0,
      editedRole: '',
      errors: this.props.errors,
      loading: true,
      cantSave: false
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.editUser = this.editUser.bind(this);
    this.deleteUserCard = this.deleteUserCard.bind(this);
  }

  /**
   * Get all users on page load
   * and initialize sidebar
   * @method componentDidMount
   * @return {void}
   * @memberOf Users
   */
  componentDidMount() {
    if (!this.props.auth.isAuthenticated ||
      this.props.auth.user.roleId !== 1
    ) {
      this.props.history.push('/documents');
    }
    this.props.getUsers();
    $('.button-collapse').sideNav();
  }

  /**
   * Updates the state on store change
   * @method componentWillReceiveProps
   * @param {object} nextProps
   * @return {void}
   * @memberOf Users
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      users: nextProps.users.users,
      pageCount: Math.ceil(nextProps.users.totalCount / this.usersPerPage),
      errors: nextProps.errors,
    });
  }

  /**
   * Handles form element onChange event
   * @method onChange
   * @param {event} e
   * @return {void}
   * @memberOf Users
   */
  onChange(e) {
    this.setState({
      editedRole: e.target.value,
    });
  }

  /**
   * calls the action that deletes user from db
   * @method deleteUserCard
   * @param {number} id - user's id
   * @return {void}
   * @memberOf Users
   */
  deleteUserCard(id) {
    this.props.deleteUser(id)
    .then((res) => {
      if (!res) {
        swal(
          'Success',
          'User deleted successfully!',
          'success'
        ).then(() => {
          this.props.getUsers();
        });
      } else {
        this.setState({
          cantSave: true
        });
        swal(
          'Error',
          'You do not have enough privilege to perform this action',
          'error'
        );
      }
    });
  }

  /**
   * Calls the action that changes user's role
   * @method editUser
   * @param {number} id - user's id
   * @return {void}
   * @memberOf Users
   */
  editUser(id) {
    this.props.editUserRole(id, this.state.editedRole)
    .then((res) => {
      if (!res) {
        swal(
          'Success',
          'Role changed successfully!',
          'success'
        );
      } else {
        swal(
          'Error',
          'You do not have enough privilege to perform this action',
          'error'
        );
      }
    });
  }

    /**
   * Handles pagination
   * @method handlePageClick
   * @param {any} page
   * @return {void}
   * @memberOf Users
   */
  handlePageClick(page) {
    const selected = page.selected;
    const offset = Math.ceil(selected * this.usersPerPage);

    this.setState({ offset }, () => {
      this.props.getUsers(this.state.offset);
    });
  }

  /**
   * Renders Users component
   * @method render
   * @returns {void}
   * @memberOf Users
   */
  render() {
    const { users } = this.state;
    return (
      <div className="documents-wrapper">
        <div className="doc-body">
          <div className="row bg-white p-5">
            <h4>All Users</h4>
          </div>

          <div className="row bg-white p-5 mt-10">
            {
              users.map(user => (
                <UserCard
                  key={user.id}
                  user={user}
                  onChange={this.onChange}
                  editUser={this.editUser}
                  deleteUserCard={this.deleteUserCard}
                />
              ))
            }
          </div>

          <div className="row">
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={<a href="">...</a>}
              breakClassName={'break-me'}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
          </div>

          <div className="clear" />
        </div>
      </div>
    );
  }
}

Users.propTypes = {
  users: PropTypes.shape({
    pageCount: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    users: PropTypes.arrayOf(PropTypes.object)
  }),
  editUserRole: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  errors: PropTypes.shape({}),
  auth: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
      roleId: PropTypes.number
    }),
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Users.defaultProps = {
  users: [{}],
  errors: {}
};

const mapStateToProps = state => (
  {
    users: state.users,
    auth: state.auth
  }
);

export default connect(mapStateToProps,
  {
    getUsers,
    editUserRole,
    deleteUser
  })(withRouter(Users));
