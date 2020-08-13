import React from 'react';
import './App.css';
import Post from './Components/Post';

function App() {
  return (
    <div className="App">

      {/* Header */}
      <div className="app__header">
        <h2>Instagram</h2>
      </div>

      <h1>Hello, we are building the instagram clone 🚀</h1>

      <Post />

    </div>

  );
}

export default App;
