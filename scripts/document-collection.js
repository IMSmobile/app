/**
 * Script to generate documention collection
 * Prerequisites:
 * - Python in Path
 *  - pip install grip
 */
const path = require('path');
const spawn = require('child_process').spawn;
const execSync = require('child_process').execSync;

const fs = require('fs-extra')
const rootDir = path.resolve(__dirname, '../.');
const exportDir = path.resolve(__dirname, '../document-collection');
const glob = require('glob');


fs.removeSync(exportDir);

glob("docs/**/*", {}, function (er, files) {
  files.forEach(function (file) {
    exportFile = exportDir + "/" + file;
    if (!fs.lstatSync(file).isDirectory()) {
      ensureDirectory(exportFile);
      console.log('Create copy to file', exportFile)
      fs.createReadStream(file).pipe(fs.createWriteStream(exportFile));
    }
  });
})

glob("**/*.md", { 'ignore': ['node_modules/**/*.md', 'platforms/**/*.md', 'plugins/**/*.md'] }, function (er, files) {
  console.info("Converting all documents. This could take a while...")
  files.forEach(function (file) {
    console.info('Start converting', file);
    exportFile = exportDir + "\\" + file;
    ensureDirectory(exportFile);
    execSync('grip ' + [file, '--export', exportFile].join(' '));
  });
})

function ensureDirectory(file) {
  if (!fs.existsSync(path.dirname(file))) {
    fs.mkdirsSync(path.dirname(file));
  }
}

