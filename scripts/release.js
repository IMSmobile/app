const fs = require('fs');
const path = require('path');
const chalk = require('chalk')
const figures = require('figures')
const exec = require('child_process').exec;

const standardVersion = require('standard-version');
const packageJsonFile = path.resolve(__dirname, '../package.json');
const configXmlFile = path.resolve(__dirname, '../config.xml');
const loginTsFile = path.resolve(__dirname, '../src/pages/login/login.ts');
var packageJson = JSON.parse(fs.readFileSync(packageJsonFile, 'utf8'));

var versionBefore = packageJson['version'];

standardVersion({ 'skip': { 'commit': true, 'tag': true } }).then(function succ() {
  packageJson = JSON.parse(fs.readFileSync(packageJsonFile, 'utf8'));
  var newVersion = packageJson['version'];
  replaceInFile(configXmlFile, 'id="io.github.imsmobile.app" version="' + versionBefore + '"', 'id="io.github.imsmobile.app" version="' + newVersion + '"');
  console.info(chalk.green(figures.tick) + ' bumping version in config.xml from ' + chalk.bold(versionBefore) + ' to ' + chalk.bold(newVersion));
  replaceInFile(loginTsFile, 'version: string = \'' + versionBefore + '\'', 'version: string = \'' + newVersion + '\'');
  console.info(chalk.green(figures.tick) + ' bumping version in login.ts from ' + chalk.bold(versionBefore) + ' to ' + chalk.bold(newVersion));
  printTodoCommand('git add .', 'after checking local changes');
  printTodoCommand('git commit -m "' + "release: " + newVersion + '"', 'to commit local changes');
  printTodoCommand('git tag ' + newVersion, 'to create new tag');
  printTodoCommand('git push --follow-tags origin master', 'to publish');
});

function printTodoCommand(command, reason) {
  console.info(chalk.blue(figures.info) + ' run ' + chalk.bold('`' + command + '`') + ' ' + reason);
}

function replaceInFile(file, searchValue, replaceValue) {
  var content = fs.readFileSync(file, 'utf8');
  var contentReplaced = content.replace(searchValue, replaceValue);
  fs.writeFileSync(file, contentReplaced, 'utf8');
}
