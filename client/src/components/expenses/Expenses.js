import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddNewForm from './AddNewForm';

class Expenses extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listOfExpenses: [],
      isLoading: true
    }
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
    if (this.state.isLoading) {
      return <div>is loading...</div>
    }
    return (
      <div>
        <Link to='/dashboard'>Dashboard</Link>
        <br />
        <Link to='/new-expense'>New Expense</Link>
        <br />
        <br />
        <AddNewForm getAllExpenses={() => this.getAllExpenses()} />
        <ul>
          {this.state.listOfExpenses.map(e => {
            return (
              <div key={e._id}>
                <li>{e.payee}</li>
                <li>{e.amount}</li>
                <li>{e.category}</li>
                <li>{e.dateOfExpense}</li>
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
