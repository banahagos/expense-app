import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { Dashboard, UnloggedHome } from './components/home'
import { Login, Signup } from './components/auth';
import { ListExpenses, AddExpenseForm, OverviewExpenses } from './components/expenses';
import Navbar from './components/navbar/Navbar';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInUser: this.props.user,
      listOfExpenses: [],
      listOfTodayExpenses: [],
      currentFilter: '?filter=lastweek',
      isTodayExpensesLoading: true,
      isListOfExpensesLoading: true,
    };
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  getExpenses = (filter) => {
    this.setState({
      currentFilter: filter
    })
    axios.get(`/api/expenses/${filter}`)
      .then((responseFromApi) => {
        this.setState({
          listOfExpenses: responseFromApi.data,
          isListOfExpensesLoading: false
        })
      })
      .catch(error => console.log(error))
  }

  getTodayExpenses = () => {
    axios.get(`/api/today`)
      .then((responseFromApi) => {
        this.setState({
          listOfTodayExpenses: responseFromApi.data,
          isTodayExpensesLoading: false
        })
      })
      .catch(error => console.log(error))
  }

  render() {
    if (this.state.loggedInUser) {
      return (
        <div className='App'>
          <Route path='/signup' render={() => <Redirect to='/'></Redirect>} />
          <Route path='/login' render={() => <Redirect to='/'></Redirect>} />
          <Navbar
            userInSession={this.state.loggedInUser}
            getUser={this.getTheUser} />
          <OverviewExpenses
            currentFilter={this.state.currentFilter}
            listOfTodayExpenses={this.state.listOfTodayExpenses}
            listOfExpenses={this.state.listOfExpenses}
            getExpenses={this.getExpenses}
          />
          <Switch>
            <Route exact path='/' render={() =>
              <Dashboard
                userInSession={this.state.loggedInUser}
                isTodayExpensesLoading={this.isTodayExpensesLoading}
                isListOfExpensesLoading={this.isListOfExpensesLoading}
                getExpenses={this.getExpenses}
                getTodayExpenses={this.getTodayExpenses}
                currentFilter={this.state.currentFilter}
              />} />
            <Route exact path='/expenses' render={() =>
              <ListExpenses
                listOfExpenses={this.state.listOfExpenses}
                getExpenses={this.getExpenses}
                currentFilter={this.state.currentFilter}
                getTodayExpenses={this.getTodayExpenses}
              />} />
            <Route path='/new-expense' component={AddExpenseForm} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className='App'>
          <Navbar
            userInSession={this.state.loggedInUser}
            getUser={this.getTheUser} />
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
