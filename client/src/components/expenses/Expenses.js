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
      editExpense: ''
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

  componentDidMount() {
    this.getAllExpenses()
  }

  render() {
    console.log('this.state.isEditFormVisible', this.state.isEditFormVisible)
    if (this.state.isLoading) {
      return <div>is loading...</div>
    }
    console.log("this.state.editExpense", this.state.editExpense)
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
                <button name="editExpense" id={e._id} onClick={this.showEditFormOfSpecificExpense}>Edit</button>
                {this.state.editExpense === e._id && this.state.isEditFormVisible ? 
                <EditExpenseForm 
                id={e._id} 
                payee={e.payee} 
                amount={e.amount} 
                category={e.category} 
                dateOfExpense={e.dateOfExpense} 
                monthlyRecurring={e.monthlyRecurring} 
                getAllExpenses={this.getAllExpenses} 
                closeEditFormOfSpecificExpense={() => this.closeEditFormOfSpecificExpense()} /> : ''} 
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
