'use strict';

window.whoami = window.whoami || {};

whoami.Firebase = class {
  /**
   * Firebase init
   * @constructor
   */
  constructor() {
    this.database = firebase.database();
    $(document).ready(()=> {

    });
  }

  importObject(jsonObject){
    let ref = this.database.ref('/experiences/');
    return ref.push(jsonObject);
  }

  getExperiences() {
    let ref = this.database.ref('/experiences/');
    return ref.orderByChild('type').once('value').then(data => {
      return {results: data.val()};
    });
  }
};
whoami.firebase = new whoami.Firebase();
