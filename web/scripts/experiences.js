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
    whoami.firebase.getExperiences().then(expQuery => {
      const expId = Object.keys(expQuery.results);
      for (let i = expId.length - 1; i >= 0; i--) {
        const expData = expQuery.results[expId[i]];
        const experience = new whoami.Experience();
        this.experiences.push(experience);
        const expElement = experience.fillExperienceData(expId[i],expData.title,expData.type);
        this.experiencesContainer.append(expElement);
      }
    });
  }

  clear(){

  }
};

whoami.experiences = new whoami.Experiences();
