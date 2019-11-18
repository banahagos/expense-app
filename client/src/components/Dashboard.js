import React from 'react';
import { Link } from 'react-router-dom';
import TotalSum from './expenses/TotalSum';



class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isLoading: true
    }
  }

  componentDidMount(){
    this.props.getAllExpenses()
  }

  render(){
    if (this.props.isLoading) {
      return <div>Is loading...</div>
    }

    return (
      <div>
        <h1>Hello {this.props.userInSession.username}</h1>
        <br/>
        <TotalSum listOfExpenses={this.props.listOfExpenses}/>
        <Link to='/expenses'>Expenses</Link>
     
      </div>
    )
  }
}

export default Dashboard
