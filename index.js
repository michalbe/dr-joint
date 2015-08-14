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
        var fieldLabel = $('<div></div>').attr({
          'data-table': table,
          'data-field': field
        }).addClass('db-field').on('click', function(){
          var that = $(this);
          if (that.hasClass('added')) {
            return;
          }
          that.closest('.db-container').find('.selected').removeClass('selected');
          that.toggleClass('selected');
          checkSelected();
        });

        fieldLabel.append($('<div></div>').addClass('field-label').text(field));
        fieldLabel.append($('<div></div>').addClass('remove-button').on('click', function(){
          var that = $(this);
          var field = that.closest('.db-field');
          that.removeClass('added');
          console.log('[data-field="' + field.attr('data-field') + '"][data-table="' + field.attr('data-table') + '"]');
          $('[data-field="' + field.attr('data-field') + '"]').removeClass('added');
        }));

        fieldElement.append(
          fieldLabel
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

  var checkSelected = function(){
    var selected = $('.selected');
    if (selected.length === 2) {
      selected.addClass('added');

      var first = $(selected[0]);
      var second = $(selected[1]);
      var firstText = first.find('.field-label').text();
      var secondText = second.find('.field-label').text();
      var firstLinkedTo = second.attr('data-table')+'.' + second.attr('data-field');
      var secondLinkedTo = first.attr('data-table')+'.' + first.attr('data-field');
      first.find('.field-label').html(firstText + ' <b>linked to</b> ' + firstLinkedTo);
      first.attr('data-linked-to', firstLinkedTo);
      second.attr('data-linked-to', secondLinkedTo);
      second.find('.field-label').html(secondText + ' <b>linked to</b> ' + secondLinkedTo);
      selected.removeClass('selected');
    }
  };
})();
