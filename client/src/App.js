import React from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Logout from './components/auth/Logout';
import UnloggedHome from './components/Home';
import ListExpense from './components/expenses/ListExpense';
import AddExpenseForm from './components/expenses/AddExpenseForm';
import OverviewExpenses from './components/expenses/OverviewExpenses'

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

  componentDidMount(){
    this.getTodayExpenses()
    this.getExpenses(this.state.currentFilter);
  }

  render() {
    if(this.state.isTodayExpensesLoading|| this.state.isListOfExpensesLoading){
      return <div>...loading</div>
    }
    if (this.state.loggedInUser) {
      return (
        <div className='App'>
          <div className="logout">
          <Logout userInSession={this.state.loggedInUser} getUser={this.getTheUser} />
          </div>
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
              />} />
            <Route path='/signup' render={() => <Redirect to='/'></Redirect>} />
            <Route path='/login' render={() => <Redirect to='/'></Redirect>} />
            <Route exact path='/expenses' render={props =>
              <ListExpense
                {...props}
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
