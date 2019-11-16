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
        this.props.history.push('/expenses')
      })
      .catch(error => {
        this.setState({ errMsg: error.response.data.message })

      })
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleCheckboxChange = e => {
    const { checked } = e.target
    this.setState({ monthlyRecurring: checked });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit} name="isAddFormVisible">
          <input type='text' name='payee' value={this.state.payee} onChange={e => this.handleInputChange(e)} placeholder='Payee' />
          <input name='amount' type='number' value={this.state.amount} onChange={e => this.handleInputChange(e)} placeholder='Amount' />
          <input name='category' type='text' value={this.state.category} onChange={e => this.handleInputChange(e)} placeholder='Category' />
          <input name='dateOfExpense' type='date' value={this.state.dateOfExpense} onChange={e => this.handleInputChange(e)} placeholder='Date' />
          <input type='checkbox' name='monthlyRecurring' onChange={e => this.handleCheckboxChange(e)} />
          <label>Monthly recurring</label>
          <button type='submit'>Submit</button>
        </form>
        {this.state.errMsg ? this.state.errMsg : ''}
      </div>
    )
  }
}

export default AddExpenseForm;
