import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './components/home/Dashboard'
import UnloggedHome from './components/home/UnloggedHome'
import { Login, Signup } from './components/auth';
import Navbar from './components/navbar/Navbar';
import * as d3 from 'd3';
import ExpensesList from './visualizations/ExpensesList';
import Profile from './components/auth/Profile';




class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInUser: this.props.user,
      expenses: [],
      listOfTodayExpenses: [],
      currentFilter: '?filter=lastweek',
      isTodayExpensesLoading: true,
      isListOfExpensesLoading: true,
      selectedWeek: d3.timeWeek.floor(new Date()),
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
          expenses: responseFromApi.data,
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

  getSelectedWeek = (selectedWeek) => {
    this.setState({ selectedWeek: selectedWeek })
  }

  componentDidMount() {
    this.getExpenses(this.state.currentFilter)
    this.getTodayExpenses()
  }

  render() {
    if (this.state.loggedInUser) {
      return (
        <div className='App' style={{
          margin: '10px 20px 20px 20px',
          padding: '10px 20px 20px 20px'
        }}>
          <Route path='/signup' render={() => <Redirect to='/'></Redirect>} />
          <Route path='/login' render={() => <Redirect to='/'></Redirect>} />
          <Navbar
            userInSession={this.state.loggedInUser}
            getUser={this.getTheUser} />
          <Switch>
            <Route exact path='/' render={() =>
              <Dashboard
                userInSession={this.state.loggedInUser}
                isTodayExpensesLoading={this.isTodayExpensesLoading}
                isListOfExpensesLoading={this.isListOfExpensesLoading}
                getExpenses={this.getExpenses}
                getTodayExpenses={this.getTodayExpenses}
                currentFilter={this.state.currentFilter}
                expenses={this.state.expenses}
                listOfTodayExpenses={this.state.listOfTodayExpenses}
              />} />
            <Route exact path='/expenses' render={() =>
              <ExpensesList
                expenses={this.state.expenses}
                selectedWeek={this.state.selectedWeek}
                getSelectedWeek={this.getSelectedWeek}
                getExpenses={this.getExpenses}
                getTodayExpenses={this.getTodayExpenses}
              />} />
            <Route exact path='/profile' render={() =>
              <Profile
                userInSession={this.state.loggedInUser}
                getUser={this.getTheUser}
              />} />

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
