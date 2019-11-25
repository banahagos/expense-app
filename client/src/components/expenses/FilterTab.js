import React from 'react';
import { Link } from 'react-router-dom';

class FilterTab extends React.Component {
  constructor(props) {
    super(props)

  }

  handleFilterOnClick = e => {
    this.props.getExpenses(e.target.name)
  }

  render() {
    return (
      <ul className="nav nav-pills">
        <li className="nav-item">
          <Link onClick={this.handleFilterOnClick} className={this.props.currentFilter === '' ? 'nav-link active' : 'nav-link'}>All</Link>
        </li>
        <li className="nav-item">
          <Link name='?filter=lastweek' onClick={this.handleFilterOnClick} className={this.props.currentFilter === '?filter=lastweek' ? 'nav-link active' : 'nav-link'}>Past week</Link>
        </li>
        <li className="nav-item">
          <Link name='?filter=lastmonth' onClick={this.handleFilterOnClick} className={this.props.currentFilter === '?filter=lastmonth' ? 'nav-link active' : 'nav-link'} >Past month</Link>
        </li>
      </ul>
    )
  }
}


export default FilterTab;