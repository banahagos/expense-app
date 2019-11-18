import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Logout from './components/auth/Logout';
import UnloggedHome from './components/Home';
import ListExpense from './components/expenses/ListExpense';
import AddExpenseForm from './components/expenses/AddExpenseForm'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInUser: this.props.user,
      listOfExpenses: [],
      currentFilter: '',
      // isLoading: true,
    };
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  getAllExpenses = (filter) => {
    this.setState({
      currentFilter: filter
    })
    axios.get(`/api/expenses/${filter}`)
      .then((responseFromApi) => {
        this.setState({
          listOfExpenses: responseFromApi.data,
          // isLoading: false
        })
      })
      .catch(error => console.log(error))
  }

  // getLastWeekExpenses = () => {
  //   axios.get(`/api/expenses/filter?filter=lastweek`)
  //     .then((responseFromApi) => {
  //       return responseFromApi.data
  //     })
  //     .catch(error => console.log(error))
  // }

  // getLastMonthExpenses = () => {
  //   axios.get(`/api/expenses/filter?filter=lastmonth`)
  //     .then((responseFromApi) => {
  //       this.setState({
  //         listOfExpenses: responseFromApi.data,
  //       })
  //     })
  //     .catch(error => console.log(error))
  // }

  render() {
    if (this.state.loggedInUser) {
      return (
        <div className='App'>
          <Logout userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          <Switch>
           
            <Route exact path='/' render={() => 
            <Dashboard 
            userInSession={this.state.loggedInUser} 
            listOfExpenses={this.state.listOfExpenses}
            isLoading={this.state.isLoading}
            getAllExpenses={this.getAllExpenses}
            />} />
            <Route path='/signup' render={() => <Redirect to='/'></Redirect>} />
            <Route path='/login' render={() => <Redirect to='/'></Redirect>} />
            <Route exact path='/expenses' render={props =>
              <ListExpense
              {...props}
                listOfExpenses={this.state.listOfExpenses}
                getAllExpenses={this.getAllExpenses}
                currentFilter={this.state.currentFilter}
              />} />
            <Route path='/new-expense' component={AddExpenseForm} />
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
