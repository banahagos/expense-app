import React from 'react';
import { AuthService } from '../auth';
import { NavLink, Link } from 'react-router-dom';

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = { loggedInUser: this.props.userInSession }
  }

  render() {
    return (
      <nav className="navbar">
        {/* {this.props.userInSession ? <NavLink to="/" className="navbar-brand">DASHBOARD</NavLink> : ''} */}
        <div className="form-inline">
          {/* {this.props.userInSession ? <Link to ="/profile"><img src="/settings.png" alt="settings" className="settings" /></Link>: ''} */}
        </div>
      </nav>
    )
  }
}

export default Navbar;
