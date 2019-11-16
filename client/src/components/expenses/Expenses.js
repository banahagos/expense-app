import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddExpenseForm from './AddExpenseForm';
import Moment from 'react-moment';
import EditExpenseForm from './EditExpenseForm';


class Expenses extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listOfExpenses: [],
      isLoading: true,
      isAddFormVisible: true,
      isEditFormVisible: true,
      editExpenseId: '',
      errMsg: null
    }
  }

  handleAddFormVisibility = () => {
    this.setState({
      isAddFormVisible: !this.state.isAddFormVisible
    })
  }

  showEditFormOfSpecificExpense = e => {
    this.setState({
      [e.target.name] : e.target.id,
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
        <Link to='/dashboard'>Dashboard</Link>
        <br />
        {!this.state.isAddFormVisible ? <button onClick={this.handleAddFormVisibility}>Add new expense</button> : ''}
        {this.state.isAddFormVisible ? <AddExpenseForm getAllExpenses={() => this.getAllExpenses()} handleAddFormVisibility={() => this.handleAddFormVisibility()} /> : ''}
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
               <br/>
              </div>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Expenses;
