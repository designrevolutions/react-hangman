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
