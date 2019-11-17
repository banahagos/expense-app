import React from 'react';

const TotalExpenses = props => {
  return (
    <div>
      <h5>Total Expenses</h5>
      <div>{props.listOfExpenses.map(e => e.amount).reduce((acc, val) => { return acc + val }, 0)}<span>€</span></div>
    </div>
  )
}

export default TotalExpenses