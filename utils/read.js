fs = require('fs')
jsql = require('json-sql')
fs.readFile('cometData.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log(data);
});

