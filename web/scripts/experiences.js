'use strict';

window.whoami = window.whoami || {};

whoami.Experiences = class {
  /**
   * HomeFeed init
   * @constructor
   */
  constructor() {
    this.experiences = [];

    $(document).ready(()=> {
      this.experiencesPage = $('#page-experiences');
      this.experiencesContainer = $('.experiences-container', this.experiencesPage);
    });
  }

  /**
   * @public
   */
  showExperiences() {
    this.clear();
    whoami.firebase.getExperiences((err, data, id) => {
      const experience = new whoami.Experience();
      this.experiences.push(experience);
      const expElement = experience.fillExperienceData(id, data.title, data.type, data.desc, data.image);
      this.experiencesContainer.prepend(expElement);
    });
  }

  addExperiences(experiences, afterId) {
    const expIds = Object.keys(experiences);
    for (let i = 0; i < expIds.length; i++) {
      const id = expIds[i];
      const expData = experiences[id];
      const experience = new whoami.Experiences();
      const title = expData.title;
      const type = expData.type;
      const desc = expData.desc;
      const image = expData.image;
      const expElement = experience.fillExperienceData(id, title, type, desc, image);
      const elements = $('#experience-card-' + id, this.experiencesContainer);

      if (elements.length) {
        elements.replaceWith(expElement);
      } else {
        if (!afterId) return this.experienceContainer.prepend(expElement); //if we don't know where to place it stick it at the top
        afterElement = $('#experience-card-' + id, this.experienceContainer);
        afterElement.insertAfter(expElement);
      }
    }
  }

  clear() {
    this.experiencePage.empty();
  }
};

whoami.experiences = new whoami.Experiences();
