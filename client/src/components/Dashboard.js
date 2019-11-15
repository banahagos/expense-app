import React from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component {

  render(){
    return (
      <div>
        <h1>Hello {this.props.userInSession.username}</h1>
        <br/>
        <Link to='/expenses'>Expenses</Link>
      </div>
    )
  }
}

export default Dashboard
