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
    axios.get('http://localhost:5000/api/expenses', { withCredentials: true })
      .then((responseFromApi) => {
        this.setState({
          listOfExpenses: responseFromApi.data,
          isLoading: false
        })
      })
  }

  componentDidMount() {
    this.getAllExpenses()
  }

  render() {
    if(this.state.isLoading){
      return <div>is loading...</div>
    } 
    return (
      <div>
        <Link to='/dashboard'>Dashboard</Link>
        <br />
        <Link to='/new-expense'>New Expense</Link>
        <br/>
        <br/>
        <AddNewForm getAllExpenses={this.getAllExpenses} />
        <ul>
          {this.state.listOfExpenses.map(e => {
          return (
            <div>
            <li>{e.payee}</li>
            <li>{e.amount}</li>
            <li>{e.category}</li>
            <li>{e.dateOfExpense}</li>
            <br/>
            </div>
            
          )
          })}
        </ul>
      </div>
    )
  }
}

export default Expenses;