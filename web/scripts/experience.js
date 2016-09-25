'use strict';

window.whoami = window.whoami || {};

whoami.Experience = class {
  /**
   * Experience init
   * @constructor
   */
  constructor() {
    /**
     *
     */
    (function ($) {
      $.fn.onEnter = function (func) {
        this.bind('keypress', function (e) {
          if (e.keyCode == 13) func.apply(this, [e]);
        });
        return this;
      };
    })(jQuery);
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
    this.commentTextArea = $('textarea', this.experienceElement);
    this.commentTextArea.onEnter(()=> {
      console.log("enter pressed");
      this.postComment();
    });

    $(document).ready(()=> {
    });
  }

  clear() {
    this.stopListeningForComments();
  }


  moreToggle() {
    this.showMore = !this.showMore;

    // TODO look over if all this needs to be swapped
    const normalClasses = 'experience-card expandable mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-phone mdl-cel--6-tablet mdl-cell--4-col';
    const activeClasses = 'experience-card expanded mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-phone mdl-cel--12-tablet mdl-cell--12-col';

    this.experienceElement.toggleClass(normalClasses).toggleClass(activeClasses);
    this.commentsElement.toggleClass(this.hideCommentsCss).toggleClass(this.showCommentsCss);

    this.setImage(this.showMore, this.desc, this.image);
    if (this.showMore) { // is showing more
      this.moreButton.text('Less');
      this.loadAndListenForComments();
    }
    else {
      this.moreButton.text('More');
      this.stopListeningForComments();
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
      <div class="experience-card expandable mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-phone mdl-cel--6-tablet mdl-cell--4-col">            
            <div class="mdl-card__title" >              
                <h4></h4>              
            </div>
            <div class="mdl-card__supporting-text  mdl-card--expand"></div>
            <div class="comments mdl-card hide-comments "></div>
            <div class="mdl-grid mdl-grid--no-spacing mdl-card__actions mdl-card--border">          
                <button class="mdl-cell mdl-cell--1-col-phone mdl-cell--1-col-tablet mdl-cell--1-col-desktop mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" value="">
                    More                                                       
                </button>    
                <form class="mdl-cell mdl-cell--3-col-phone mdl-cell--7-col-tablet mdl-cell--11-col-desktop hidden-when-not-expanded" action="#">
                    <div class="mdl-textfield mdl-js-textfield">
                        <textarea class="mdl-textfield__input" type="text" rows= "3" placeholder="Drop a comment" ></textarea>
                  
                    </div>
                </form>
            </div>
        </div>
    
    `;
  }

  postComment() {
    let text = '';
    window.whoami.firebase.postComment(this.id, text);
  }

  /**
   * TODO split into it's own file?
   */
  loadAndListenForComments() {
    whoami.firebase.getComments(this.id, (err, commentData, key)=> {
      this.addCommentToPage(key, commentData.experienceId, commentData.text, commentData.displayName, commentData.image);
    });
  }

  /**
   * TODO split into its down file?
   */
  stopListeningForComments() {

  }

  /**
   * TODO split into it's own file
   * @param commentId
   * @param experienceId
   * @param text
   * @param displayName
   * @param image
   */
  addCommentToPage(commentId, experienceId, text, displayName, image) {
    const commentHtmlId = '#comment-' + commentId;
    const foundComments = $(commentHtmlId, this.commentsElement);
    let comment;
    if (foundComments.length == 1)
      comment = foundComments;
    else
      comment = $(whoami.Experience.createCommentHtml());

    comment.attr("id", commentHtmlId);
    $('.comment-displayName', comment).text(displayName);
    $('.comment-text', comment).text(text);
    $('.comment-image', comment).attr('src', image);
    this.commentsElement.append(comment);
  }

  /**
   * TODO Should be split off into it's own file?
   * @returns {string}
   */
  static createCommentHtml() {
    return `
        <div class="comment">
            <img class="comment-image"/>
            <div class="comment-text-displayName">                
                <h5 class="comment-displayName">
                    title
                </h5>
                <div class="comment-text">                
            </div>
            </div>
            
        </div>
    
    `;
  }


};
whoami.experience = new whoami.Experience();
