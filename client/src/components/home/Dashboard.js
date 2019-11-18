import React from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {
 
  componentDidMount(){
    this.props.getTodayExpenses()
    this.props.getExpenses(this.props.currentFilter);
  }

  render() {
    if(this.props.isTodayExpensesLoading|| this.props.isListOfExpensesLoading){
      return <div>...loading</div>
    }
    return (
      <div>
        <h1>Hello {this.props.userInSession.username}</h1>
        <br />
        <Link to='/expenses'>Expenses</Link>
      </div>
    )
  }
}

export default Dashboard;
