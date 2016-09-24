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
      this.userContainers = $('.signed-in-user-container');
      this.noUserContainers = $('.signed-out-user-container');
      this.usernameContainers=$('span.user-name',this.userContainers);
      firebaseUi.start('#firebaseui-auth-container', uiConfig);
    });
  }

  onAuthStateChanged(user) {
    if (user && this.userId === user.uid) return;
    if (window.whoami.router) window.whoami.router.reloadPage(); // Reload, user has changed
    $(document).ready(()=> {
      //If
      if (user) this.setLoggedIn(user);
      else this.setLoggedOut();
    });
  }

  setLoggedIn(user) {
    this.userId = user.uid;
    this.userContainers.show(100);
    this.noUserContainers.hide(100);
    this.usernameContainers.text(user.displayName);
  }

  setLoggedOut() {
    this.userId = null;
    this.userContainers.hide(100);
    this.noUserContainers.show(100);
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
