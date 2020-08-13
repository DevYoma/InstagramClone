import React from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar'

const Post = () => {
    return ( 
        <div className="post">
            {/* header.. avatar + username */}
            <div className="post__header">
                <Avatar 
                    className="post__avatar"
                    alt="EmoreYoma"
                    src=""

                />
                <h3>Username</h3>
            </div>
            {/* image */}
            <img className="post__image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSPZFg85p9XNbhOjhgiCnuxHsIAlG3y-PWaaA&usqp=CAU" />
            
            {/* username and caption */}
            <h4 className="post__text"> <strong>Yoma</strong> what a wonderful language </h4>
        </div>
     );
}
 
export default Post;