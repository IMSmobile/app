# Kurzprotokoll Sprint 8 Review

Freitag, 16.06.2017 10:00-10:45 bei PIC Systems AG, Glattbrugg

## Teilnehmer

PIC Systems: Marcel Bachmann, Michael Bachmann  
Imagic: Urs Gomez, Patrik Wermelinger, Patrick Bohren  
Mobile Client Entwickler: Michael Leu, Niklaus Tschirky, Sandro Zbinden

## Traktanden
- Abgeschlossene Aufgaben
- In Bearbeitung
- Ausblick
- Fragen

## Protokoll

### Abgeschlossene Aufgaben
- Upload von Galerie
- Erforderliche Felder werden auf Uploadpage mit Stern markiert
- Versionierung in App und Github (u.a. ersichtlich auf Loginpage)
- Global Error Handling (Im Fehlerfall wird der Alertservice aufgerufen)
- Workaround mit iOS mit falschen Logindaten (Timeout, falls keine Antwort zurückgegeben wird)
- Caddy timeout erneut konfiguriert, um Upload von grösseren Dateien und Upload bei langsamer Verbindung zu gewährleisten
- Storyboard auf Realtimestoryboard umgehostet

### In Bearbeitung
- Upload über Browser (per Auswahldialog und Drag&Drop)
- Release Notes mithilfe von Commitizen
- Statische Codeanalyse Überarbeitung

### Ausblick
- Veröffentlichung in App Stores
- Validierungshilfen bei Uploadfeldern (Datepicker, Schiebebutton)
- Verbesserung im Continuous Deployment

### Fragen
- Rest Segment Name konfigurierbar machen? → Aktuell laut Imagic und Picsystem nicht wichtig/aktuell
- Bildname von Smartphone App → Bildname auf Smartphone nicht relevant, für IMS-Server nicht entscheidend
- Popup für Settings umgestalten → Findet vor allem bei iOS-User auf Anklang. Sollte umgesetzt werden

### Feedback / Input
- iPad mini Absturz → Aufstarten der Kamera und Abbruch mit Cancel führt zum "Whitescreen"
- Eventuell überladen mit 2 Buttons für Galerie und Kamera; vorerst aber in Ordnung
- Multiupload für Imagic ein sehr wichtiger Punkt
- Patrick Bohren auf Emailverteiler nehmen

### Bemerkungen
Prioriserung des Backlogs im Anschluss des Meetings mit Urs Gomez durchgeführt.

### Nächster Termin
30.06.2017 um 10:00
