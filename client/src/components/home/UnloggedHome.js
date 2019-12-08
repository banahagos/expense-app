import React from 'react';
import { Link } from 'react-router-dom';

const UnloggedHome = () => {
  return (
    <div style={{
      backgroundImage: `url("/background.jpg")`,
      width: '100vw',
      height: '100vh',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'top',
      display: 'flex',
      flexDirection: 'column-reverse'
    }} >
      <div style={{
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',

      }}>
        <h1 style={{
          fontSize: '100px',
          fontWeight: 'bold'
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