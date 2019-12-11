import React, { Component } from 'react';
import moment from 'moment';


class EditExpenseForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      payee: this.props.prefill.payee,
      amount: this.props.prefill.amount,
      category: this.props.prefill.category,
      dateOfExpense: moment(this.props.prefill.dateOfExpense).toISOString().split('T')[0],
    };
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (this.props.prefill !== newProps.prefill) {
      this.setState({
        payee: newProps.prefill.payee,
        amount: newProps.prefill.amount,
        category: newProps.prefill.category,
        dateOfExpense: moment(newProps.prefill.dateOfExpense).toISOString().split('T')[0],
      });
    }
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
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }


  render() {
    return (
      <div className="expense-form">
        <form onSubmit={this.handleFormSubmit} name="isAddFormVisible">
          <input type='text' name='payee' value={this.state.payee} onChange={e => this.handleInputChange(e)} placeholder='Payee' className="expense-input" />
          <input name='amount' type='number' value={this.state.amount} onChange={e => this.handleInputChange(e)} placeholder='Amount' className="expense-input" />
          <input name='category' type='text' value={this.state.category} onChange={e => this.handleInputChange(e)} placeholder='Category' className="expense-input" />
          <input name='dateOfExpense' type='date' value={this.state.dateOfExpense} onChange={e => this.handleInputChange(e)} className="expense-input" />
          <button type='submit' className="edit-btn btn btn-primary">Edit</button>
          {this.props.errMsg ? this.props.errMsg : ''}
        </form>
        <img src="/trash.png" alt="track-icon" className="delete-icon" onClick={this.props.deleteExpense} />
      </div>
    )
  }
}

export default EditExpenseForm;
