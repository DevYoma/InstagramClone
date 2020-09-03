import React, { useState, useEffect } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import {db, firebase} from '../Firebase/Firebase';


const Post = ({postId, user, username, caption, imageUrl}) => {
    //data for the firebase db
    const [comments, setComments] = useState([])
    //data for the comment form
    const [comment, setComment] = useState('')

    useEffect(() => {
        let unsubscribe;
        if(postId){
            unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()))
            })
        }

        //this is the clean up function in the useEffect for optimization
        return () => {
            unsubscribe();
        };

    }, [postId])

    const postComment = (e) => {
        e.preventDefault();
        //now reaching the database on submitting the form, i.e adding to the database

        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,   
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setComment('');
    }

    return ( 
        <div className="post">
            {/* header.. avatar + username */}
            <div className="post__header">
                <Avatar 
                    className="post__avatar"
                    alt="EmoreYoma"
                    src=""

                />
                <h3>{username}</h3>
            </div>
            {/* image */}
            <img className="post__image" src={imageUrl} alt="image..." />
            
            {/* username and caption */}
            <h4 className="post__text"> <strong>{username}</strong> {caption} </h4>

            {/* listing the comments in the UI */}
            {
                <div className="post__comments">
                    {
                        comments.map((comment) => (
                            <p>
                                <b className="comment__user">{comment.username}</b>{comment.text}
                            </p>
                        ))
                    }
                </div>
            }

            {
                user && (
                    <form className="post__commentBox">
                    <input
                        className="post__input"
                        type="text"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        className="post__button"
                        disabled={!comment}
                        type="submit"
                        onClick={postComment}
                    >
                        Post
                    </button>
                </form>
                )
            }

            

        </div>
     );
}
 
export default Post;