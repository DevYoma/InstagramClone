import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import {storage, db} from '../Firebase/Firebase';
import {firebase} from '../Firebase/Firebase'
import './ImageUpload.css';


const ImageUpload = ({username}) => {
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0)
    const [caption, setCaption] = useState('')
    const [error, setError] = useState('');

    const types = ['image/png', 'image/jpeg', 'image/jpg'];

    const handleChange = e => {
        let selectedImage = e.target.files[0];
        if(selectedImage && types.includes(selectedImage.type)){
            setImage(selectedImage)
            setError('')
            console.log(selectedImage)
        }
        else{
            setImage(null)
            setError("Please select a image png/jpeg file")
        }
    }

    const handleUpload = (e) => {

        e.preventDefault();
        //uploading to firebase storage... the code here uploads the picture to firebase
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed", 
            (snapshot) => {
                //progress bar code
                const progressBar = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progressBar)
            },
            (error) => {
                //Error function
                console.log(error);
                alert(error.message)
            },
            () => {
                //complete function.. this code gets the link to the uploaded image in firebase storage
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //posting image inside db
                    db.collection('posts').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        //the download url we got hold of above.. on line 50
                        imageUrl: url,
                        username: username
                    });
                    
                        // if(url){
                            setProgress(0);
                            setCaption("");
                            setImage(null);
                        // }
                    });

            }
        )

                     
    }

    return ( 
        
        <div className="imageUpload">
            
            <progress className="imageUpload__progress" value={progress} max="100"/>
            <input type="text" placeholder="Enter a caption" onChange={(e) => setCaption(e.target.value)} required />
            <input type="file" onChange={handleChange} required/>
            <span>
                {error && <span className="error">{error}</span>}
            </span>
            <Button onClick={handleUpload}>
                Upload 
            </Button>
        </div>
     );
}
 
export default ImageUpload;