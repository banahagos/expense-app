import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import EditExpenseForm from './EditExpenseForm';


class ListExpenses extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditFormVisible: true,
      editExpenseId: '',
      errMsg: null,
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

  updateExpense = expense => {
    axios.put(`/api/expenses/${this.state.editExpenseId}`, expense)
      .then(() => {
        this.setState({
          errMsg: null
        })
        this.props.getExpenses(this.props.currentFilter)
        this.props.getTodayExpenses()
        this.closeEditFormOfSpecificExpense()

      })
      .catch(error => {
        console.log("something went wrong with edit", error)
        this.setState({ errMsg: error.response.data.message })
      })
  }

  deleteExpense = e => {
    const expenseId = e.target.id
    axios.delete(`/api/expenses/${expenseId}`)
      .then(() => {
        this.setState({
          errMsg: null
        })
        this.props.getExpenses(this.props.currentFilter)
        this.props.getTodayExpenses()
      })
      .catch(error => {
        console.log("something went wrong with delete", error)
        this.setState({ errMsg: error.response.data.message })
      })
  }

  componentDidMount() {
    this.props.getExpenses(this.props.currentFilter)
    this.props.getTodayExpenses()
  }

  render() {
    if (this.props.isLoading) {
      return <div>Is loading...</div>
    }
    return (
      <div>
        <Link to='/'>Dashboard</Link>
        <br />
        <Link to='/new-expense'>Add new expense</Link>
        <br />


        <br />
        {this.props.listOfExpenses.map(e => {
          return (
            <div key={e._id}>
              <Link to='/expenses' className="list-item" name="editExpenseId" id={e._id} onClick={this.showEditFormOfSpecificExpense}>
                <div className='left-content list-content'>
                  <h4>{e.payee}</h4>
                  <p><Moment format="DD/MM/YYYY">{e.dateOfExpense}</Moment></p>
                </div>
                <div className='right-content'>
                  <h3>{e.amount}</h3>
                  <p>{e.category}</p>
                </div>
              </Link>
              {this.state.editExpenseId === e._id && this.state.isEditFormVisible ?
                <EditExpenseForm
                  id={e._id}
                  payee={e.payee}
                  amount={e.amount}
                  category={e.category}
                  dateOfExpense={e.dateOfExpense}
                  monthlyRecurring={e.monthlyRecurring}
                  updateExpense={this.updateExpense}
                  errMsg={this.state.errMsg}
                  deleteExpense={this.deleteExpense}
                /> : ''
              }
            </div>

          )
        }
        )
        }

      </div >
    )

  }
}

export default ListExpenses;