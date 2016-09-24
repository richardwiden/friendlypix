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
      this.experiences.unshift(experience);
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
      placeExperience(id, expElement)
    }
  }

  /**
   * Places an experience and its element correctly
   * @param id
   * @param expElement
   * @param experience
   * @returns {JQuery|*}
   */
  placeExperience(id, expElement, experience) {
    const elements = $('#experience-card-' + id, this.experiencesContainer);
    if (elements.length) return elements.replaceWith(expElement);
    if (!afterId) return this.experienceContainer.prepend(expElement); //if we don't know where to place it stick it at the top
    let expArrayIndex = -1;
    for (let i = 0; i < this.experiences.length; i++) {
      if (this.experiences[i].id == afterId) {
        expArrayIndex = i;
        break;
      }
    }
    if (!expArrayIndex) return this.experienceContainer.prepend(expElement); //if we don't know where to place it stick it at the top
    afterElement = $('#experience-card-' + id, this.experienceContainer);
    afterElement.insertAfter(expElement);
    this.experiences.splice(expArrayIndex, 0, experience);
  }

  clear() {
    this.experiencesPage.empty();
  }
};

whoami.experiences = new whoami.Experiences();
