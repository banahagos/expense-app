import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AuthService } from '../auth';
import axios from 'axios';
import moment from 'moment'


class Profile extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = { loggedInUser: this.props.userInSession }
  }

  logoutUser = () => {
    this.service.logout()
      .then(() => {
        this.setState({ loggedInUser: null });
        this.props.getUser(null);
      })
  }

  deleteAccount = () => {
    axios.delete(`/api/users/profile/${this.props.userInSession._id}/delete`)
      .then(() => {
        this.setState({ loggedInUser: null });
        this.props.getUser(null);
      })
      .catch(error => {
        console.log("something weng wrong with delete the account", error)
      })
  }

  render() {
    return (
      <div className="auth-form">
        {/* <h6>Profile</h6> */}
        <table className="table">
          <tr>
            <td>Username</td>
            <td>{this.props.userInSession.username}</td>
          </tr>
          <tr>
            <td>Created</td>
            <td>{this.props.userInSession.created}</td>
          </tr>
          <tr>
            <td>
              <Link to='/'><button className="btn btn-primary auth-btn" onClick={() => this.logoutUser()}>Logout</button></Link>
            </td>
            <td></td>
          </tr>
          <tr>
            <Link to="/" onClick={() => this.deleteAccount()} style={{ textDecoration: 'none', color: 'lightgrey' }}>Delete Account</Link>
            {/* <button type="submit" className="btn btn-danger" onClick={() => this.deleteAccount()}>Delete Account</button> */}
          </tr>
        </table>
      </div>
    )
  }
}

export default Profile;