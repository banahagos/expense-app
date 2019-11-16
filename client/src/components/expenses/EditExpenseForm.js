import React, { Component } from 'react';


class EditExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payee: this.props.payee,
      amount: this.props.amount,
      category: this.props.category,
      dateOfExpense: this.props.dateOfExpense,
      monthlyRecurring: this.props.monthlyRecurring,
      errMsg: null
    };
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const { payee, category, dateOfExpense, monthlyRecurring } = this.state
    const amount = parseFloat(this.state.amount)
    const expense = { payee, amount, category, dateOfExpense, monthlyRecurring }
    this.props.getExpenseUpdate(expense)
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
          <input name='dateOfExpense' type='date' value={this.state.dateOfExpense.slice(0,10)} onChange={e => this.handleInputChange(e)} placeholder='Date' />
          <input type='checkbox' name='monthlyRecurring' onChange={e => this.handleCheckboxChange(e)} />
          <label>Monthly recurring</label>
          <button type='submit'>Save</button>
        </form>
        {this.props.errMsg ? this.props.errMsg : ''}
      </div>
    )
  }
}

export default EditExpenseForm;
