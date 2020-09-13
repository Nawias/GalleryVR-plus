// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance } from 'react-360-web';
import Axios from 'axios';

function isUserLoggedIn() {
  let isLoggedIn = Axios.get('http://localhost:3000/ping', {
    withCredentials: true,
  })
    .catch(error => {
      console.log(error);
      window.location.replace('http://localhost:3000/google');
      return false;
    })
    .then(res => {
      console.log(res.data);
      return true;
    });

  console.log(isLoggedIn);
  return isLoggedIn;
}

function init(bundle, parent, options = {}) {
  var r360;
  isUserLoggedIn().then(() => {
    r360 = new ReactInstance(bundle, parent, {
      // Add custom options here
      fullScreen: true,
      ...options,
    });

    // Render your app content to the default cylinder surface
    r360.renderToSurface(
      r360.createRoot('GalleryVR', {
        /* initial props */
      }),
      r360.getDefaultSurface(),
    );

    // Load the initial environment
    r360.compositor.setBackground(r360.getAssetURL('360_world.jpg'));
  });
}

window.React360 = { init };
