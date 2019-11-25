import React from 'react';
import { Link } from 'react-router-dom';


const OverviewExpenses = props => {
//col-xs-12 col-md-4 col-lg-3 col-xl-2
  return (
    <div className="card expense-card w-33 col-xs-12 col-md-4 col-lg-3 col-xl-2">
      <div className="card-body">
        <h6 className="card-title">Total Expenses</h6>
        <div className="overview-expenses">
          <div className="overview-expenses-left">
            <div>
              <h3 className="title">{props.listOfTodayExpenses.map(e => e.amount).reduce((acc, val) => { return acc + val }, 0)}<sup>€</sup></h3>
              <div>
                <p className="subtitle">Today</p>
                {/* <p>- x €</p> */}
                <span className="badge badge-primary badge-pill">+1</span>
              </div>
            </div>
          </div>
          <div className="overview-expenses-right">
            <div>
              <h3 className="title">{props.listOfExpenses.map(e => e.amount).reduce((acc, val) => { return acc + val }, 0)}<sup>€</sup></h3>
              <div>
                {props.currentFilter === '?filter=lastweek' ? <p className="subtitle">Week</p> : ''}
                {props.currentFilter === '?filter=lastmonth' ? <p className="subtitle">Month</p> : ''}
                {props.currentFilter === '' ? <p className="subtitle">Total</p> : ''}
                {/* <p>+ y €</p> */}
                <span class="badge badge-primary badge-pill">+1</span>
              </div>
            </div></div>
          {/* <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Button</a> */}
        </div>
      </div>
    </div>
   
    

    // <div>
    //   <Link to="/expenses">
    //     <div className="tile is-child notification is-primary overview-expenses-box">
    //       <div className="overview-expenses">
    //         <div className="overview-expenses-left">
    //           <div>
    //             <p className="title">{props.listOfTodayExpenses.map(e => e.amount).reduce((acc, val) => { return acc + val }, 0)}€</p>
    //             <div>
    //               <p className="subtitle">Today</p>
    //               {/* <p>- x €</p> */}
    //             </div>
    //           </div>
    //         </div>
    //         <div className="overview-expenses-right">
    //           <div>
    //             <p className="title">{props.listOfExpenses.map(e => e.amount).reduce((acc, val) => { return acc + val }, 0)}€</p>
    //             <div>
    //               {props.currentFilter === '?filter=lastweek' ? <p className="subtitle">Week</p> : ''}
    //               {props.currentFilter === '?filter=lastmonth' ? <p className="subtitle">Month</p> : ''}
    //               {props.currentFilter === '' ? <p className="subtitle">Total</p> : ''}
    //               {/* <p>+ y €</p> */}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </Link>
    // </div>
  )
}

export default OverviewExpenses;
