import React from 'react';
import FilterTab from '../expenses/FilterTab';
import BubbleChart from '../../visualizations/BubbleChart';

import {
  ExpensesByPeriodChart,
  TopPayeeChart,
  TopCategoryChart,
  TransactionFrequency,
  // AverageVsExpensesChart
} from './charts'
import { OverviewExpenses } from '../expenses';

class Dashboard extends React.Component {

  componentDidMount() {
    this.props.getExpenses(this.props.currentFilter)
  }

  render() {
    if (this.props.isTodayExpensesLoading || this.props.isListOfExpensesLoading) {
      return <div>...loading</div>
    }
    return (
      <div>
        <FilterTab
          currentFilter={this.props.currentFilter}
          getExpenses={this.props.getExpenses}
        />
        <OverviewExpenses
          currentFilter={this.props.currentFilter}
          listOfTodayExpenses={this.props.listOfTodayExpenses}
          expenses={this.props.expenses}
          getExpenses={this.props.getExpenses}
        />
        <div className="dash-viz">
        <BubbleChart 
        expenses={this.props.expenses}
         />
        {/* <svg></svg> */}
        </div>
      </div>

    )
  }
}

export default Dashboard;

// <div className="dashboard-boxes row">
//           <OverviewExpenses
//             currentFilter={this.props.currentFilter}
//             listOfTodayExpenses={this.props.listOfTodayExpenses}
//             listOfExpenses={this.props.listOfExpenses}
//             getExpenses={this.props.getExpenses}
//           />

//           <OverviewExpenses
//             currentFilter={this.props.currentFilter}
//             listOfTodayExpenses={this.props.listOfTodayExpenses}
//             listOfExpenses={this.props.listOfExpenses}
//             getExpenses={this.props.getExpenses}
//           />
//         </div>
//         <div className="row">
//           <TopCategoryChart listOfExpenses={this.props.listOfExpenses} />
//           {/* <ExpensesByPeriodChart listOfExpenses={this.props.listOfExpenses} /> */}
//         </div>