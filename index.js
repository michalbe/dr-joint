var drjoint = (function(){
'use strict';
  $.get('sql/opencart.json', function (data) {
    var sourceDB = $('<div></div>');
    sourceDB.addClass('db-container');
    var fieldElement;
    sourceDB.appendTo(document.body);

    // render table names
    for (var table in data) {
      sourceDB.append('<h3>' + table + '</h3>');
      fieldElement = $('<div></div>');
      fieldElement.appendTo(sourceDB);
      $.each(data[table], function(index, field){
        fieldElement.append($('<li></li>').text(field));
      });
    }

    sourceDB.accordion({
      active: false,
      collapsible: true,
      heightStyle: 'content'
    });

  });

  // nanoajax.ajax('sql/prestashop.json', function (code, responseText) {
  //   var data = JSON.parse(responseText);
  //   document.body.innerHTML += '<br/>prestashop tables: ' + Object.keys(data).length;
  // });
})();
