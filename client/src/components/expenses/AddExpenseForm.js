import React, { Component } from 'react';
import axios from 'axios';

class AddExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payee: '',
      amount: '',
      category: '',
      dateOfExpense: '',
      monthlyRecurring: false,
      errMsg: null,
    };
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const { payee, category, dateOfExpense, monthlyRecurring } = this.state
    const amount = parseFloat(this.state.amount)

    axios.post('/api/new-expense', { payee, amount, category, dateOfExpense, monthlyRecurring })
      .then(() => {
        this.setState({
          payee: '',
          amount: '',
          category: '',
          dateOfExpense: '',
          monthlyRecurring: false,
          errMsg: null
        })

        // this.props.history.push('/expenses')
        this.props.getExpenses('')

      })
      .catch(error => {
        console.log("something weng wrong with adding an expense,", error)
        this.setState({ errMsg: error.response.data.message })
      })
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="expense-form">
        <form onSubmit={this.handleFormSubmit} >
          <input type='text' name='payee' value={this.state.payee} onChange={e => this.handleInputChange(e)} placeholder='Payee' className="expense-input" />
          <input name='amount' type='number' value={this.state.amount} onChange={e => this.handleInputChange(e)} placeholder='Amount' className="expense-input" />
          <input name='category' type='text' value={this.state.category} onChange={e => this.handleInputChange(e)} placeholder='Category' className="expense-input" />
          <input name='dateOfExpense' type='date' value={this.state.dateOfExpense} onChange={e => this.handleInputChange(e)} placeholder='Date' className="expense-input" />
          <button type='submit' className="expense-btn btn btn-primary">Add new</button>
          {this.state.errMsg ? this.state.errMsg : ''}
        </form>
      
      </div>
    )
  }
}

export default AddExpenseForm;
