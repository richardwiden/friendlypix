'use strict';

window.whoami = window.whoami || {};

whoami.Experience = class {
  /**
   * Experience init
   * @constructor
   */
  constructor() {
    this.signifierCssClasses = 'whoami-personal whoami-professional whoami-school';
    this.experienceElement = $(whoami.Experience.createExperienceHtml());
    this.titleElement = $('h4', this.experienceElement);
    this.descElement = $('.mdl-card__supporting-text', this.experienceElement);
    this.signifierElements = $('.mdl-card__title, .mdl-card__actions', this.experienceElement);
    this.signifierElements.push(this.experienceElement);
    $('button', this.experienceElement).click(()=> {
      this.readAndCommentClick();
    });
    this.showMore = false;
    $(document).ready(()=> {
    });
  }


  readAndCommentClick() {
    this.showMore = !this.showMore;

    const normalClasses = 'experience-card mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-phone mdl-cel--6-tablet mdl-cell--4-col';
    const activeClasses = 'experience-card mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-phone mdl-cel--12-tablet mdl-cell--12-col';

    this.experienceElement.toggleClass(normalClasses).toggleClass(activeClasses);

    if (this.showMore) {
      this.experienceElement
    }
  }

  /**
   *
   * @param id
   * @param title
   * @param type {String} personal|professional|school
   * @param desc
   * @param image
   * @param year
   * @returns {JQuery|jQuery|HTMLElement|*}
   */
  fillExperienceData(id, title, type, desc, image, year) {
    const expElement = this.experienceElement;
    expElement.attr("id", "experience-card-" + id);
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.image = image;
    this.year = year;
    this.titleElement.text(title);
    this.descElement.text(desc);
    this.signifierElements.removeClass(this.signifierCssClasses);
    this.signifierElements.each((index, elem)=> {
      const jqElem = $(elem);
      const cssClasses = jqElem.attr("class");
      jqElem.addClass('whoami-' + type).addClass(cssClasses);
    });

    const expImage = $('.mdl-card__supporting-text', expElement);
    if ((!desc || desc == '') && image)
      expImage.attr("style", "background-image: url('/images/" + image + "'); background-size: cover; background-position: center center;");
    return expElement;
  }

  /**
   *
   * @returns {string} html-string
   */
  static createExperienceHtml() {
    return `
    
      <div class="experience-card mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-phone mdl-cel--6-tablet mdl-cell--4-col">            
          <div class="mdl-card__title" >              
              <h4></h4>              
          </div>
          <div class="mdl-card__supporting-text  mdl-card--expand"></div>          
          <div class="mdl-card__actions mdl-card--border">
              <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                  Read more & Comment <i class="material-icons">more</i>                                                        
               </button>            
      </div>
    
    `;
  }

};
whoami.experience = new whoami.Experience();
