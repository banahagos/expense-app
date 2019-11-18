import React from 'react';
import { Link } from 'react-router-dom';

const UnloggedHome = () => {
  return (
    <div>
      <Link to='/signup'> <button>Sign up</button></Link>
      <Link to='/login'> <button>Login</button></Link>
    </div>
  )
}

export default UnloggedHome;