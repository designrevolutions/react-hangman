import userEvent from '@testing-library/user-event';
import React, { useState, useEffect } from 'react';
import './App.css';

function App()
{
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    // Needed for clean up to remove
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  

  return (
    <div className='container'>
      {windowWidth}
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // This function will be called after every re-render of the component
    document.title = `You clicked ${count} times`;
  });

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
