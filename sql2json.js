var file = process.argv[2];
var sct2j = require('sql-create-table-to-json');

sct2j(file, function(err, data){
  if (err) {
    console.log(err);
    return;
  }

  console.log(JSON.stringify(data, 2, 2));
});
