import React, { useState, useEffect } from 'react';
import './App.css';

function outsideFunction()
{
  console.log('I have just run');
  return 'posts';
}

function App()
{

  const [resourceType, setResourceType] = useState(outsideFunction());
  
  // console.log('render');

  useEffect(() =>
  {
    console.log('resource changed');

    return () => {
      console.log('return form resource changed');
    }
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
