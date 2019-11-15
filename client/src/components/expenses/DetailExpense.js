import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditExpenseForm from './EditExpenseForm';


class DetailExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.getSingleExpense()
  }

  getSingleExpense = () => {
    const { params } = this.props.match;
    axios.get(`/api/expenses/${params.id}`)
      .then(responseFromApi => {
        const theExpense = responseFromApi.data;
        this.setState(theExpense)
      })
      .catch(err => {
        console.log(err)
      })
  }

  renderEditForm = () => {
    if (!this.state.payee) {
      this.getSingleExpense();
    } else {
      //                                                    {...props} => so we can have 'this.props.history' in Edit.js
      //                                                                                          ^
      //                                                                                          |
      return <EditExpenseForm theExpense={this.state} getTheExpense={this.getSingleExpense} {...this.props} />
    }
  }

  // DELETE PROJECT:
  deleteProject = () => {
    const { params } = this.props.match;
    axios.delete(`/api/expenses/${params.id}`)
      .then(() => {
        this.props.history.push('/projects')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // ownershipCheck = (expense) => {
  // 
  //   if (this.props.loggedInUser && expense.owner === this.props.loggedInUser._id) {
  //     return (
  //       <div>
  //         <div>{this.renderEditForm()} </div>
  //         <button onClick={() => this.deleteProject(this.state._id)}>Delete project</button>
  //       </div>
  //     )
  //   }
  // }

  render() {
    return (
      <div>
        {/* <p>{this.state.payee}</p>
        <p>{this.state.amount}</p>
        <p>{this.state.category}</p>
        <p>{this.state.dateOfExpense}</p>
        <p>{this.state.monthlyRecurring ? 'monthly recurring' : ''}</p> */}

        <div >
          {this.renderEditForm()}
          {/* <EditExpenseForm theExpense={this.state} getTheExpense={this.getSingleExpense} {...this.props} />  */}
        </div>
        <br />

        <br /><br /><br /><br /><br />
        <Link to={'/expenses'}>Back to expenses</Link>
      </div>
    )
  }
}

export default DetailExpense;