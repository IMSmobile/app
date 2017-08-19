/**
 * Script to generate documention collection
 * Prerequisites:
 * - Python in Path
 *  - pip install grip
 * - git in Path
 * - Pandoc in Path
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
const mdFilesForPublication = [
  'docs/projektplan.md',
  'docs/risikoanalyse.md',
  'docs/questions.md',
  'docs/spec.md',
  'docs/frameworkanforderungen.md',
  'docs/frameworkentscheid.md',
  'docs/sad.md',
  'docs/schnellstartanleitung.md',
  'CONTRIBUTING.md',
  'README.md',
  'docs/glossary.md'
];
const mdFileLinkToTitleMap = {
  'projektplan.md': '#projektplan',
  'risikoanalyse.md': '#risiko-analyse',
  'questions.md': '#fragenkatalog-für-stakeholder',
  'spec.md': '#spezifikation',
  'frameworkanforderungen.md': '#anforderungen-an-das-framework',
  'Frameworkentscheid.md': '#framework-entscheid',
  'sad.md': '#software-architecture-document',
  'schnellstartanleitung.md': '#schnellstartanleitung',
  '../CONTRIBUTING.md': '#guidelines-for-contribution',
  'glossary.md': '#glossar',
};
const publicationPolishingSteps = [
  'Datei → Eigenschaften → Dokumenteigenschaften aufrufen',
  'Dokumenteneigenschaft Titel umbenennen in "Arkivar - Mobiler Client für Imagic IMS"',
  'Dokumenteneigenschaft Thema umbenennen in "MAS Abschlussarbeit"',
  'Dokumenteneigenschaft Autor umbenennen in "Michael Leu;Niklaus Tschirky;Sandro Zbinden"',
  'Titelblatt von Template (resources/publication-template.docx) übernehmen',
  'Titel des Inhaltsverzeichnis auf "Inhaltsverzeichnis" ändern',
  'Kapitel "Projektplan → Inhaltsverzeichnis" löschen',
  'Kapitel "Spezifikation → Inhaltsverzeichnis" löschen',
  'Kapitel "Software Architecture Document → Inhaltsverzeichnis" löschen',
  'Kopf und Fusszeilen kontrollieren (Formatprobleme)',
  'Macro scripts/github-table-macro.bas importieren und ausführen")',
  'Alle Tabellenformatoption "Gebänderte Zeilen / Verbundene Zeilen" aktivieren',
  'Kapitel "Projektdokumente" löschen',
  'Kapitel "Produktdokumente" löschen',
  'Inhaltsverzeichnis aktualisieren',
  'Als PDF speichern'
]
const rootDir = path.resolve(__dirname, '../.');
const exportDir = path.resolve(__dirname, '../' + exportDirName);
const glob = require('glob');

fs.removeSync(exportDir);
copyToExportDirectory();
convertMDToHTML();
createPublication();

function copyToExportDirectory() {
  execSync('git ' + ['clone', '--quiet', rootDir, exportDir].join(' '));
  console.info(chalk.green(figures.tick) + ' copied files to export directory ' + exportDir);
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
      console.info(chalk.green(figures.tick) + ' successfully converted ' + file);
    });
    sanitizeHTMLLinks();
  })
}

function createPublication() {
  const publication = exportDirName + '/' + 'publikation';
  const publicationMd = publication + '.md';
  const publicationDocx = publication + '.docx';
  const publicationTemplate = rootDir + '/resources/publication-template.docx';
  fs.removeSync(publicationMd);
  fs.removeSync(publicationDocx);
  ensureDirectory(publicationMd);
  mdFilesForPublication.forEach(function (file) {
    const content = cleanupForPublication(fs.readFileSync(rootDir + '/' + file, { encoding: 'utf8' }));
    fs.appendFileSync(publicationMd, content);
  });
  execSync('pandoc ' + ['--from=markdown_github', '--to=docx', '--toc', '--standalone', '--output=' + publicationDocx, '--reference-docx='+ publicationTemplate, publicationMd].join(' '));
  console.info(chalk.green(figures.tick) + ' created ' + publicationDocx);
  console.info('\nNow you need to do some manual work:');
  publicationPolishingSteps.forEach(function (step) {
    console.info(chalk.blue(figures.checkboxOff) + ' ' + step);
  });
  console.info('Good Luck!');
}

function cleanupForPublication(content) {
  content = removeBadges(content);
  content = fixImagePaths(content);
  content = fixDocumentLinks(content);
  content = convertTsCodeblocksToJs(content);
  return content;
}

function fixImagePaths(content) {
  return content.replace(/\(images\//g, '(docs/images/')
}

function removeBadges(content) {
  return content.replace(/\[!\[[^\]]*\]\(http.*/g, '')
}

function fixDocumentLinks(content) {
  Object.keys(mdFileLinkToTitleMap).forEach(function (link) {
    let internalMdFilePattern = new RegExp('\\\]\\\(' + link + '[^#]*\\\)', 'g')
    let internalMdFileChapterPattern = new RegExp('\\\]\\\(' + link + '#', 'g')
    content = content.replace(internalMdFilePattern, '](' + mdFileLinkToTitleMap[link] + ')');
    content = content.replace(internalMdFileChapterPattern, '](#');
  });
  return content;
}

function convertTsCodeblocksToJs(content) {
  return content.replace(/```typescript/g, '```javascript')
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

