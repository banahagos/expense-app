import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import EditExpenseForm from './EditExpenseForm';
import TotalExpenses from './TotalExpenses';


class Expenses extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listOfExpenses: [],
      isLoading: true,
      isEditFormVisible: true,
      editExpenseId: '',
      errMsg: null
    }
  }

  showEditFormOfSpecificExpense = e => {
    this.setState({
      [e.target.name]: e.target.id,
      isEditFormVisible: true,
    })
  }

  closeEditFormOfSpecificExpense = e => {
    this.setState({
      isEditFormVisible: false,
    })
  }

  getExpenseUpdate = expense => {
    axios.put(`/api/expenses/${this.state.editExpenseId}`, expense)
      .then(() => {
        this.setState({
          errMsg: null
        })
        this.getAllExpenses()
        this.closeEditFormOfSpecificExpense()

      })
      .catch(error => {
        console.log("something went wrong with edit", error)
        this.setState({ errMsg: error.response.data.message })
      })
  }

  getAllExpenses = () => {
    axios.get('/api/expenses')
      .then((responseFromApi) => {
        this.setState({
          listOfExpenses: responseFromApi.data,
          isLoading: false
        })
      })
      .catch(error => console.log(error))
  }

  getLastWeekExpenses = () => {
    axios.get(`/api/expenses/filter?filter=lastweek`)
      .then((responseFromApi) => {
        this.setState({
          listOfExpenses: responseFromApi.data,
          isLoading: false
        })
      })
      .catch(error => console.log(error))
  }

  getLastMonthExpenses = () => {
    axios.get(`/api/expenses/filter?filter=lastmonth`)
      .then((responseFromApi) => {
        this.setState({
          listOfExpenses: responseFromApi.data,
          isLoading: false
        })
      })
      .catch(error => console.log(error))
  }


  deleteExpense = e => {
    const expenseId = e.target.id
    axios.delete(`/api/expenses/${expenseId}`)
      .then(() => {
        this.setState({
          errMsg: null
        })
        this.getAllExpenses()
      })
      .catch(error => {
        console.log("something went wrong with delete", error)
        this.setState({ errMsg: error.response.data.message })
      })
  }

  componentDidMount() {
    this.getAllExpenses()
  }

  render() {
    if (this.state.isLoading) {
      return <div>is loading...</div>
    }

    return (
      <div>
        <Link to='/'>Dashboard</Link>
        <br />
        <Link to='/new-expense'>Add new expense</Link>
        <br />
        <br />
        <Link to='expenses' onClick={() => this.getAllExpenses()}>All</Link>
        <br />
        <Link to='expenses?filter=lastweek' onClick={() => this.getLastWeekExpenses()}>Last 7 days</Link>
        <br />
        <Link to='expenses?filter=lastmonth' onClick={() => this.getLastMonthExpenses()}>Last 30 days</Link>
        <br />
        <TotalExpenses listOfExpenses={this.state.listOfExpenses}  />
        <br />
        <ul>
          {this.state.listOfExpenses.map(e => {
            return (
              <div key={e._id}>
                <li>{e.payee}</li>
                <li>{e.amount}€</li>
                <li>{e.category}</li>
                <li><Moment format="DD.MM.YYYY">{e.dateOfExpense}</Moment></li>
                <button name="editExpenseId" id={e._id} onClick={this.showEditFormOfSpecificExpense}>Edit</button>
                <button id={e._id} onClick={this.deleteExpense}>Delete</button>
                {this.state.editExpenseId === e._id && this.state.isEditFormVisible ?
                  <EditExpenseForm
                    id={e._id}
                    payee={e.payee}
                    amount={e.amount}
                    category={e.category}
                    dateOfExpense={e.dateOfExpense}
                    monthlyRecurring={e.monthlyRecurring}
                    getExpenseUpdate={this.getExpenseUpdate}
                    errMsg={this.state.errMsg}
                  /> : ''}
                <br />
              </div>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Expenses;
