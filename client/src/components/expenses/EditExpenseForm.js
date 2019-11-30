import React, { Component } from 'react';



class EditExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payee: this.props.prefill.payee,
      amount: this.props.prefill.amount,
      category: this.props.prefill.category,
      dateOfExpense: this.props.prefill.dateOfExpense,
    };
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const { payee, category, dateOfExpense } = this.state
    const amount = parseFloat(this.state.amount)
    this.props.updateExpense({
      payee,
      amount,
      category,
      dateOfExpense,
    })
    this.props.handleAddFormVisibility()
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
      <div className="expense-form">
        <form onSubmit={this.handleFormSubmit} name="isAddFormVisible">
          <input type='text' name='payee' value={this.state.payee} onChange={e => this.handleInputChange(e)} placeholder='Payee' />
          <input name='amount' type='number' value={this.state.amount} onChange={e => this.handleInputChange(e)} placeholder='Amount' />
          <input name='category' type='text' value={this.state.category} onChange={e => this.handleInputChange(e)} placeholder='Category' />
          <input name='dateOfExpense' type='date' onChange={e => this.handleInputChange(e)} />
          <button type='submit' className="expense-btn btn btn-primary">Save</button>
        </form>
        <img src="/trash.png" className="delete-icon" onClick={this.props.deleteExpense} />
        {this.props.errMsg ? this.props.errMsg : ''}
      </div>
    )
  }
}

export default EditExpenseForm;
