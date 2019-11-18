import React from 'react';
import { Link } from 'react-router-dom';

const ListItem = props => {
  return (
    <div className="list-item" onClick={props.showEditFormOfSpecificExpense()}>
      <div className='left-content list-content'>
        <h3>{props.payee}</h3>
        <p>{props.dateOfExpense}</p>
      </div>
      <div className='right-content'>
        <h3>{props.amount} €</h3>
        <p>{props.category}</p>
      </div>
    </div>
  )
}

//   <div class="card listItem">
//     <header class="card-header list-item-header">
//       <div class="card-header-title">
//         {props.payee} 
//   </div>
//   <div class="card-header-title">
//         {props.amount} € 
//   </div>
//       <a href="#" class="card-header-icon" aria-label="more options" >
//         <span class="icon">
//           <i class="fas fa-angle-down" aria-hidden="true"></i>
//         </span>
//       </a>
//     </header>
//     <div class="card-content">
//       <div class="content">
//         <br />
// <time datetime="2016-1-1">{props.dateOfExpense}</time>
//       </div>
//     </div>
//     <footer class="card-footer">
//       <a href="#" class="card-footer-item">Save</a>
//       <a href="#" class="card-footer-item">Edit</a>
//       <a href="#" class="card-footer-item">Delete</a>
//     </footer>
//   </div>

export default ListItem;
