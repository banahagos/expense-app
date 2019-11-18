import React from 'react';

class OverviewExpenses extends React.Component {
  constructor(props) {
    super(props)
  }

  handleFilterOnClick = e => {
    this.props.getExpenses(e.target.name)
  }

  render() {
    return (
      <div>
        <div className="filter-btn">
          <button onClick={this.handleFilterOnClick}>All</button>
          <button name='?filter=lastweek' onClick={this.handleFilterOnClick}>Last 7 days</button>
          <button name='?filter=lastmonth' onClick={this.handleFilterOnClick}>Last 30 days</button>
        </div>
        <div className="overview-expenses-box">
          <div className="overview-expenses">

            <div className="overview-expenses-left">
              <div>
                <h1>{this.props.listOfTodayExpenses.map(e => e.amount).reduce((acc, val) => { return acc + val }, 0)}€</h1>
                <div>
                  <p>Today</p>
                  {/* <p>- x €</p> */}
                </div>
              </div>
            </div>
            <div className="overview-expenses-right">
              <div>
                <h1>{this.props.listOfExpenses.map(e => e.amount).reduce((acc, val) => { return acc + val }, 0)}€</h1>
                <div>
                  {this.props.currentFilter === '?filter=lastweek' ? <p>Week</p> : ''}
                  {this.props.currentFilter === '?filter=lastmonth' ? <p>Month</p> : ''}
                  {this.props.currentFilter === '' ? <p>Total</p> : ''}
                  {/* <p>+ y €</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OverviewExpenses;
