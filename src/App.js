import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Components/Post';
import {db} from './Firebase/Firebase';

function App() {

  const [posts,setPosts] = useState([]);

  //useEffect
  useEffect(() => {
    db.collection('posts').onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map(doc => (
        {
          id: doc.id,
          post: doc.data()
        }
      )))
    })
  }, [])

  return (

    <div className="App">

      {/* Header */}
      <div className="app__header">
        <h2>Instagram</h2>
      </div>

      <h1>Hello, we are building the instagram clone 🚀</h1>

      {
        //now post is an obj with keys from firebase
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }
     

    </div>

  );
}

export default App;
