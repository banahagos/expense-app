import React from 'react';
import FilterTab from '../expenses/FilterTab';
import BubbleChartPayee from '../../visualizations/BubbleChartPayee';
import BubbleCategory from '../../visualizations/BubbleCategory';
import { Link } from 'react-router-dom';
import OverviewExpenses from '../expenses/OverviewExpenses';

class Dashboard extends React.Component {

  componentDidMount() {
    this.props.getExpenses(this.props.currentFilter)
    this.props.getTodayExpenses()
  }

  render() {
    if (this.props.isTodayExpensesLoading || this.props.isListOfExpensesLoading) {
      return <div>...loading</div>
    }
   
    return (
      <div>
        {/* <div className="settings-box">
          <Link to="/profile"><img src="/settings.png" alt="settings" className="settings" /></Link>
        </div> */}
        <Link to="/expenses"><div className="fab"> + </div></Link>
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
          <BubbleChartPayee
            expenses={this.props.expenses}
          />
          <BubbleCategory
            expenses={this.props.expenses}
          />
        </div>
      </div>

    )
  }
}

export default Dashboard;


