# Software Architecture Document

Beschreibt die Archtiektur des Mobile Client.

## Imagic IMS Daten Model
Um im Imagic IMS Daten via REST API zu speichern müssen wir uns mit dem Datenmodell der Firma Imagic vertraut machen.
Da das Imagic IMS für verschiedene Kundensegement flexibel einsetzbar sein muss ist das Datenmodell sehr abstrakt.

### Datenmodell

![IMS Datenmodell](images/Ims_Datenmodell.png)

Innerhalb einer IMS Datenbank können verschiedene **Archive** installiert sein. Jedes dieser Archive kann unterschiedliche Tabellen (**Table**) mit wiederum unterschiedlichen Feldern (**Field**) haben. Die Tabellen sind hierarchisch in einer 1:n Struktur aufgebaut. Die letzte Kind Tabelle wird jeweils als Bilder Tabelle bezeichnet. Auf dieser Ebene werden alle Mediendaten gespeichert und sie ist damit zwingend. Alle Tabellen besitzen zwingend neben IMS spezifischen Felder ein vom Kunden definitertes IdentifierField. Dieses wird für eine eindeutige Identifikation der Objekte durch den Kunden gebraucht.

Neben normalen Feldern (String, Boolean, Integer usw.) gibt es noch ein speziellers Keyword Feld. Dies ist ein Feld welches String Werte abspeichern kann. Diese Werte sollten jedoch aus einem Katalog geholt werden.

### Objektmodell
Mit dem Objektmodell wird aufgezeigt, wie unterschiedlich Tabellen und Felder bei einem Archive sein können. Als Beispiel dient ein Auszug aus einem Polizeiarchiv und einem Medizinarchiv.

![Objektmodell Polizeiarchiv](images/Polizeiarchiv_Objektmodell.png)

Das Polizeiarchiv workflow_db1 hat drei Tabellen. Auf der höchsten Ebene steht die Tabelle Art. Danach kommen Fälle und zu jedem Fall gibt es Bilder.

![Objektmodell Medizinarchiv](images/Medizinarchiv_Objectmodell.png)

Das Medizinarchiv beinhaltet völlig andere Tabellen. Auf höchster Ebene ist dort ein Patient, danach kommen Besuche (Visit), Studien (Study) und am Schluss wie von IMS vorgegeben die Bilder Tabelle. Als Beispiel eines Keyword Katalog wurde das Geschlecht (Sex) bei einem Patient gewählt. Man erkennt dass innerhalb des Keyword Kataloges die Werte masculin und feminim ausgewählt werden können.

## Ordner Struktur Konventionen

Damit das Projekt sauber strukturiert ist und sich neue Entwickler rasch zurechtfinden verwenden wir eine Order Struktur Konventionen. Diese Konventionen entsprechen im Grundsatz der Konvention von einem Ionic 2 Projekt.  

    .
    ├── e2e                          # Automatisierte End to End Tests
    ├── docs                         # Dokumentationen
    ├── resources                    # Icon, Splashscreen
    |── scripts                      # Scripts für Travis CI oder Entwickler
    ├── src                          # Sourcecode Files
    ├──── app                        # Zusammenstellung der App, Dependency Managment Konfiguration
    ├──── assets                     # Bilder die innerhalb der App gebraucht werden
    ├──── components                 # Wiederverwendbare UI Elemente
    ├────── any-component            # Überordner eines Elements
    ├──────── any-component.html     # Struktur und UI des Elements
    ├──────── any-component.scss     # Gestaltung des Elements
    ├──────── any-component.spec.ts  # Testklasse des Elements
    ├──────── any-component.ts       # Logik für das Elements
    ├──── mocks                      # Mocks und Klassen für Testing
    ├────── providers                # Mock Klassen von Provider
    ├────── response                 # Mock-Antworten der REST API
    ├──── models                     # Model Klassen
    ├──── pages                      # UI Screen Seiten
    ├────── any-page                 # Überordner einer Seite
    ├──────── any-page.html          # Struktur und UI Elemente der Seite
    ├──────── any-page.scss          # Gestaltung der Seite
    ├──────── any-page.spec.ts       # Testklasse der Seite
    ├──────── any-page.ts            # Logik für der Seite. Aufrufe von Services
    ├──── providers                  # Services welche innerhalb der Pages gebraucht werden können
    ├──────── any-service.spec.ts    # Testklasse des Services
    ├──────── any-service.ts         # Serviceklasse
    ├──── themes                     # scss Files für die Gestaltung der App 
    ├──── validators                 # Validationsklassen für unterschiedliche Feldtypen

## Dataflow Diagramm

![Dataflow Diagramm](images/dataflow_diagram.png)

Ein Dataflow Diagramm bietet einen Überblick über die Richtung des  Datenflusses und zeigt auf, wo die Daten persistiert werden. Beim Arkivar Mobile Clients liefert der IMS Server alle Informationen, welche für den Aufbau der Navigationstruktur notwendig sind. Die Bilder können von verschiedenen Quellen eingelesen werden und mit Feldeinträgen vom User komplettiert werden. Beim Upload werden die Bilder mit den Feldinformationen vom Mobile Client an den IMS Server übertragen. 

## Technologie Stack

Folgende Technologien werden innerhalb des Projekts verwendet.

| Kategorie                            | Technologie        | Logo                            | Link                                    |
|--------------------------------------|--------------------|---------------------------------|-----------------------------------------|
| Framework                            | Ionic              | ![Ionic](images/logo/Ionic_Logo.jpg) | http://ionicframework.com/              |
| Framework                         | Angular            | ![Angular](images/logo/Angular_Logo.jpg) | https://angular.io/                     |
| Programmiersprache                   | Typescript         | ![Typescript](images/logo/Typescript_Logo.jpg) | https://www.typescriptlang.org          |
| Unit Testing                         | Jasmine            | ![Jasmine](images/logo/Jasmine_Logo.jpg) | https://jasmine.github.io/              |
| End To End Testing                   | Protractor         | ![Protractor](images/logo/Protractor_Logo.jpg) | http://www.protractortest.org/        |
| Code Coverage                   | Coveralls         | ![Coveralls](images/logo/Coveralls_Logo.jpg) | https://coveralls.io/        |
| Wireframes                   | Ninja Mock         | ![NinjaMock](images/logo/Ninjamock_Logo.jpg) | https://ninjamock.com/        |
| Versionsverwaltungstool              | Git                | ![Git](images/logo/Git_Logo.jpg) | https://git-scm.com/                    |
| Hoster Versionsverwaltungstool       | Github             | ![Github](images/logo/Github_Logo.jpg) | https://github.com/                     |
| Build Tool                           | npm                | ![npm](images/logo/npm_Logo.jpg) | https://www.npmjs.com/                  |
| Continuous Integration               | Travis CI          | ![Travis CI](images/logo/Travis_CI_Logo.jpg) | https://travis-ci.org/                  |
| Project Management, Bugtracking Tool | Waffle             | ![Waffle](images/logo/Waffle_Logo.jpg) | https://waffle.io/                      |
| Dokumentationstool                   | Github             | ![Github](images/logo/Github_Logo.jpg) | https://github.com/                     |
| Team Kommunikation                   | Slack              | ![Slack](images/logo/Slack_Logo.jpg) | https://slack.com/                      |
| Entwicklungsumgebung                 | Visual Studio Code | ![Visual Studio Code](images/logo/Visual_Studio_Code_Logo.jpg) | https://code.visualstudio.com/          |
| Zeiterfassung                        | Goolge Drive       | ![Google Drive](images/logo/Google_Drive_Logo.jpg) | https://drive.google.com/ |
