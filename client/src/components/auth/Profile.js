import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AuthService } from '../auth';
import axios from 'axios'


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
        <h2>Profile</h2>
        <p>Username: {this.props.userInSession.username}</p>
        <p>Created: {this.props.userInSession.created}</p>
        <Link to='/'><button className="btn btn-primary auth-btn" onClick={() => this.logoutUser()}>Logout</button></Link>
        <button type="submit" className="btn btn-danger" onClick={() => this.deleteAccount()}>Delete Account</button>
      </div>
    )
  }
}

export default Profile;