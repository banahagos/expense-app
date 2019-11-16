import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Logout from './components/auth/Logout';
import UnloggedHome from './components/Home';
import Expenses from './components/expenses/Expenses';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loggedInUser: this.props.user };
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
    if (this.state.loggedInUser) {
      return (
        <div className='App'>
          <Logout userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          <Switch>
            <Route exact path='/' render={() => <Dashboard userInSession={this.state.loggedInUser} />} />
            <Route path='/signup' render={() => <Redirect to='/'></Redirect>} />
            <Route path='/login' render={() => <Redirect to='/'></Redirect>} />
            <Route path='/expenses' component={Expenses} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className='App'>
          <Switch>
            <Route exact path='/' component={UnloggedHome} />
            <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser} />} />
            <Route exact path='/login' render={() => <Login getUser={this.getTheUser} />} />
            <Redirect to='/' />
          </Switch>
        </div>
      );
    }
  }
}

export default App;
