# Experiences
Forked off the Friendly Pix Web sample app and re-implemented

## Initial setup, build tools and dependencies
Tool | Description
:--- | :---:
[jQuery](https://jquery.com/) | selects/animations
[Firebase](https://firebase.google.com/docs/web/setup) | Storage, sync, hosting & Auth 
[Firebase-UI](https://github.com/firebase/firebaseui-web) | Auth-UI  
[bower](http://bower.io/) | Web-Dependencies
* [npm](https://www.npmjs.com/) | devDependencies later on: build and deploy 
* [BabelJs](http://babeljs.io) | Transpile ES2015

Install all Build/Deploy tools dependencies by running:

```bash
$> npm install
$> bower install
$> grunt watchfiles
```


## Create Firebase Project

1. Create a Firebase project using the [Firebase Console](https://firebase.google.com/console).
2. Enable **Google** as a Sign in provider in **Firebase Console > Auth > Sign in Method** tab.
3. Now click the **WEB SETUP** button in the top right corner to copy the initialization snippet it will look like this:

  ```html
  <script src="https://www.gstatic.com/firebasejs/<VERSION>/firebase.js"></script>
  <script>
    // Initialize Firebase
    var config = {
      apiKey: "<YOUR_API_KEY>",
      authDomain: "<YOUR_PROJECT_ID>.firebaseapp.com",
      databaseURL: "https://<YOUR_PROJECT_ID>.firebaseapp.com",
      storageBucket: "<YOUR_PROJECT_ID>.firebaseapp.com",
    };
    firebase.initializeApp(config);
  </script>
  ```
> If the `storageBucket` value is empty you've hit a bug. Just close the window and click the  **WEB SETUP** button again and you should get it.


## Update the app with your firebase project

1. In the root of the site locate the **index.html** in the root of the folder and replace the text below with the snippet you coppied above:

## Start a local development server

You need to have installed the Firebase CLI by running `npm install`.

You can start a local development server by running:

```bash
$> firebase serve
```

Then open [http://localhost:5000](http://localhost:5000)


## Deploy the app

## License

© Google, 2011. Licensed under an [Apache-2](../LICENSE) license.
