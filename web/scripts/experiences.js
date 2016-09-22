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
      this.experiencesPage = $('#page-experiences');
      this.experiencesContainer = $('.experiences-container', this.experiencesPage);
    });
  }

  /**
   * @public
   */
  showExperiences(){
    this.clear();
    whoami.firebase.getExperiences().then(experiences => {
      const eId = Object.keys(experiences);
      for (let i = eId.length - 1; i >= 0; i--) {
        const experienceData = experiences[eId[i]];
        const experience = new whoami.Experience();
        this.experiences.push(experience);
        const experienceElement = experience.fillExperienceData();
        this.experiencesContainer.append(experienceElement);
      }
    });
  }

  clear(){

  }
};

whoami.experiences = new whoami.Experiences();
