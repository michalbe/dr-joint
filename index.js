var drjoint = (function(){
'use strict';

  nanoajax.ajax('sql/opencart.json', function (code, responseText) {
    var data = JSON.parse(responseText);

    // render table names
    for (var table in data) {
      document.body.innerHTML += table +'<br/>';
    }
  });

  // nanoajax.ajax('sql/prestashop.json', function (code, responseText) {
  //   var data = JSON.parse(responseText);
  //   document.body.innerHTML += '<br/>prestashop tables: ' + Object.keys(data).length;
  // });
})();
