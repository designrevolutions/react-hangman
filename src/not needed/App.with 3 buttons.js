import React, { useState, useEffect } from 'react';
import './App.css';

function App()
{

  const [resourceType, setResourceType] = useState('posts');
  
  // console.log('render');

  useEffect(() =>
  {
    console.log('resource changed');
  }, [resourceType]);

  return (
    <div className='container'>

      <div>
        <button onClick={() => setResourceType('posts')}>Posts</button>
        <button onClick={() => setResourceType('users')}>Users</button>
        <button onClick={() => setResourceType('comments')}>Comments</button>
      </div>
      <h1>{resourceType}</h1>
    </div>
  );
}

export default App;
