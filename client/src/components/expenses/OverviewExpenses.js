import React from 'react';
import { Link } from 'react-router-dom';


class OverviewExpenses extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDatePickerVisible: false,
    }
  }

  handleFilterOnClick = e => {
    this.props.getExpenses(e.target.name)
  }


  render() {
    return (
      <div>
        <nav className="panel">
          <p className="panel-tabs">
            <Link onClick={this.handleFilterOnClick} className={this.props.currentFilter === '' ? 'is-active' : ''}>All</Link>
            <Link name='?filter=lastweek' onClick={this.handleFilterOnClick} className={this.props.currentFilter === '?filter=lastweek' ? 'is-active' : ''}>Past week</Link>
            <Link name='?filter=lastmonth' onClick={this.handleFilterOnClick} className={this.props.currentFilter === '?filter=lastmonth' ? 'is-active' : ''} >Past month</Link>
            {/* <Link onClick={this.handleDatePickerVisibility}>Custom range</Link> */}

          </p>
        </nav>
        <Link to="/expenses">
          <div className="tile is-child notification is-primary overview-expenses-box">
            <div className="overview-expenses">
              <div className="overview-expenses-left">
                <div>
                  <p className="title">{this.props.listOfTodayExpenses.map(e => e.amount).reduce((acc, val) => { return acc + val }, 0)}€</p>
                  <div>
                    <p className="subtitle">Today</p>
                    {/* <p>- x €</p> */}
                  </div>
                </div>
              </div>
              <div className="overview-expenses-right">
                <div>
                  <p className="title">{this.props.listOfExpenses.map(e => e.amount).reduce((acc, val) => { return acc + val }, 0)}€</p>
                  <div>
                    {this.props.currentFilter === '?filter=lastweek' ? <p className="subtitle">Week</p> : ''}
                    {this.props.currentFilter === '?filter=lastmonth' ? <p className="subtitle">Month</p> : ''}
                    {this.props.currentFilter === '' ? <p className="subtitle">Total</p> : ''}
                    {/* <p>+ y €</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

export default OverviewExpenses;
