import React from 'react'

const OverviewExpenses = props => {
  return (
    <div className="overview-expenses-box">
    <div className="overview-expenses">
    
      <div className="overview-expenses-left">
        <div>
          <h1>45€</h1>
          <div>
            <p>Today</p>
            <p>- 10 €</p>
          </div>
        </div>
      </div>
      <div className="overview-expenses-right">
        <div>
          <h1>{props.listOfExpenses.map(e => e.amount).reduce((acc, val) => { return acc + val }, 0)}</h1>
          <div>
            {/* <p>Week</p> */}
            <p>+ 15 €</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default OverviewExpenses
