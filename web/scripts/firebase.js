'use strict';

window.whoami = window.whoami || {};

whoami.Firebase = class {
  /**
   * Firebase init
   * @constructor
   */
  constructor() {
    this.database = firebase.database();
    this.refs ={};
    $(document).ready(()=> {

    });
  }

  getComments(experienceId, cb) {

    let ref = this.database.ref('/comments').orderByChild('experienceId').equalTo(experienceId).on('child_added', (data) => {
      return cb(null, data.val(),data.key)
    });
  }

  importObject(jsonObject) {
    let ref = this.database.ref('/experiences/');
    return ref.push(jsonObject);
  }


  addExperience(title, type, desc, image, year, cb) {
    let ref = this.database.ref('/experiences');
    return ref.push({title: title, type: type, desc: desc, image: image, year: year});
  }

  getExperiences(cb) {
    let ref = this.database.ref('/experiences');
    return ref.orderByChild('year').on('child_added', data => {
      cb(null, data.val(), data.key);
    });
  }
};
whoami.firebase = new whoami.Firebase();
