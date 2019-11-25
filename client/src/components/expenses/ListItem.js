import React from 'react';
import Moment from 'react-moment';

const ListItem = props => {
  return (
    <div className="list-group">
      <button id={props.id} onClick={props.onClick} type="button" className="list-group-item list-group-item-action">
        <div className="list-content">
          <span>{props.payee}</span>
          <small className="text-muted">{props.category}</small>
          <small className="text-muted"><Moment format="DD/MM/YYYY">{props.dateOfExpense}</Moment></small>
        </div>
        <div className="list-content">
          <h5>{props.amount}<sup>€</sup></h5>
        </div>
      </button>
    </div>
  )
}

export default ListItem;




