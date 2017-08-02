const fs = require('fs');
const path = require('path');
const chalk = require('chalk')
const figures = require('figures')
const exec = require('child_process').exec;

const appModuleFile = path.resolve(__dirname, '../src/app/app.module.ts');

const importLocation = 'from \'@ionic/cloud-angular\';';
const importInsert = '\nimport { DeployMock } from \'./../mocks/mocks\';';
const providersLocation = 'providers: [';
const providersInsert = '\n{ provide: Deploy, useClass: DeployMock },';

function insertDeployMock() {
  insertAtLocation(appModuleFile, importLocation, importInsert);
  insertAtLocation(appModuleFile, providersLocation, providersInsert);
  console.info(chalk.green(figures.tick) + ' add DeployMock to app.modules.ts.');
}

function removeDeployMock() {
  removeAtLocation(appModuleFile, importLocation, importInsert);
  removeAtLocation(appModuleFile, providersLocation, providersInsert);
  console.info(chalk.green(figures.tick) + ' remove DeployMock from app.modules.ts.');
}

function insertAtLocation(file, location, insert) {
  var content = fs.readFileSync(file, 'utf8');
  var contentReplaced = content.replace(location, location + insert);
  fs.writeFileSync(file, contentReplaced, 'utf8');
}

function removeAtLocation(file, location, insert) {
  var content = fs.readFileSync(file, 'utf8');
  var contentReplaced = content.replace(location + insert, location);
  fs.writeFileSync(file, contentReplaced, 'utf8');
}

if(process.argv[2] === 'add') {
  insertDeployMock();
}

if(process.argv[2] === 'remove') {
  removeDeployMock();
}