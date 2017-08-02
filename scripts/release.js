const fs = require('fs');
const path = require('path');
const chalk = require('chalk')
const figures = require('figures')
const exec = require('child_process').exec;

const standardVersion = require('standard-version');
const packageJsonFile = path.resolve(__dirname, '../package.json');
const configXmlFile = path.resolve(__dirname, '../config.xml');
const loginTsFile = path.resolve(__dirname, '../src/pages/login/login.ts');
const changelogFile = path.resolve(__dirname, '../CHANGELOG.md');
var packageJson = JSON.parse(fs.readFileSync(packageJsonFile, 'utf8'));

var versionBefore = packageJson['version'];

standardVersion({ 'skip': { 'commit': true, 'tag': true } }).then(function succ() {
  packageJson = JSON.parse(fs.readFileSync(packageJsonFile, 'utf8'));
  var newVersion = packageJson['version'];
  replaceInFile(configXmlFile, 'id="io.github.imsmobile.app" version="' + versionBefore + '"', 'id="io.github.imsmobile.app" version="' + newVersion + '"');
  console.info(chalk.green(figures.tick) + ' bumping version in config.xml from ' + chalk.bold(versionBefore) + ' to ' + chalk.bold(newVersion));
  replaceInFile(loginTsFile, 'version: string = \'' + versionBefore + '\'', 'version: string = \'' + newVersion + '\'');
  console.info(chalk.green(figures.tick) + ' bumping version in login.ts from ' + chalk.bold(versionBefore) + ' to ' + chalk.bold(newVersion));
  replaceInFile(changelogFile, '[standard-version](https://github.com/conventional-changelog/standard-version)', ' [Definition of Done](CONTRIBUTING.md)'); 
  console.info(chalk.green(figures.tick) + ' link to definition of done for commit guide lines in CHANGELOG.nd');

  printTodoCommand('git add package.json config.xml src/pages/login/login.ts CHANGELOG.md', 'after checking local changes');
  printTodoCommand('git commit -m "' + "release: " + newVersion + '"', 'to commit local changes');
  printTodoCommand('git tag -a -m "' + "release: " + newVersion + '" ' + newVersion, 'to create new tag');
  printTodoCommand('git push --follow-tags origin master', 'to publish to github');
  printTodoCommand('ionic upload --note "version: ' + newVersion + '" --deploy production', 'to release in production');
});

function printTodoCommand(command, reason) {
  console.info(chalk.blue(figures.info) + ' run ' + chalk.bold('`' + command + '`') + ' ' + reason);
}

function replaceInFile(file, searchValue, replaceValue) {
  var content = fs.readFileSync(file, 'utf8');
  var contentReplaced = content.replace(searchValue, replaceValue);
  fs.writeFileSync(file, contentReplaced, 'utf8');
}
