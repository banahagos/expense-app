import React from 'react'

const ListItem = props => {
  return (
    <div>
      <div className='left-content list-content'>
        <h4>{e.payee}</h4>
        <p><Moment format="DD/MM/YYYY">{e.dateOfExpense}</Moment></p>
      </div>
      <div className='right-content'>
        <h3>{e.amount}</h3>
        <p>{e.category}</p>
      </div>
    </div>
  )
}

export default ListItem;