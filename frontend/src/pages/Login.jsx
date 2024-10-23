import React from 'react'
import {Link} from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <div className='flex md:flex-col justify-center h-dvh'>
        <div className='flex-row md:flex justify-around'>
        <form className="bg-white p-6 rounded shadow-md w-96" action='/api/login'>
        <input
          type="text"
          id="username"
          name="username"
          className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
          placeholder="Enter your username"
          pattern="[^ ]+"  
          title="Spaces are not allowed"
          required
        />
        <input
          type="text"
          id="password"
          name="password"
          className="border border-gray-300 rounded px-3 py-2 w-full mb-4"
          placeholder="Enter your password"
          required
        />
        <h5 className='text-sm text-center py-4'>Forgot Passowrd?</h5>
        <button type="submit" className="bg-black text-white px-4 py-2 rounded w-full hover:bg-gray-800">
          Login
        </button>
        <h5 className='text-sm text-center py-4'>Dont have an account? 
        <Link to="/signup">
                <button className="text-black px-4 rounded-lg">Sign Up</button>
              </Link>
        </h5>
      </form>
          <div>
            Image box
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login