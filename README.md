# TubeMusic

TubeMusic is an app made for listening music from YouTube (hence the name). With TubeMusic you can create your own playlists and/or import your spotify playlists to the application! Be sure to checkout other users' made playlists too. Listening to ad-free music is just one sign-up away.

TubeMusic plays YouTube videos and tries to replicate the user experience of Spotify with little twists (such as more interactible queue-system and no-ads). This is a no-profit application.


# DEMO

Demo is now available at: https://tubemusicapp.herokuapp.com/ (Not mobile friendly, mobile app in development). Using application requires you to signup. There's no email verification, so no need for writing actual real information on the sign up form. All views are under development (I will be improving them as I have time, main focus has been on the main page for a while now)

## Main view

Here you can load your already created playlists and listen to them, create new playlists, browse artists, albums or tracks and interact with the queue. Queue and playlist are sortable (drag and drop) so you can change the order of songs to whichever you like! <br />
All songs also have an right click option which opens up a context menu (as seen from the picture below) for handling queue, removing song from the current playlist and adding the song to some other playlist. You can also right click and select an artist or album and it'll open up a view with information and albums/tracks from the artist/album. Clicking on the artist's or album's on the song also works.<br />


![alt_text](https://i.ibb.co/ZM9B3n3/kuva333.png)
## Artist view

Information about the artists with all albums found in youtube-music. All songs - option to show all songs found from the artist.<br />


![alt_text](https://i.ibb.co/zZ9P7pN/kuva3.png)
## Album view

Tracks from the album. Options to add whole album to a playlist (or to create a new playlist), option to add the album to the queue or playing album. Each track is right clickable also.<br />


![alt_text](https://i.ibb.co/c28ND5v/kuva55.png)
## Importing songs from Spotify

Requires you to Login with your spotify account. Shows all of your playlists on the right for you to click on them, and choose which songs to improt to the application!<br />


![alt text](https://i.ibb.co/Wnhh1QG/kuva1.png)
## Playlists import - view

Shows all playlists from the application with filtering options. Here you can subscribe on non-private playlists (editing this playlist will edit it for all users) or create your own playlists with the editor (you can load playlists and choose which songs are to be added to your playlist).<br />


![alt_text](https://i.ibb.co/5TqBNv8/123123.png)

### Backend setup (If you want to run your own backend)

Environment variable setup:

You have to have a mongoDB url set up as MONGO_URL = YOUR_MONGO_URL

You also have to have a setup JWTSECRET = YOUR_JWT_SECRET

Api endpoints need to be changed from the client folder (files authenthication.js and functions.js)

Backend is available at https://github.com/JuhoKon/tubemusic-backend.

## Available Scripts for TubeMusic

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run devstart`

In the backend folder you can run devstart to run the backend in development mode.<br />
Note that you need to have MongoDB running on port 27017 as well. MongoURL is set in the .env file of backend folder.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
