function readFile(fileName) {
fs = require('fs')
jsql = require('json-sql')
fs.readFile('cometData.json', 'utf8', function (err,data) {
  if (err) {
    return err;
  }
  return data;
});
}
