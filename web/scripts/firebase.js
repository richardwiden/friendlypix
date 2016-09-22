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

  getExperiences() {
    let ref = this.database.ref('/experiences');
    return ref.orderByKey().once('value').then(data => {
      return {data: data.val()}
    });
  }
};
whoami.firebase = new whoami.Firebase();
