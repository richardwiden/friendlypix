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
   * @param id
   * @param title
   * @param type personal|work|school
   * @returns {JQuery|jQuery|HTMLElement|*}
   */
  fillExperienceData(id, title, type) {
    const expElement = this.experienceElement;
    $('h4', expElement).text(title);
    const expCard = $('.experience-card', expElement).removeClass("personal professional school");
    const classes = expCard.attr("class");
    expCard.removeClass(classes).addClass(type).addClass(classes);
    return expElement;
  }

  /**
   *
   * @returns {string} html-string
   */
  static createExperienceHtml() {
    return `
    <div class="mdl-cell mdl-cell--4-col mdl-cel--6-tablet mdl-cell--12-phone">
      <div class="experience-card personal mdl-card mdl-shadow--2dp">
          <div class="mdl-card__title mdl-card--expand">
              <h4>
                title
              </h4>
          </div>
          <div class="mdl-card__actions mdl-card--border">
              <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                  Add to Calendar
               </a>
            <div class="mdl-layout-spacer"></div>
              <i class="material-icons">event</i>
            </div>
      </div>
    </div>
    `;
  }

};
whoami.experience = new whoami.Experience();
