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
    if (whoami.auth &&
      whoami.auth.user &&
      whoami.auth.user.providerData &&
      whoami.auth.user.providerData[0] &&
      whoami.auth.user.providerData[0].photoURL)
      image = whoami.auth.user.providerData[0].photoURL;
    let uid = whoami.auth.id;

    if (image == '')
      image = '/images/silhouette.jpg';

    let comment = {uid: uid, experienceId: experienceId, text: text, image: image};

    let ref = this.database.ref('/comments/' + experienceId+'/');
    return ref.push(comment);
  }

  getComments(experienceId, cb) {
    if (this.commentRefs[experienceId]) this.database.ref.off('child_added', this.commentRefs[experienceId].off());
    let ref = this.database.ref('/comments').orderByChild('experienceId').equalTo(experienceId).on('child_added', (data) => {
      this.commentRefs[experienceId] = ref;
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
