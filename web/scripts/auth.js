'use strict';
window.whoami = window.whoami || {};

whoami.Auth = class {

  constructor() {
    this.auth = firebase.auth();
    this.userId = null;

    this.auth.onAuthStateChanged(user => this.onAuthStateChanged(user));

    $(document).ready(() => {
      this.authPage = $('#page-auth');
      this.authContainer = '#firebaseui-auth-container';
      firebaseUi.start('#firebaseui-auth-container', uiConfig);
    });
  }

  onAuthStateChanged(user) {
    if (user && this.userId === user.uid) return;
    if (window.whoami.router) window.whoami.router.reloadPage(); // Reload, user has changed
    $(document).ready(()=> {
      //If
      if (user) setLoggedIn(user);
      else setLoggedOut();
    });
  }

  setLoggedIn(user) {
    this.userId = user.uid;
  }

  setLoggedOut() {
    this.userId = null;
    firebaseUi.start('#firebaseui-auth-container', uiConfig);
  }

  /**
   * Returns a Promise that completes when auth is ready.
   * @return Promise
   */
  get waitForAuth() {
    return this._waitForAuthPromiseResolver.promise();
  }

};

whoami.auth = new whoami.Auth();
