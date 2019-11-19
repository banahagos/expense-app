import React from 'react';
import { Link } from 'react-router-dom';
import Chart from './Chart';

class Dashboard extends React.Component {

  componentDidMount() {
    this.props.getTodayExpenses()
    this.props.getExpenses(this.props.currentFilter);
  }

  render() {
    if (this.props.isTodayExpensesLoading || this.props.isListOfExpensesLoading) {
      return <div>...loading</div>
    }
    return (
      <div>
        <Link to='/new-expense'>Add new expense</Link>
        <Chart listOfExpenses={this.props.listOfExpenses}/>
      </div>
    )
  }
}

export default Dashboard;
