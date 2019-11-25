import React from 'react';
import FilterTab from '../expenses/FilterTab';

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
    this.props.getTodayExpenses()
    this.props.getExpenses(this.props.currentFilter);
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

        <div className="dashboard-boxes row">
          <OverviewExpenses
            currentFilter={this.props.currentFilter}
            listOfTodayExpenses={this.props.listOfTodayExpenses}
            listOfExpenses={this.props.listOfExpenses}
            getExpenses={this.props.getExpenses}
          />

          <OverviewExpenses
            currentFilter={this.props.currentFilter}
            listOfTodayExpenses={this.props.listOfTodayExpenses}
            listOfExpenses={this.props.listOfExpenses}
            getExpenses={this.props.getExpenses}
          />
        </div>
        <div className="row">
          <TopCategoryChart listOfExpenses={this.props.listOfExpenses} />
          <ExpensesByPeriodChart listOfExpenses={this.props.listOfExpenses} />
        </div>
      </div>

    )
  }
}

export default Dashboard;

{/* <Link to='/new-expense'>Add new expense</Link>
        <div className="charts-container">
          <ExpensesByPeriodChart listOfExpenses={this.props.listOfExpenses} />
          <TopPayeeChart listOfExpenses={this.props.listOfExpenses} />
          <TopCategoryChart listOfExpenses={this.props.listOfExpenses} />
          <TransactionFrequency listOfExpenses={this.props.listOfExpenses} /> */}
{/* <AverageVsExpensesChart listOfExpenses={this.props.listOfExpenses} /> */ }

 // <div className="dashboard"> 
      //   <div className="container">
      //     <div className="row">
      //       <div className="col">
      //         <FilterTab
      //           currentFilter={this.props.currentFilter}
      //           getExpenses={this.props.getExpenses}
      //         />
      //       </div>
      //     </div>
      //   </div>

      //   <div className="container">
      //     <div className="row">
      //       <div className="col-md-4 bgc top">
      //         <TopPayeeChart listOfExpenses={this.props.listOfExpenses} />
      //       </div>
      //       <div className="col-md-3 ">
      //         <div className="row">
      //           <div className="col-md-12 top-half ">
      //             <OverviewExpenses
      //               currentFilter={this.props.currentFilter}
      //               listOfTodayExpenses={this.props.listOfTodayExpenses}
      //               listOfExpenses={this.props.listOfExpenses}
      //               getExpenses={this.props.getExpenses}
      //             />
      //           </div>
      //         </div>
      //         <div className="row">
      //           <div className="col-md-12 top-half">
      //             <OverviewExpenses
      //               currentFilter={this.props.currentFilter}
      //               listOfTodayExpenses={this.props.listOfTodayExpenses}
      //               listOfExpenses={this.props.listOfExpenses}
      //               getExpenses={this.props.getExpenses}
      //             />
      //           </div>
      //         </div>
      //       </div>
      //       <div className="col-md-4 bgc">
      //         <TopCategoryChart listOfExpenses={this.props.listOfExpenses} />
      //       </div>
      //     </div>
      //   </div>

      //   <div className="container">
      //     <div className="row bottom-dashboard">
      //       <div className="col-md-5 bgc bottom-charts">
      //         <TopCategoryChart listOfExpenses={this.props.listOfExpenses} />
      //       </div>
      //       <div className="col-md-6 bgc bottom-charts">
      //         <ExpensesByPeriodChart listOfExpenses={this.props.listOfExpenses} />
      //       </div>
      //     </div>
      //   </div>
      // </div>