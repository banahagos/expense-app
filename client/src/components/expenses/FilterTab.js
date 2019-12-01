import React from 'react';
import { Link } from 'react-router-dom';

class FilterTab extends React.Component {
  
  handleFilterOnClick = e => {
    this.props.getExpenses(e.target.name)
  }

  render() {
    return (
      <ul className="nav nav-pills">
        <li className="nav-item">
          <Link to="/" onClick={this.handleFilterOnClick} className={this.props.currentFilter === '' ? 'nav-link active' : 'nav-link'}>All</Link>
        </li>
        <li className="nav-item">
          <Link to="/" name='?filter=lastweek' onClick={this.handleFilterOnClick} className={this.props.currentFilter === '?filter=lastweek' ? 'nav-link active' : 'nav-link'}>Last 7 days</Link>
        </li>
        <li className="nav-item">
          <Link to="/" name='?filter=lastmonth' onClick={this.handleFilterOnClick} className={this.props.currentFilter === '?filter=lastmonth' ? 'nav-link active' : 'nav-link'} >Last month</Link>
        </li>
      </ul>
    )
  }
}


export default FilterTab;