import React, { useState } from 'react';
import './App.css';

function MyButton() {
  const [count, setCount] = useState(22);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}

function App() {
  return (
    <div className='container'>
      <MyButton />
      </div>
  );
}

export default App;
