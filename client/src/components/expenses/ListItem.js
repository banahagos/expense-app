import React from 'react';
import Moment from 'react-moment';


const ListItem = props => {
  return (
    <div className="tile is-parent">
      <div className="tile is-child notification list-item has-text-grey" id={props.id}>
        <div className="list-item-left">
          <p className="subtitle">{props.payee}</p>
          <p><Moment format="DD/MM/YYYY">{props.dateOfExpense}</Moment></p>
        </div>
        <div className="list-item-right">
          <p className="subtitle">{props.amount}€</p>
          <span className="tag is-light">{props.category}</span>
        </div>
      </div>
    </div>
  )
}

export default ListItem;



