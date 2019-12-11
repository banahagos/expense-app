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
      <div className="profile-page">
        {/* <h6>Profile</h6> */}
        <table className="table">
          <tbody>
            <tr>
              <td>Username</td>
              <td>{this.props.userInSession.username}</td>
            </tr>
            <tr>
              <td>Created</td>
              <td>{moment(this.props.userInSession.created).format('DD-MM-YYYY')}</td>

            </tr>
            {/* <tr>
              <td>
                <Link to='/'><button className="btn btn-primary auth-btn" onClick={() => this.logoutUser()}>Logout</button></Link>
              </td>
              <td></td>
            </tr> */}
            <tr>
              <td>
              <Link to="/" onClick={() => this.deleteAccount()} style={{ textDecoration: 'none', color: 'lightgrey' }}>Delete Account</Link>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div><Link to='/'><button className="btn btn-primary auth-btn" onClick={() => this.logoutUser()}>Logout</button></Link></div>
      </div>
    )
  }
}

export default Profile;