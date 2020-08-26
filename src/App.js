import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Components/Post';
import ImageUpload from './Components/ImageUpload'
import {db, auth} from './Firebase/Firebase';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import { Input } from '@material-ui/core';
 
function getModalStyle() {
  const top = 50;
  const left = 50; 

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {

  //call the useStyles() hook to access the material ui
  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);

  const [posts,setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  //state to keep track of the user authentication state
  const [user, setUser] = useState(null);
  // state for signing or logging in
  const [openSignIn, setOpenSignIn] = useState('')

  //useEffect for the posts from database
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

  //useEffect for authentication
  useEffect(() => {
    //this listens when any auth change happens
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser){
        //user is logged in
        console.log(authUser);
        setUser(authUser);
       
      }
      else{
        //user is not logged in
        setUser(null)
      }
    })

    //this is a clean up in useEffect
    return () => {
      //performs some cleanUp if the useEffect fires again
      unsubscribe();
    }

  }, [user, username])
  //use dependencies from your react state in the useEffect

 
  const signUp = (e) => {
    e.preventDefault();

    //authentication
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message))

    if(auth){
      window.alert('Account created')
    }

    setOpen(false)
  }

  //signIn function
  const signIn = (e) => {
    e.preventDefault();

    //now the signIn code
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))

    if(auth){
      window.alert('signed In')
    }

      //closing the modal
      setOpenSignIn(false)
  }

  return (

    <div className="App">
      {/* optionals in javascript ===> appData? */}
      {user?.displayName ? (
        <ImageUpload username={user.displayName}/>
      ) : (
        <h3>Oops 😞, you are not logged in</h3>
      )}
    {/* <ImageUpload username={user.displayName}/> */}
      {/* Modal 1:29:57 */}
    <Modal open={open} onClose={() => setOpen(false)}>
      <div style={modalStyle} className={classes.paper}>
            <form className="app.signup">
                <center>
                  <h2 className="modal__header">Instagram</h2>
                  <Input className="modal__input" placeholder="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} ></Input>
                  <Input className="modal__input" placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} ></Input>
                  <Input className="modal__input" placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} > </Input>

                  <Button onClick={signUp}>
                    Sign Up
                  </Button>
                </center>
            </form>
            
      </div>          
    </Modal>

    <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
      <div style={modalStyle} className={classes.paper}>
            <form className="app.signup">
                <center>
                  <h2 className="modal__header">Instagram</h2>
                  <Input className="modal__input" placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} ></Input>
                  <Input className="modal__input" placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} > </Input>

                  <Button onClick={signIn}>
                    Sign In
                  </Button>
                </center>
            </form>
            
      </div>          
    </Modal>

      {/* Header */}
      <div className="app__header">
        <h2>Instagram</h2>
      </div>

      <h1>Hello, we are building the instagram clone 🚀</h1>

      {/* <Button onClick={() => setOpen(true)}>Sign Up</Button> */}
      {
        user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : 
        (
          <div className="app__loginContainer">
              <Button onClick={() => setOpenSignIn(true)}>Sign/Log In</Button>
              <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
          
        )
      }

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
