var drjoint = (function(){
'use strict';

  $.get('sql/opencart.json', function (responseText) {
    var data = responseText;

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

var createTable = function(name, content){
  var el = document.createElement();
};
