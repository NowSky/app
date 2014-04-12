function readFile(fileName) {
fs = require('fs')

fs.readFile(fileName, 'utf8', function (err,data) {
  if (err) {
    return err;
  }
  return data;
});
}
