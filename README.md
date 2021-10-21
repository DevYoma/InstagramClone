# Instagram Clone 
A simple web application for sharing your photos.
Link https://yoma-instagram.web.app

## How to run the app
1. Either fork or download the app(by cloning it) and open the folder in the cli
2. install all dependencies using the `npm i` command
3. Start the web server using the `npm start` command, the app will be served at http://localhost:3000/
4. Go to http://localhost:3000/ in your browser, Sign Up, Sign In, then you can post a picture and comment on other people's picture

## How to Get Started using the App
1. Click on the Sign Up Button.
2. You will see an alert saying `Account Created`. (Signing up automatically signs you in so you proceed with `step5`)
3. If you are revisiting the site and you have signed up, proceed to the `Sign In` button.
4. You will see an alert saying `signed in`.
5. Scroll to the bottom of the page or just press the `end` key on your keyboard.
6. Choose a photo you want to share and enter a caption(this is optional).
7. Click on the upload button.

## User Stories
1. A user that is not logged in can see photos uploaded but can't post photos or comment
2. A user that is logged in can post and comment(on his/her post and other posts)

## Features
- Posting photos
  - photos uploaded gets sent to backend(firebase) and gets posted to all users(not minding if they are signed in or not)
  - no empty photo is allowed to be sent(validation)
 - Sign Up and Sign IN
  - only signed in users can post photos and comment on photos
 
## Stack
- React JS
- Material UI
- Firebase Firestore
- Firebase(Sign up, Sign In, Logout Feature)
- Firebase hosting

## What the app looks like
![instagramShot1](https://user-images.githubusercontent.com/47899828/138361951-5a7d3230-27b9-4881-af95-ead1e0cef7af.png)
![instagramShot2](https://user-images.githubusercontent.com/47899828/138362017-2c73d5c7-d82a-48db-bd0a-babe3ba7d014.png)

