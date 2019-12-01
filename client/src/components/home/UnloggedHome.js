import React from 'react';
import { Link } from 'react-router-dom';

const UnloggedHome = () => {
  return (
    <div className="login-signup">
      <div> <Link to="/login"><button className="btn btn-primary auth-btn">Login</button></Link> </div>
      <div><Link to="/Signup"><button className="btn btn-primary auth-btn">Sign Up</button></Link></div>
    </div>
  )
}

export default UnloggedHome;