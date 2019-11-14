import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../auth/AuthService';

class Logout extends Component {
  constructor(props) {
    super(props);
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

  render() {
    return (
      <Link to='/'>
        <button onClick={() => this.logoutUser()}>Logout</button>
      </Link>
    )
  }
}
export default Logout;