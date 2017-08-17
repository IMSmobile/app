/**
 * Script to generate documention collection
 * Prerequisites:
 * - Python in Path
 *  - pip install grip
 */
const path = require('path');
const spawn = require('child_process').spawn;
const cheerio = require('cheerio')
const execSync = require('child_process').execSync;
const fs = require('fs-extra')
const chalk = require('chalk')
const figures = require('figures')
const gitclone = require('gitclone')

const exportDirName = 'document-collection'
const ignoredMDs = ['node_modules/**/*.md', 'platforms/**/*.md', 'plugins/**/*.md'];
const rootDir = path.resolve(__dirname, '../.');
const exportDir = path.resolve(__dirname, '../' + exportDirName);
const glob = require('glob');

fs.removeSync(exportDir);
clonePrototypes();
copyToExportDirectory('docs/**/*');
copyToExportDirectory('e2e/**/*');
copyToExportDirectory('src/**/*');
copyToExportDirectory('scripts/**/*');
copyToExportDirectory('*.md');
copyToExportDirectory('*.json');
copyToExportDirectory('*.xml');
convertMDToHTML();

function copyToExportDirectory(wildcard) {
  glob(wildcard, {}, function (er, files) {
    files.forEach(function (file) {
      exportFile = exportDir + "/" + file;
      if (!fs.lstatSync(file).isDirectory()) {
        ensureDirectory(exportFile);
        fs.createReadStream(file).pipe(fs.createWriteStream(exportFile));
      }
    });
    console.info(chalk.green(figures.tick) + ' copied files with wildcard ' + wildcard + ' to export directory ' + exportDir);
  });
}

function convertMDToHTML() {
  glob("**/*.md", { 'ignore': ignoredMDs }, function (er, files) {
    console.info(chalk.blue(figures.info) + ' converting all .md documents. This could take a while...');
    files.forEach(function (file) {
      if (file.endsWith('README.md')) {
        exportFile = exportDir + "\\" + file.replace('README.md', 'index.html');
      } else {
        exportFile = exportDir + "\\" + file.replace('.md', '.html');
      }
      ensureDirectory(exportFile);
      execSync('grip ' + [file, '--quiet', '--export', exportFile].join(' '));
      console.info(chalk.green(figures.tick) + ' successfull converted ' + file);
    });
    sanitizeHTMLLinks();
  })
}

function sanitizeHTMLLinks() {
  glob(exportDirName + '/**/*.html', {}, function (er, files) {
    console.info(chalk.blue(figures.info) + ' sanitizing all .html documents. This could take a while...');
    files.forEach(function (file) {
      const $ = cheerio.load(fs.readFileSync(file));
      $('a').each(function (index, link) {
        if ($(link).attr('href')) {
          replaceInternalMDLinkWithHTML($, link);
          fixUmlautLinks($, link);
        }
      });
      fs.writeFileSync(file, $.html());
    });
    console.info(chalk.green(figures.tick) + ' sanitized all html links');
  })
}


function replaceInternalMDLinkWithHTML($, link) {
  href = $(link).attr('href')
  if (isInternalLink(href)) {
    if (href.endsWith('.md')) {
      $(link).attr('href', href.replace('.md', '.html'));
    }
  }
}

function fixUmlautLinks($, link) {
  $(link).attr('href', $(link).attr('href').replace('%C3%BC', 'ü'));
  $(link).attr('href', $(link).attr('href').replace('%C3%9c', 'Ü'));
  $(link).attr('href', $(link).attr('href').replace('%C3%84', 'Ä'));
  $(link).attr('href', $(link).attr('href').replace('%C3%A4', 'ä'));
  $(link).attr('href', $(link).attr('href').replace('%C3%96', 'Ö'));
  $(link).attr('href', $(link).attr('href').replace('%C3%B6', 'ö'));
}

function isInternalLink(href) {
  return !href.startsWith('http');
}


function clonePrototypes() {
  prototypeBaseDir = exportDir + '/prototypes';
  clonePrototype(prototypeBaseDir, 'ionic2-prototype');
  clonePrototype(prototypeBaseDir, 'XamarinPrototype');
  clonePrototype(prototypeBaseDir, 'rn-prototype');
}

function clonePrototype(prototypeBaseDir, prototypeName) {
  prototypeDir = prototypeBaseDir + "/" + prototypeName;
  ensureDirectory(prototypeDir);
  gitclone('https://github.com/IMSmobile/' + prototypeName, { dest: prototypeDir })
  console.info(chalk.green(figures.tick) + ' cloning ' + prototypeName + ' prototype to ' + prototypeDir);
}

function ensureDirectory(file) {
  if (!fs.existsSync(path.dirname(file))) {
    fs.mkdirsSync(path.dirname(file));
  }
}

