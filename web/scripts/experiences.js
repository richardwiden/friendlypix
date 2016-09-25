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
      this.experiencesContainer =this.experiencesPage;// $('.experiences-container', this.experiencesPage);
      this.addExperienceButton = $('.floating-fab button');
      this.addExperienceButton.click(()=> {
        this.showAddExperience();
      });
      this.addExperiencesDialog = $('#add-experience-dialog');
      this.addExperiencesButtons = $('button', this.addExperiencesDialog);
      this.addExperiencesButtons.click(event => {
        this.addExperienceFromDialog(event)
      });
      this.addExperienceCallback = (err, data, id, afterId) => {
        this.addExperience(err, data, id, afterId);
      };
    });
  }

  addExperienceFromDialog(event) {
    const type = event.currentTarget.value;
    const title = $('#create_experience_title', this.addExperiencesDialog).val();
    const desc = $('#create_experience_desc', this.addExperiencesDialog).val();
    const year = Number($('#create_experience_year', this.addExperiencesDialog).val());
    const image = 'nothing.jpg';
    whoami.firebase.addExperience(title, type, desc, image, year);
  }

  /**
   * @public
   * @param err
   * @param data
   * @param id
   * @param afterId
   */
  addExperience(err, data, id) {
    const experience = new window.whoami.Experience();
    const expElement = experience.fillExperienceData(id, data.title, data.type, data.desc, data.image, data.year);
    this.placeExperience(id, expElement, experience);
    this.experiences.unshift(experience);
    this.experiencesContainer.prepend(expElement);
  }

  /**
   * @public
   */
  showExperiences() {
    this.clear();
    whoami.firebase.getExperiences(this.addExperienceCallback);
  }

  showAddExperience() {
    this.addExperiencesDialog.get(0).showModal();
  }


  /**
   * Places an experience and its element correctly
   * @param id
   * @param expElement
   * @param {Experience} experience
   * @returns {JQuery}
   */
  placeExperience(id, expElement, experience) {
    const elements = $('#experience-card-' + id, this.experiencesContainer);
    if (elements.length) {
      elements.replaceWith(expElement);
      return expElement;
    }

    let expArrayIndex = -1;

    for (let i = 0; i < this.experiences.length; i++) {
      if (this.experiences[i].year > experience.year) continue;
      if (this.experiences[i].year <= experience.year) {
        expArrayIndex = i;
        break;
      }
    }

    if (expArrayIndex == -1 || expArrayIndex==0) {//if we don't know where to place it or it's supposed to go at top
      expElement.hide();
      this.experiencesContainer.prepend(expElement);
      expElement.fadeIn(1000);
      return expElement;
    }

    let afterElement = $('#experience-card-' + this.experiences[expArrayIndex].id, this.experienceContainer);
    this.experiences.splice(expArrayIndex, 0, experience);
    //noinspection JSCheckFunctionSignatures

    return expElement.hide().insertAfter(afterElement).show(1000).fadeIn(1000);
  }

  clear() {
    this.experiencesContainer.empty();
  }
};

whoami.experiences = new whoami.Experiences();
