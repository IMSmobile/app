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


# Guidlines für Commit Message
## Commit Message Format
Jede Commit Message besteht aus einem zwingenden **header** und einem optionalen **body** Element.
Der **header** hat ein spezielles Format welches zwingend einen **type**, einen **scope** und einen **content** enthalten muss. 

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
```
Jede Commit Message Zeile darf eine länge von 100 Zeichen nicht überschreiten.
Die Commit Message wird in Englisch geschrieben.

### Type

Muss eines der folgenden Konstanten sein:

build: Änderungen welche das build system oder externe Abhängigkeiten betreffen (npm, scripts) 
ci: Änderungen an der Continuous Integration Konfiguration (Travis)
docs: Änderungen in der Dokumentation (Issue mit doc Tag)
feat: Ein neues Feature (Issue ohne Tag)
fix: Eine Fehlerbehebung (Issue mit bug oder framework-bug Tag)
perf: Eine Performance Verbesserung
refactor: Codeänderung welche keinen Fix oder kein Feature beinhaltet.
style: Änderungen am Format des Codes (Lint, Whitespace, Formatierung,Semikolon)
test: Hinzufügen oder korrigieren eines bestehenden Tests.

### Scope

Muss bei Type feat und fix zwingend angegeben werden und einer von folgenden Konstanten sein:

app
login
upload
setting
entries
search

### Subject

Im Subject werden die Änderungen zusammengefasst:

Es wird der imperativ verwendet "change" not "changed" auch nicht "changes"
Das erste Wort wird nicht Gross geschrieben
Kein Punkt am Ende

### Body

Im Body steht die Motivation für die Codeänderung sowie die Änderung der Applikation zur bestehenden Version. 