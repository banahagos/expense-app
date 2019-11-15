import React, { Component } from 'react';
import AuthService from './AuthService';
import { Link } from 'react-router-dom';

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

      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />
          <label>Password:</label>
          <input name="password" value={this.state.password} onChange={e => this.handleChange(e)} />

          <input type="submit" value="Login" />
        </form>
        {this.state.errMsg ? this.state.errMsg : ''}
        <p>Don't have account?
            <Link to={"/signup"}> Signup</Link>
        </p>
      </div>
    )
  }
}

export default Login;
