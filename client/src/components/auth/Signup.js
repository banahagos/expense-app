import React, { Component } from 'react';
import AuthService from './AuthService';
import { Link } from 'react-router-dom';
import InputField from '../expenses/InputField'

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
   
        </form>
        {this.state.errMsg ? this.state.errMsg : ''}
        <p>Don't have account?
            <Link to="/login" className="auth-link"> Login</Link>
        </p>
      </div>

      // <div>
      //   <h1>Signup</h1>
      //   <form onSubmit={this.handleFormSubmit}>
      //     <label>Username:</label>
      //     <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />

      //     <label>Password:</label>
      //     <input name="password" value={this.state.password} onChange={e => this.handleChange(e)} />

      //     <input type="submit" value="Signup" />
      //   </form>
      //   {this.state.errMsg ? this.state.errMsg : ''}
      //   <p>Already have account?
      //       <Link to={"/login"}> Login</Link>
      //   </p>
      // </div>
    )
  }
}

export default Signup;
