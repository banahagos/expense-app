import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddExpenseForm from './AddExpenseForm';
import Moment from 'react-moment';


class Expenses extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      listOfExpenses: [],
      isLoading: true,
      isAddFormVisible: true,
    }
  }

  handleAddFormVisibility = () => {
    this.setState({
      isAddFormVisible: !this.state.isAddFormVisible
    })
  }

  handleEditFormVisibility = e => {
    
    if(e.target.name === this.props.match.params.id){
      this.setState({
        editExpense: e.target.name
      })
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
        <br />
        <br />
        {!this.state.isAddFormVisible ? <button onClick={this.handleAddFormVisibility}>Add new expense</button> : ''}
        {this.state.isAddFormVisible ? <AddExpenseForm getAllExpenses={() => this.getAllExpenses()} handleAddFormVisibility={() => this.handleAddFormVisibility()} /> : ''}
        <ul>
          {this.state.listOfExpenses.map(e => {
            return (
              <div key={e._id}>
                <li>{e.payee}</li>
                <li>{e.amount}€</li>
                <li>{e.category}</li>
                <li><Moment format="DD.MM.YYYY">{e.dateOfExpense}</Moment></li>
                <Link to={`/expenses/${e._id}`}> <button name={e._id} onClick={this.handleEditFormVisibility}>Edit</button></Link>       
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
