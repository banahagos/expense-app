import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import AuthService from './components/auth/AuthService';
import Dashboard from './components/Dashboard';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Logout from './components/auth/Logout';
import UnloggedHome from './components/Home';
import Expenses from './components/expenses/Expenses';
import AddNewForm from './components/expenses/AddNewForm'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loggedInUser: this.props.user };
    this.service = new AuthService()
  }

  // fetchUser() {
  //   if (this.state.loggedInUser === null) {
  //     this.service.loggedin()
  //       .then(response => {
  //         this.setState({
  //           loggedInUser: response
  //         })
  //       })
  //       .catch(err => {
  //         this.setState({
  //           loggedInUser: false
  //         })
  //       })
  //   }
  // }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
    // this.fetchUser()
    if (this.state.loggedInUser) {
      return (
        <div className='App'>
          <Logout userInSession={this.state.loggedInUser} getUser={this.getTheUser}/>
          <Switch>
            <Route exact path='/dashboard' render={() => <Dashboard userInSession={this.state.loggedInUser} />} />
            <Route path='/signup' render={() =>  <Redirect to='/dashboard'></Redirect>} />
            <Route path='/login' render={() =>  <Redirect to='/dashboard'></Redirect>} />
            <Route exact path='/expenses' component={Expenses} />
            <Route exact path='/new-expense' component={AddNewForm} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className='App'>
          <Switch>
            <Route exact path='/' component={UnloggedHome}/>
            <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/> 
            <Route exact path='/login' render={() => <Login getUser={this.getTheUser}/>}/> 
            <Redirect to = '/'/>
          </Switch>
        </div>
      );
    }
  }
}

export default App;