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

  importObject(jsonObject) {
    let ref = this.database.ref('/experiences/');
    return ref.push(jsonObject);
  }


  addExperience(title, type, desc, image, year, cb){
    let ref = this.database.ref('/experiences');
    return ref.push({title:title,type:type,desc:desc,image:image,year:year});
  }

  getExperiences(cb) {
    let ref = this.database.ref('/experiences');
    return ref.orderByChild('year').on('child_added', data => {
      cb(null, data.val(), data.key);
    });
  }
};
whoami.firebase = new whoami.Firebase();
