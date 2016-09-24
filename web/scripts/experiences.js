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
      const expElement = experience.fillExperienceData(id, data.title, data.type, data.desc, data.image);

      this.placeExperience(id, expElement, experience)
      this.experiences.unshift(experience);

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
      placeExperience(id, expElement, experience, afterId)
    }
  }

  /**
   * Places an experience and its element correctly
   * @param id
   * @param expElement
   * @param {Experience} experience
   * @param {String} afterId  id of node/element to insert after
   * @returns {JQuery}
   */
  placeExperience(id, expElement, experience, afterId = null) {
    const elements = $('#experience-card-' + id, this.experiencesContainer);
    if (elements.length) {
      elements.replaceWith(expElement);
      return expElement;
    }
    if (!afterId) {
      this.experiencesContainer.prepend(expElement); //if we don't know where to place it stick it at the top
      return expElement;
    }
    let expArrayIndex = -1;
    for (let i = 0; i < this.experiences.length; i++) {
      if (this.experiences[i].id == afterId) {
        expArrayIndex = i;
        break;
      }
    }

    if (!expArrayIndex) {//if we don't know where to place it stick it at the top
      this.experiencesContainer.prepend(expElement);
      return expElement;
    }

    afterElement = $('#experience-card-' + id, this.experienceContainer);
    this.experiences.splice(expArrayIndex, 0, experience);
    return expElement.insertAfter(afterElement);
  }

  clear() {
    this.experiencesContainer.empty();
  }
};

whoami.experiences = new whoami.Experiences();
