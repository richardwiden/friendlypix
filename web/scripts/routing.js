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

      page('/',pipe(showExeriences(),null,null),pipe(displayPage,{pageId:'experiences'}));

      page();
    });
  }

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
};
whoami.router = new whoami.Router();
