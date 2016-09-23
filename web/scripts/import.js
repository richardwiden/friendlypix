'use strict';
window.whoami = window.whoami || {};

whoami.Import = class {

  constructor() {
    $(document).ready(() => {
      const importPage = $('#page-import');
      this.importPage = importPage;
      this.importButton = $('button', importPage);
      this.importTextarea = $('textarea', importPage);
      this.importButton.click(()=>whoami.import.importObject);
    });
  }

  importObject() {
    let suc = ()=> {
    };
    let fail = () => {
    };
    whoami.firebase.importObject(whoami.import.importTextarea.text()).then(suc, fail);
  }
  showSucess(){

  }
  showImport() {

  }
};

whoami.import = new whoami.Import();
