var drjoint = (function(){
'use strict';

  $.get('sql/opencart.json', function (data) {
    // render table names
    for (var table in data) {
      $('body').append(createTable(table, data[table]));
    }
  });

  // nanoajax.ajax('sql/prestashop.json', function (code, responseText) {
  //   var data = JSON.parse(responseText);
  //   document.body.innerHTML += '<br/>prestashop tables: ' + Object.keys(data).length;
  // });
})();

var createTable = function(name, fields){
  var el = $('<div></div>');
  var fieldElement;
  el.text(name);

  $.each(fields, function(index, field){
    fieldElement = $('<div></div>');
    fieldElement.css({'backgroundColor' : '#F0F'});
    fieldElement.text(field);
    fieldElement.appendTo(el);
  });
  return el;
};
