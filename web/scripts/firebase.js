'use strict';

window.whoami = window.whoami || {};

whoami.Firebase = class {
  /**
   * Firebase init
   * @constructor
   */
  constructor() {
    this.database = firebase.database();
    this.auth = firebase.auth();
    this.commentRefs = {};
    $(document).ready(()=> {

    });
  }

  postComment(experienceId, text, cb) {
    console.log(JSON.stringify(window.whoami.auth.user));
    let image = '';
    let displayName = 'Unknown user';
    if (whoami.auth &&
      whoami.auth.user &&
      whoami.auth.user.providerData &&
      whoami.auth.user.providerData[0]) {
      if (whoami.auth.user.providerData[0].photoURL)
        image = whoami.auth.user.providerData[0].photoURL;
      if (whoami.auth.user.providerData[0].displayName)
        displayName = whoami.auth.user.providerData[0].displayName;
    }

    let uid = whoami.auth.userId;

    if (image == '')
      image = '/images/silhouette.jpg';

    let comment = {uid: uid, experienceId: experienceId, text: text, image: image, displayName:displayName};

    let ref = this.database.ref('/comments/' + experienceId + '/');
    return ref.push(comment);
  }

  getComments(experienceId, cb) {
    if (this.commentRefs[experienceId]) this.database.ref.off('child_added', this.commentRefs[experienceId]);
    this.commentRefs[experienceId] = this.database.ref('/comments/' + experienceId).on('child_added', (data) => {
      console.log(JSON.stringify(data.val));
      return cb(null, data.val(), data.key)
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
