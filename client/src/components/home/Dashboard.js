import React from 'react';
import { Link } from 'react-router-dom';
import {
  ExpensesByPeriodChart,
  TopPayeeChart,
  TopCategoryChart,
  TransactionFrequency,
  // AverageVsExpensesChart
} from './charts'

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
      <div >
        <Link to='/new-expense'>Add new expense</Link>
        <div className="charts-container">
          <ExpensesByPeriodChart listOfExpenses={this.props.listOfExpenses} />
          <TopPayeeChart listOfExpenses={this.props.listOfExpenses} />
          <TopCategoryChart listOfExpenses={this.props.listOfExpenses} />
          <TransactionFrequency listOfExpenses={this.props.listOfExpenses} />
          {/* <AverageVsExpensesChart listOfExpenses={this.props.listOfExpenses} /> */}

        </div>
      </div>
    )
  }
}

export default Dashboard;
