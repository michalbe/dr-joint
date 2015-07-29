var drjoint = (function(){
'use strict';

  $.get('sql/opencart.json', function (data) {
    // render table names
    for (var table in data) {
      $('body').append(createTable(table));
    }
  });

  // nanoajax.ajax('sql/prestashop.json', function (code, responseText) {
  //   var data = JSON.parse(responseText);
  //   document.body.innerHTML += '<br/>prestashop tables: ' + Object.keys(data).length;
  // });
})();

var createTable = function(name, content){
  var el = $('<div></div>');
  el.text(name);
  return el;
};
