import React from 'react';
import { AuthService } from '../auth';
import { NavLink } from 'react-router-dom';

class Navbar extends React.Component {
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

  render() {
    return (
      <nav className="navbar">
        {this.props.userInSession ? <NavLink to="/" className="navbar-brand">DASHBOARD</NavLink> : ''}
        <div className="form-inline">
          {this.props.userInSession ? <img src="/settings.png" className="settings" /> : ''}
          <div>{this.props.userInSession ? <NavLink to='/'><button className="btn btn-primary auth-btn" onClick={() => this.logoutUser()}>Logout</button></NavLink> : ''}</div>
        </div>
      </nav>
    )
  }
}

export default Navbar;
