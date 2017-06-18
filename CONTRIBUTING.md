# Guidelines for Contribution
## Definition of Done
Eine Issue gilt als abgeschlossen wenn:
- Das Projekt ohne Fehler gebuildet werden kann
- Alle Unittests erfolgreich (grün) durchgelaufen sind
- Der End to End Test erfolgreich (grün) durchgelaufen ist
- Alle Code Style Guidelines eingehalten und mit TS-Lint überprüft wurden
- Alle Daten zum Issue auf Github eingecheckt sind
- Die dazugehörige Dokumentation angepasst oder erstellt wurde
- Keine TODO Kommentare im Code zu finden sind
- Der Pull Request einem Review unterzogen wurde und unseren Qualitätsanforderungen entspricht
- Das Issue geschlossen wurde (entweder durch Commit-Messages oder manuell auf dem Kanbanboard)
- Die Funktionalität auf einem iOS und Android Gerät getestet wurde
- Die Version (gemäss Semantic Versioning) in folgenden Files erhöht wurde
  - `package.json`
  - `src/pages/login.ts`
  - `config.xml`

## Pull Request Format
Weil wir Pull Requests auf den master squashen um automatiserte Release Notes generieren zu können müssen die Angaben einem speziellen Format entsprechen. Das Format basiert auf den [Commit Message Guidelines von Angular](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines). Der Pull Request wird in Englisch geschrieben.

### Titel
Der Titel muss zwingend einen **Type**, optional einen **Scope** sowie zwingend einen **content** enthalten. Er darf eine Länge von 100 Zeichen nicht überschreiten.

#### Type

Muss eines der folgenden Konstanten sein:

`build`: Änderungen welche das build system oder externe Abhängigkeiten betreffen (npm, scripts)  
`ci`: Änderungen an der Continuous Integration Konfiguration (Travis)  
`docs`: Änderungen in der Dokumentation (Issue mit doc Tag)  
`feat`: Ein neues Feature (Issue ohne Tag)  
`fix`: Eine Fehlerbehebung (Issue mit bug oder framework-bug Tag)  
`perf`: Eine Performance Verbesserung  
`refactor`: Codeänderung welche keinen Fix oder kein Feature beinhaltet  
`style`: Änderungen am Format des Codes (Lint, Whitespace, Formatierung,Semikolon)  
`test`: Hinzufügen oder korrigieren eines bestehenden Tests

#### Scope
Muss bei Type feat und fix zwingend angegeben werden und einer von folgenden Konstanten sein:

`app`  
`login`  
`upload`  
`setting`  
`entries`  
`search` 

#### Subject
Im Subject werden die Änderungen zusammengefasst. Es wird der imperativ verwendet: "change" nicht "changed" und auch nicht "changes". Das erste Wort wird nicht gross geschrieben. Kein Punkt am Ende

### Text
Der Text eines Pull Requests besteht aus dem **Body** und einem **Footer**.

#### Body
Der Body Beschreibt die Motivation für die Codeänderung sowie die Änderung der Applikation zur bestehenden Version. 

#### Footer
Hier werden falls nötig Breaking Changes genauer beschrieben sowie Issues referenziert.

Der Absatz muss mit `BREAKING CHANGE:` beginnen und die Änderung beschreiben, die Gründe dafür nennen sowie allenfalls nötige Migrationsschritte auflisten.

Danach werden die jeweiligen Issues referenziert.
