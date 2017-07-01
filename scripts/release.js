const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

const standardVersion = require('standard-version');
const packageJsonFile = path.resolve(__dirname, '../package.json');
const configXmlFile = path.resolve(__dirname, '../config.xml');
const loginTsFile = path.resolve(__dirname, '../src/pages/login/login.ts');
var packageJson = JSON.parse(fs.readFileSync(packageJsonFile, 'utf8'));

var versionBefore = packageJson['version'];

standardVersion({ "skip": { "commit": true, 'tag': true }, }).then(function succ() {
  packageJson = JSON.parse(fs.readFileSync(packageJsonFile, 'utf8'));
  var newVersion = packageJson['version'];
  replaceInFile(configXmlFile, 'id="io.github.imsmobile.app" version="' + versionBefore + '"', 'id="io.github.imsmobile.app" version="' + newVersion + '"');
  replaceInFile(loginTsFile, 'version: string = \'' + versionBefore + '\'', 'version: string = \'' + newVersion + '\'');
  exec('git tag -d v' + newVersion);
  exec('git tag ' + newVersion);
});


function replaceInFile(file, searchValue, replaceValue) {
  var content = fs.readFileSync(file, 'utf8');
  var contentReplaced = content.replace(searchValue, replaceValue);
  fs.writeFileSync(file, contentReplaced, 'utf8');
}
