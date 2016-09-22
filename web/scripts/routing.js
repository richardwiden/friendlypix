'use strict';

window.whoami = window.whoami || {};

whoami.Router = class {
  constructor() {
    $(document).ready(() => {
      this.pagesElements = $('[id^=page-]');
      this.splash = $('#page-splash');
      this.splash.show().fadeIn(1000).show().delay(5000).fadeOut(2000).queue(page);

      const pipe = whoami.Router.pipe;
      const displayPage = this.displayPage.bind(this);

      const showExeriences = () => whoami.experiences.showExperiences();

      page('/', pipe(showExeriences(), null, null), pipe(displayPage, {pageId: 'experiences'}));

      page();
    });
  }

  /**
   * Hides all other pages besides attribute.pageId
   * @param attributes: { pageId : string}
   */
  displayPage(attributes) {
    let pageId = attributes.pageId;
    this.pagesElements.each((index, element) => {
      if (element.id == 'page-' + pageId) {
        $(element).show();
      } else if (element.id == 'page-splash') {
        $(element).delay(1000).queue.fadeOut(1000).hide();
      } else {
        $(element).hide();
      }
    });
  }


  /**
   * Pipes the given function and passes the given attribute and Page.js context.
   * Set 'optContinue' to true if there are further functions to call.
   */
  static pipe(funct, attribute, optContinue) {
    return (context, next) => {
      if (funct) {
        const params = Object.keys(context.params);
        if (!attribute && params.length > 0) {
          funct(context.params[params[0]], context);
        } else {
          funct(attribute, context);
        }
      }
      if (optContinue) {
        next();
      }
    };
  }
};
whoami.router = new whoami.Router();
