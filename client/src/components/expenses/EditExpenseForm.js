import React, { Component } from 'react';
import axios from 'axios';


class EditExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payee: this.props.theExpense.payee,
      amount: this.props.theExpense.amount,
      category: this.props.theExpense.category,
      dateOfExpense: this.props.theExpense.dateOfExpense,
      monthlyRecurring: this.props.theExpense.monthlyRecurring,
      errMsg: null
    };
  }

  handleFormSubmit = e => {
    console.log("this.props.theExpense._id", this.props.theExpense._id)
    e.preventDefault();
    const { payee, category, dateOfExpense, monthlyRecurring } = this.state
    const amount = parseFloat(this.state.amount)

    axios.put(`/api/expenses/${this.props.theExpense._id}`, { payee, amount, category, dateOfExpense, monthlyRecurring })
      .then(() => {
        this.props.getTheExpense();
        this.props.history.push('/expenses')
        this.setState({
          payee: '',
          amount:'',
          category: '',
          dateOfExpense: '',
          monthlyRecurring: '',
          errMsg: null
        })
      })
      .catch(error => {
        console.log(error)
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
        <form onSubmit={this.handleFormSubmit}>
          <input type='text' name='payee' value={this.state.payee} onChange={e => this.handleInputChange(e)} placeholder='Payee' />
          <input name='amount' type='number' value={this.state.amount} onChange={e => this.handleInputChange(e)} placeholder='Amount' />
          <input name='category' type='text' value={this.state.category} onChange={e => this.handleInputChange(e)} placeholder='Category' />
          <input name='dateOfExpense' type='date' value={this.state.dateOfExpense.slice(0,10)} onChange={e => this.handleInputChange(e)} placeholder='Date' />
          <input type='checkbox' name='monthlyRecurring' onChange={e => this.handleCheckboxChange(e)} />
          <label>Monthly recurring</label>
          <button type='submit'>Edit</button>
        </form>
        {this.state.errMsg ? this.state.errMsg : ''}
      </div>
    )
  }
}

export default EditExpenseForm;
