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
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
          </a>

          <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div className="navbar-start">

            <NavLink to="/" className="navbar-item">
              {this.props.userInSession ? 'Dashboard' : 'Home'}
            </NavLink>

            {/* <NavLink to="/expenses" className="navbar-item">
            Expenses
              </NavLink> */}
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                More
                </a>
              <div className="navbar-dropdown">
                <a className="navbar-item">
                  About
                  </a>
                <a className="navbar-item">
                  Jobs
                  </a>
                <a className="navbar-item">
                  Contact
                  </a>
                <hr className="navbar-divider" />
                <a class="navbar-item">
                  Report an issue
                  </a>
              </div>
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div>{this.props.userInSession ? <NavLink to='/'><button className="button primary" onClick={() => this.logoutUser()}>Logout</button></NavLink> : ''}</div>
              <div>{!this.props.userInSession ? <NavLink to="/login"><button className="button is-primary auth-btn">Login</button></NavLink> : ''}</div>
              <div>{!this.props.userInSession ? <NavLink to="/Signup"><button className="button is-primary auth-btn">Sign Up</button></NavLink> : ''}</div>
            </div>
          </div>
        </div>
      </nav>

    )
  }
}



export default Navbar;
