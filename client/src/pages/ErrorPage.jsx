import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className='App-header'>
      <h1 style={{ textAlign: 'center' }}>Page not found.</h1>

      <Link
        to='/'
        style={{
          backgroundColor: '#000',
          color: '#fff',
          borderRadius: '5px',
          padding: '10px',
          paddingInline: '20px'
        }}
      >
        Home
      </Link>
    </div>
  );
}

export default ErrorPage;
