var drjoint = (function(){
'use strict';

  var destinationDB;
  var sourceDB;

  var createDBSchema = function(data){

    var dbSchema = $('<div></div>');
    dbSchema.addClass('db-container');
    var fieldElement;

    // render table names
    for (var table in data) {
      dbSchema.append('<h3>' + table + '</h3>');
      dbSchema.attr('data-table-acc', table);
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

        fieldLabel.append($('<div></div>').addClass('remove-button').on('click', function(){
          var that = $(this);
          var field = that.closest('.db-field');

          field.removeClass('added', 'selected');
          field.find('.field-label').text(field.attr('data-field'));
          var linkedField = $('[data-linked-to="' + field.attr('data-table') + '.' + field.attr('data-field') + '"]');
          linkedField.removeClass('added', 'selected');
          linkedField.find('.field-label').text(linkedField.attr('data-field'));

        }));
        fieldLabel.append($('<div></div>').addClass('field-label').text(field));

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
    return dbSchema;
  };

  $.get('sql/prestashop.json', function (data) {
    destinationDB = createDBSchema(data);
    destinationDB.css({
      float: 'right'
    });
    destinationDB.appendTo($('#content'));
    $('#destination-search').on('keyup', searchAction(destinationDB));

  });

  $.get('sql/opencart.json', function (data) {
    sourceDB = createDBSchema(data);
    sourceDB.appendTo($('#content'));
    $('#source-search').on('keyup', searchAction(sourceDB));
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
      first.find('.field-label').html(firstText + ' <span class="small"><b>linked to</b> ' + firstLinkedTo + '</span>');
      first.attr('data-linked-to', firstLinkedTo);
      second.attr('data-linked-to', secondLinkedTo);
      second.find('.field-label').html(secondText + ' <span class="small"><b>linked to</b> ' + secondLinkedTo + '</span>');
      selected.removeClass('selected');
    }
  };

  // search elements
  var searchAction = function(db) {
    return function() {
      var searchterm = $(this).val();
      db.find('.hidden').removeClass('hidden');
      var tables = db.children();
      $.each(tables, function(ind, el){
        if ($(el).text().indexOf(searchterm) === -1) {
          $(el).addClass('hidden');
        }
      });
    };
  };
})();
