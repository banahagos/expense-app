import React from 'react';
import { Link } from 'react-router-dom';

const UnloggedHome = () => {
  return (
    <div className='unlogged-home' >
      <div className='unlogged-home-content'>
        <h1 style={{
          // fontSize: '100px',
          // fontWeight: 'bold'
        }}>liquid</h1>
        {/* <h4>Your personal expense-manager</h4> */}
      </div>
      <div className='login-signup'>
        <div> <Link to='/login'><button className='btn btn-primary auth-btn'>Login</button></Link> </div>
        <div><Link to='/Signup'><button className='btn btn-primary auth-btn'>Sign Up</button></Link></div>
      </div>
    </div>
  )
}

export default UnloggedHome;