# Kurzprotokoll Sprint 7 Review

Freitag, 02.06.2017 10:00-10:45 bei PIC Systems AG, Glattbrugg

## Teilnehmer

PIC Systems: Marcel Bachmann, Michael Bachmann  
Imagic: Urs Gomez, Patrik Wermelinger, Patrick Bohren  
Betreuer Masterarbeit: Roland Weber  
Mobile Client Entwickler: Michael Leu, Niklaus Tschirky, Sandro Zbinden

## Traktanden
- Abgeschlossene Aufgaben
- In Bearbeitung
- Ausblick
- Fragen

## Protokoll

### Abgeschlossene Aufgaben
- Verbesserter Keyboardinput (Kleinschreibung bei Credentialeingabe)
- Archiv Auswahl 
	- Demonstration ohne Archiv
	- Demonstration mit 2 Archive und persistenter Speicherung der Auswahl per User
- Eintragsbeschreibungsfelder sind einstellbar und pro Archiv speicherbar
- Ladebalken Überarbeitung (wurden mehr einmal gleichzeitig aufgerufen)
- Validierung der Datenfelder in Uploadpage
- Übersetzung auf Deutsch
- End to End Tests mithilfe von Travis CI
- Burnup Chart erstellt zum besseren Einschätzen der erreichbaren Ziele

### In Bearbeitung
- Verbesserung der Codeanalyse mithilfe von Codelyzer

### Ausblick
- Upload von Bilder aus Galerie
- Upload von Bilder aus dem Browser
- Versionierung (mit Release Notes und Semantic Versioning)

### Fragen
Sortierung von Eintragbeschreibungsfelder möglich? → Aktuell nicht möglich, kann zu einem späteren Zeitpunkt nochmals angeschaut werden.

### Feedback / Input
Speicherung der Usereinstellungen: aktuell auf Gerät → in Zukunft über REST-Schnittstelle oder MDM (Issues erfasst)  
Mandatory Felder könnten besser angezeigt werden (z.B. mit Stern oder roter Umrandung)  
Burnup Chart, bessere Repräsentation der Erreichbarkeit (Anzahl Punkte bei Ende Masterarbeit)  
Backlog Priorisierung → Aufzeigen, was erreichbar ist. Anhand dieses Schlussstrichs kann Imagic und PIC System entschieden, was eher erledigt werden soll und was weniger wichtiger ist. → Werkzeug zur besseren Priorisierung einführen (Hin und Herschieben der Tasks mit Erreichbarkeit). Wurde als Issue aufgenommen.  
UDID von Patrick Bohren anfordern, damit auf seinem iPhone die Developerversion deployt werden kann.
### Nächster Termin
16.06.2017 um 10:00
