# ims Mobile App

## Vision
Wir möchten es den Kunden von Imagic ims erlauben auf einfache Weise via mobilen Clients digitale Medien (Bilder, Audio, Video, Texte) im IMS System abzuspeichern. Dazu möchten wir eine möglichst plattformunabhängige Mobile-App entwickeln.

![Vision Visualisierung](vision_visualisierung.png)

Die Softwareentwicklung wollen wir Team durchführen. Das Software Projekt soll vom Greenfield durch Konzeption über Architektur bis hin zur Realisation durchgeführt werden.

Die Produkt soll eine generische Open Source Lösung sein, welche das Produktsortiment von IMS erweitert.

Mit Hilfe von Continuous Integration, Reviews und Tests werden wir versuchen eine hohe Softwarequalität zu erreichen, um ein erweiterbares Produkt abzuliefern.

Unser persönliches Ziel ist es unser Wissen um moderne Cross-Platform Frameworks und Tooling zu erweitern. Durch gelungenes Interaction Design möchten wir dem Kunden eine Freude im Alltag bereiten. Auch möchten wir unser Leben erleichtern und eine Continuous Deployment Pipeline aufbauen, damit neue Releases rasch beim Kunden ankommen. 

Am Schluss soll eine funktional vollständige Android und iOS App entstehen, welche in einem Software Repository zum Download bereitgestellt wird. Mit dieser App sollen digitale Medien auf benutzerfreundliche Art und Weise ohne Hürden ins IMS hochgeladen werden können um den Arbeitsalltag der Kunden zu erleichtern. 


## Allgemeine Angaben
### Autor

| Photo        | Name | E-Mail| 
| ------------- |-------------|-------------|
| ![Niklaus Tschirky](niklaus_tschirky.png) |Niklaus Tschirky|niklaus.tschirky@hsr.ch|
| ------------- |Michael Leu|michael.leu@hsr.ch|
| ![Sandor Zbinden](sandro_zbinden.png) |Sandro Zbinden|sandro.zbinden@hsr.ch|


## Einführung
### Zweck
Dieses Dokument Beschreibt die Organisation, Vorgehensweise und die verwendeten Werkzeuge für die Umsetzung des Projekts. Es dient als Einstiegspunkt um sämtliche Projektbezogenen Information zu erhalten.

### Gültigkeitsbereich
Dieses Dokument ist über die ganze Projektdauer gültig. Änderungen werden fortlaufend ergänzt und können in der [Commit History](https://github.com/IMSmobile/app/commits/master/README.md) dieses Dokuments angesehen werden.
### Referenzen
| Link        | Beschreibung |
| ------------- |-------------|
| [Arbeitspakete (Issues)](https://github.com/IMSmobile/app/issues?utf8=%E2%9C%93&q=)      | Arbeitspakete als als Github Issues erfasst und durch Labels Kategorisiert|
| [Kanban Board](https://waffle.io/IMSmobile/app)| Waffle Kanbanboard verknüpft mit Issues zeigt Backlog und Zustand des aktuellen Sprints|
| [Zeiterfassung](https://docs.google.com/spreadsheets/d/1wPmgUyEP-KACbgbScPLBRBLKIGRuS5j_b-cGsaogbYE/edit?usp=sharing)| Google Spreadsheet Dokument zeigt Aufwand der Projektarbeit|
| [Kalender](https://calendar.google.com/calendar/embed?src=3k1v67336orm53otamk6e4s1rc%40group.calendar.google.com&ctz=Europe/Paris) | Google Calendar für die Planung einzelner Ereginissen.
### Glossar
TBD

## Projekt Übersicht
Durch das Projekt ims Mobile App entsteht eine Applikation um Medien via Mobile Devices im  digitale Bildmangementsystem ims zu sichern. Das Projekt wird im Rahmen einer Masterarbeit von der Hochschule für Technik in Rapperswill [HSR](www.hsr.ch) für den Studiengang MAS Softwareengineering 2015 durchgeführt.

Die Anforderungen sowie auch deren Priorisierung erfolgt von den Firmen Imagic AG und Pic System AG .

Die Firma Imagic bietet Lösungen und Systeme für das digitale Bildmanagement. Dem Kunden werden Tools für die Aufnahme, Bearbeitung, Analyse, Verwaltung und Reporting von Bildmaterial angeboten. Diverse Schnittstellen erlauben die Integration einer Vielzahl Fremdapplikationen. Die Firma Pic Systems vertreibt die Bildmangamgement Lösung und ist für den Vertrieb, Installation und Instandhaltung der Software Lösung im Bereich der Polizei zuständig.

IMS ist ein sehr flexibles Bildmanagement-System, bei welchem Workflows für verschiedene Zwecke erstellt werden können. Dies erlaubt es, dieselbe Code-Basis für verschiedene Kunden-Segmente wie Industrie, Medizin, Life-Sciences und Polizei einzusetzen.

Die primäre Benutzergruppe sind schweizerische Polizeieinheiten. Der neue Client sollte einen einfacheren Prozesses bereitstellen, um Bilder während ihrem täglichen Einsatz auf Streife in ihrem IMS Bildverwaltungssystem abzulegen. Die Lösung sollte offen genug sein um sämtliche Datenmodelle von weiteren Kundensegmenten wie Medizin, Industrie und Life Science abzudecken. Als sekundäre Benutzergruppe sehen wir die Verkäufer der IMS Software welche den Mobile Client zu Demonstrationszwecken nutzen können.

Der Mobile Client soll eine schlanke und bedienerfreundliche Weg sein um nebst dem herkömmlichen IMS Client Daten und den unzähligen technischen Schnittstellen (XML. HL7. Dicom) Medien in das IMS abzuspeichern.
<<Projektbeschreibung>>
### Lieferumfang
<<Welche Deliverables sollen am Schluss verfügbar sein? Wie/wo wird das Deliverable (z.B. Software/Dokument/Hardware/…) ausgeliefert? Unter welchen Bedingungen/Restrictions werden die Deliverables zur Verfügung gestellt? >>

## Projektorganisation
<<Welche externen Stakeholder/Ansprechpartner sind beteiligt? Wer macht was?>>
### Organisationsstruktur
<<Organigramm>>
### Externe Schnittstellen
TBD

## Risikomanagement

Die Risiken und der Umgang mit Risiken wird druch eine sepeartes Dokument https://github.com/IMSmobile/app/blob/master/docs/risikoanalyse.md beschrieben. 

## Management Abläufe

### Zeitliche Planung
Währen der Projektdauer zwischen 15.02.2017 - 28.08.2017 wird das Projekt in 13 Sprints unterteilt. Jeder Sprint hat einen zeitlichen Aufwand von ca. 93 Stunden.

#### Phasen

| Phase        | Beschreibung | Zeitbereich |
| ------------- |-------------|-------------|
| Anforderungsanalyse und Prototype | Sammeln der Anforderungen von Stakeholdern, evaluieren von verschiedenen Cross-Platform Frameworks | 16.02.2017 - 24.02.2017 |

## Infrastruktur
TBD
## Qualitätsmassnahmen
<<Was wird unternommen damit das Produkt des Projektes, sowie dessen gesamter Verlauf eine hohe Qualität erreicht? Übersicht in einer Tabelle geben mit Massnahmen, Zeitraum und Ziel der Massnahme>>
### Dokumentation
<<Wo befinden sich die Dokumente (SVN oder Git Server) und wie wird deren Qualität sichergestellt?>>
### Projektmanagement
<<Welches Tool wird für Projektmanagement eingesetzt (z.B. Redmine oder Trac) und wie erfolgt dieser Einsatz? Dazugehörige Links und Logins (ohne Passwörter).>>
### Entwicklung	18
<<Wo befindet sich der Source Code (z.B. SVN oder Git) und wie wird dessen Qualität sichergestellt?>>
#### Vorgehen
<<Vorgehen in der Entwicklung, Prozess, Standards>>
#### Code Reviews
<<Werden Code Reviews gemacht und wie werden diese gemacht?>>
#### Code Style Guideline
<<Welche Code Style Guidelines werden angewendet? Sie brauchen keine eigenen Guidelines zu erfinden. Am besten referenzieren Sie existierende Guidelines, mit denen Sie einverstanden sind. Evtl. noch Abweichungen dazu dokumentieren.>>
### Testing
TBD
#### Unit Testing
TBD
#### End to End Testing
TBD
#### Manual Testing
TBD
