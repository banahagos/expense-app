import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { EditExpenseForm, ListItem } from './'

class ListExpenses extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditFormVisible: false,
      editExpenseId: '',
      errMsg: null,
    }
  }

  showEditFormOfSpecificExpense = e => {
    this.setState({
      editExpenseId: e.target.id,
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
    return (
      <div>
        <Link to='/new-expense'>Add new expense</Link>
        <br />
        {this.props.listOfExpenses.map(e => {
          return (
            <div key={e._id}>
              <div onClick={this.showEditFormOfSpecificExpense}>
                <ListItem
                  payee={e.payee}
                  amount={e.amount}
                  dateOfExpense={e.dateOfExpense}
                  category={e.category}
                  id={e._id}
                />
              </div>
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