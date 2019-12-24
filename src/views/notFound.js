/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='notfound'>
      <div className='notfound-404'>
        <h1>
          4<span>0</span>4
        </h1>
      </div>
      <p> The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
      {/* <a href={`${process.env.PUBLIC_URL}/login`}></a> */}
      <Link to={`${process.env.PUBLIC_URL}/login`}>Login Page</Link>
    </div>
  );
};

export default NotFound;
