'use strict';
window.whoami = window.whoami || {};

whoami.Import = class {

  constructor() {
    $(document).ready(() => {
      const importPage = $('#page-import');
      this.importPage = importPage;
      this.importButton = $('button', importPage);
      this.importTextarea = $('textarea', importPage);

    });
  }
  showImport() {
    const btn = $('#page-import button');
    let suc = ()=> {
      console.log("suc");
    };
    let fail = (err) => {
      console.log(err);
    };
    btn.click(()=>{
      const text = $('#page-import textarea').val();
      let obj = JSON.parse(text);
      whoami.firebase.importObject(obj).then(suc, fail);
    })
  }
};

whoami.import = new whoami.Import();
