import React from 'react'
import jwt from 'jsonwebtoken';
import { Link } from 'react-router-dom';
const Dashboard = () => {

  var loggedIn = false;

  const token = sessionStorage.getItem('token');
  if (token) {
      const decodedToken = jwt.decode(token);
      console.log(decodedToken);
      loggedIn=true;
  } else {
      console.log('No token found');
  }


  return (
    <div>
      {
        !loggedIn ? (
          <h1>You have no access to this page! Please <Link to="/login">
          <button className="text-gray-600 hover:text-gray-900 px-4 py-2">Login here</button>
        </Link></h1>
        ) : (
          <h1>You are logged in</h1>
        )
      }
    </div>
  )
}

export default Dashboard