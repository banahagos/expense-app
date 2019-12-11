import React, { Component } from 'react';
import AuthService from './AuthService';
import { Link } from 'react-router-dom';
import InputField from './InputField';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errMsg: null
    };
    this.service = new AuthService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service.signup(username, password)
      .then(response => {
        this.setState({
          username: "",
          password: "",
          errMsg: null
        });
        this.props.getUser(response)
      })
      .catch(error => {
        this.setState({ errMsg: error.response.data.message })
      })
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (

      <div className="auth-form">
        <h2>Sign up</h2>
        <form onSubmit={this.handleFormSubmit}>


          <InputField
            label="Username"
            type="text"
            name="username"
            value={this.state.user}
            onChange={e => this.handleChange(e)}
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={e => this.handleChange(e)}
          />

          <button type="submit" className="btn btn-primary auth-form-btn">Sign up</button>
          {this.state.errMsg ? <div className="err-msg">{this.state.errMsg}</div> : ''}
        </form>
        <p className="auth-msg">Don't have account?
            <Link to="/login" className="auth-link auth-msg"> Login</Link>
        </p>
      </div>
    )
  }
}

export default Signup;
