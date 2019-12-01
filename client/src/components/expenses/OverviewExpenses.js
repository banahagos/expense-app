import React from 'react';

const OverviewExpenses = props => {
  //col-xs-12 col-md-4 col-lg-3 col-xl-2
  return (
    <div className="card expense-card w-100">
      <div className="card-body">
        {/* <h6 className="card-title">Total Expenses</h6> */}
        <div className="overview-expenses">
          <div className="overview-expenses-left">
            <div>
              <h3 className="title">{props.listOfTodayExpenses.map(e => e.amount).reduce((acc, val) => { return acc + val }, 0)}<sup>€</sup></h3>
              <div>
                <p className="subtitle">Today</p>
                {/* <p>- x €</p> */}
                {/* <span className="badge badge-primary badge-pill"></span> */}
              </div>
            </div>
          </div>
          <div className="overview-expenses-right">
            <div>
              <h3 className="title">{props.expenses.map(e => e.amount).reduce((acc, val) => { return acc + val }, 0)}<sup>€</sup></h3>
              <div>
                {props.currentFilter === '?filter=lastweek' ? <p className="subtitle">Week</p> : ''}
                {props.currentFilter === '?filter=lastmonth' ? <p className="subtitle">Month</p> : ''}
                {props.currentFilter === '' ? <p className="subtitle">Total</p> : ''}
                {/* <p>+ y €</p> */}
                {/* <span className="badge badge-primary badge-pill">+1</span> */}
              </div>
            </div></div>
          {/* <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" className="btn btn-primary">Button</a> */}
        </div>
      </div>
    </div>
  )
}

export default OverviewExpenses;
