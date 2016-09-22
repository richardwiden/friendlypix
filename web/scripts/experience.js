'use strict';

window.whoami = window.whoami || {};

whoami.Experience = class {
  /**
   * Experience init
   * @constructor
   */
  constructor() {
    $(document).ready(()=> {
      this.experienceElement = $(whoami.Experience.createExperienceHtml());
    });
  }

  /**
   *
   * @returns {*}
   */
  fillExperienceData(){
    const experience = this.experienceElement;

    return experience;
  }

  static createExperienceHtml() {
    return `
    <div>Something</div>
    `;
  }

};
whoami.experience = new whoami.Experience();
