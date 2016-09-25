'use strict';

window.whoami = window.whoami || {};

whoami.Experience = class {
  /**
   * Experience init
   * @constructor
   */
  constructor() {
    this.signifierCssClasses = 'whoami-personal whoami-professional whoami-school';
    this.hideCommentsCss = 'hide-comments';
    this.showCommentsCss = 'show-comments';
    this.experienceElement = $(whoami.Experience.createExperienceHtml());
    this.titleElement = $('h4', this.experienceElement);
    this.descElement = $('.mdl-card__supporting-text', this.experienceElement);
    this.signifierElements = $('.mdl-card__title, .mdl-card__actions', this.experienceElement);
    this.signifierElements.push(this.experienceElement);
    this.moreButton = $('button', this.experienceElement);
    this.moreButton.click(()=> {
      this.moreToggle();
    });
    this.showMore = false;
    this.commentsElement = $('.comments', this.experienceElement);


    $(document).ready(()=> {
    });
  }

  clear() {
    this.stopListeningForComments();
  }


  moreToggle() {
    this.showMore = !this.showMore;

    const normalClasses = 'experience-card mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-phone mdl-cel--6-tablet mdl-cell--4-col';
    const activeClasses = 'experience-card mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-phone mdl-cel--12-tablet mdl-cell--12-col';

    this.experienceElement.toggleClass(normalClasses).toggleClass(activeClasses);
    this.setImage(this.showMore, this.desc, this.image);

    this.commentsElement.toggleClass(this.hideCommentsCss).toggleClass(this.showCommentsCss);
    if (this.showMore) { // is showing more
      this.moreButton.html('Less <i class="material-icons">more</i>');
    }
    else {
      this.moreButton.html('More & Comment <i class="material-icons">more</i> ');
    }

    if (this.showMore)
      this.loadAndListenForComments();
    else
      this.stopListeningForComments();
  }

  loadAndListenForComments() {
    whoami.firebase.getComments(this.id, (err, commentData, key)=> {
      this.addComment(key, commentData.experienceId, commentData.text, commentData.username, commentData.image);
    });
  }

  stopListeningForComments() {

  }

  addComment(commentId, experienceId, text, username, image) {
    const commentHtmlId = '#comment-' + commentId;
    const foundComments = $(commentHtmlId, this.commentsElement);
    let comment;
    if (foundComments.length == 1)
      comment = foundComments;
    else
      comment = whoami.Experience.createExperienceHtml();

    comment.attr("id", commentHtmlId);
    $('.comment-username', comment).text(username);
    $('.comment-text', comment).text(text);
    $('.comment-image', comment).attr('src', image);
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

    this.setImage(this.showMore, desc, image);
    return expElement;
  }

  setImage(showMore, desc, image) {
    let height = '';
    if (showMore)
      height = 'height:50vh;max-height:400px;';
    if ((!desc || desc == '') && image)
      this.descElement.attr("style", "background-image: url('/images/" + image + "'); background-size: cover; background-position: center center;flex-grow:1;padding:0;width:100%;" + height);
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
            <div class="comments mdl-card hide-comments "></div>
            <div class="mdl-card__actions mdl-card--border">          
              <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" value="">
                    More & Comment <i class="material-icons">more</i>                                                        
               </button>    
            </div>
        </div>
    
    `;
  }

  static createCommentHtml() {
    return `
        <div class="comment">
            <div>
                <img class="comment-image" style="height: 50px; width: 50px; background-color: blue"/>
                <div class="comment-username" style="height: 50px; width: auto; background-color: maroon;">
                    title
                </div>
            </div>
            <div class="comment-text" style="height: 50px; width: 100%; background-color: darkgreen;">
                Text
            </div>
        </div>
    
    `;
  }

};
whoami.experience = new whoami.Experience();
