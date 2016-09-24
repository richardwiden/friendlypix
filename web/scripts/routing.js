'use strict';

window.whoami = window.whoami || {};

whoami.Router = class {
  constructor() {
    $(document).ready(() => {
      this.pagesElements = $('[id^=page-]');
      this.titleElements = $('head>title, span.mdl-layout-title');
      this.splash = $('#page-splash');
      this.splash.show().fadeOut(500);

      const pipe = whoami.Router.pipe;
      const displayPage = this.displayPage.bind(this);

      const showExperiences = () => whoami.experiences.showExperiences();

      page('/', pipe(showExperiences(), null, true), pipe(displayPage, {pageId: 'experiences', title: 'experiences'}));
      page('/experiences', () => page('/'));
      page('/import', pipe(whoami.import.showImport, null, true), pipe(displayPage, {pageId: 'import'}));
      page('/auth', pipe(displayPage, {pageId: 'auth'}));
      page();
    });
  }

  /**
   * Hides all other pages besides attribute.pageId
   * @param attributes: { pageId : string}
   */
  displayPage(attributes) {
    let pageId = attributes.pageId;
    const pageTitle = attributes.title || pageId;
    this.titleElements.text(pageTitle);
    this.pagesElements.each((index, element) => {
      if (element.id == 'page-' + pageId) {
        $(element).show();
      } else if (element.id == 'page-splash') {
        //$(element).delay(1000).queue.fadeOut(1000).hide();
      } else {
        $(element).hide();
      }
    });
  }

  /**
   * Reloads current page
   */
  reloadPage() {
    let path = window.location.pathname;
    if (!path || path == '') path = '/';
    page(path);
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
