import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Components/Post';
import {db} from './Firebase/Firebase';

function App() {

  const [posts,setPosts] = useState([
    // {
    //   username:"Yoma",
    //   caption: "What a cool language",
    //   imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSPZFg85p9XNbhOjhgiCnuxHsIAlG3y-PWaaA&usqp=CAU"
    // },
    // {
    //   username: "Emmanuel",
    //   caption: "I love Angular",
    //   imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS1hgdHQGexNLMgFAl2bspz6yehydAMPnq3CQ&usqp=CAU"
    // },
    // {
    //   username: "Imyke",
    //   caption: "Dev ops 💪 💯",
    //   imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRNadKOrSRqNE9K5NSOIr7ZUcrq6Y0VPilwbQ&usqp=CAU"
    // }
  ]);

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
