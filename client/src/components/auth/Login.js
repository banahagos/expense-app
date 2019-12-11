import React, { Component } from 'react';
import AuthService from './AuthService';
import { Link } from 'react-router-dom';
import InputField from './InputField';

class Login extends Component {
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
    this.service.login(username, password)
      .then(response => {
        this.setState({ username: "", password: "", errMsg: null });
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
        <h2>Login</h2>
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

          <button type="submit" className="btn btn-primary auth-form-btn">Login</button>
          {this.state.errMsg ? <div className="err-msg">{this.state.errMsg}</div> : ''}
        </form>
        
        <p className="auth-msg">Don't have account?
            <Link to="/signup" className="auth-link auth-msg"> Sign up</Link>
        </p>
      </div>
    )
  }
}

export default Login;
