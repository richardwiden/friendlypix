'use strict';

window.whoami = window.whoami || {};

whoami.Experiences = class {
  /**
   * HomeFeed init
   * @constructor
   */
  constructor() {
    this.experiences = [];

    $(document).ready(()=>{

    });
  }

  showExperiences(){
    this.clear();
    whoami.firebase.getExperiences().then(experiences => {
      const eId = Object.keys(experiences);
      for (let i = eId.length - 1; i >= 0; i--) {
        const experienceData = experiences[eId[i]];
        this.experiences.push(experienceData)
      }
    });
  }

  clear(){

  }
};

whoami.experiences = new whoami.Experiences();
