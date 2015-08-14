var drjoint = (function(){
'use strict';

  var createDBSchema = function(data){
    var dbSchema = $('<div></div>');
    dbSchema.addClass('db-container');
    var fieldElement;

    // render table names
    for (var table in data) {
      dbSchema.append('<h3>' + table + '</h3>');
      fieldElement = $('<div></div>');
      fieldElement.appendTo(dbSchema);
      $.each(data[table], function(index, field){
        fieldElement.append(
          $('<div></div>').text(field).attr({
            'data-table': table,
            'data-field': field
          }).addClass('db-field')
          );
      });
    }

    dbSchema.accordion({
      active: false,
      collapsible: true,
      heightStyle: 'content'
    });
    console.log(dbSchema);
    return dbSchema;
  };

  $.get('sql/opencart.json', function (data) {
    var sourceDB = createDBSchema(data);
    sourceDB.appendTo(document.body);
  });

  $.get('sql/prestashop.json', function (data) {
    var destinationDB = createDBSchema(data);
    destinationDB.css({
      position: 'absolute',
      top: 0,
      right: 0,
      display: 'block',
      textAlign: 'right'
    });
    destinationDB.appendTo(document.body);
  });

  // nanoajax.ajax('sql/prestashop.json', function (code, responseText) {
  //   var data = JSON.parse(responseText);
  //   document.body.innerHTML += '<br/>prestashop tables: ' + Object.keys(data).length;
  // });
})();
