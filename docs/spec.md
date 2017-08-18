# Spezifikation

## Inhaltsverzeichnis
- [Einleitung](#einleitung)
- [Vision](#vision)
- [Stakeholder](#stakeholder)
- [Anforderungskatalog](#anforderungskatalog)
  - [Funktional](#funktional)
  - [Nicht-Funktional](#nicht-funktional)
- [Priorisierung](#priorisierung)
  - [Vorgehen](#vorgehen)
  - [Priorisierungsmatrix](#priorisierungsmatrix)
  - [Initiale Priorität der Anforderungen](#initiale-priorität-der-anforderungen)
- [Quelle](#quelle)
- [Glossar](#glossar)

## Einleitung
Mit dem Mobile Client möchten wir den Kunden von Imagic ermöglichen, über iOS und Android Smartphones digitale Medien (Bilder, Audio, Video, Texte) ins digitale Bildmanagement-System Imagic IMS abzuspeichern.

Als Schnittstelle soll die vom Imagic IMS Server bereitgestellte REST-API verwendet werden.

## Anforderungskatalog
Aus Gründen der Lesbarkeit verwenden wir den Begriff _Client_ als Synonym für _Mobile Client_.

### Funktional
ID   | Name | Beschreibung | Quelle      | Bemerkungen
---- | ---- | ------------ | ----------- | -----------
FA1  | Bildupload | Der Client muss bis zu 20 Bilder aus der Galerie in das Imagic IMS speichern können. | PIC Systems | 
FA2  | Kameraupload | Der Client muss ein Bild direkt von der Kamera des Smartphones in das Imagic IMS speichern können. | PIC Systems |
FA3  | Bildformat | Der Client muss die Bildformate PNG und JPEG in das Imagic IMS speichern können. | PIC Systems |
FA4  | Bildattribute | Der Client muss das Bild inkl. EXIF-Daten in das Imagic IMS speichern können. | PIC Systems |
FA5  | Metadaten | Der Client muss dem Benutzer vor dem Speichern eines Bildes die Möglichkeit bieten, Metadaten pro Bild zu erfassen. | PIC Systems |
FA6  | Fallauswahl | Der Client muss dem Benutzer die Möglichkeit bieten, einen bestehenden Fall auszuwählen. | PIC Systems |
FA7  | Fallerstellung | Der Client soll dem Benutzer die Möglichkeit bieten, einen neuen Fall zu erstellen. | PIC Systems |
FA8  | Falldaten | Bei der Erstellung eines neuen Falles, soll der Client dem Benutzer die Möglichkeit bieten, Metadaten für den neuen Fall zu erfassen. | PIC Systems | 
FA9  | Strukturtiefe | Eine Fallauswahl oder Fallerstellung muss in einer bis zu 5 Ebenen tiefen Struktur möglich sein. | Imagic | 
FA10 | Lizenz | Der Client muss sich an die Benutzerbegrenzung der REST-API gemäss Imagic IMS Lizenzmodell halten. | Imagic | 
FA11 | iOS-muss | Der Client muss auf einem iPhone 6 mit iOS 10 funktionsfähig sein. | Imagic, PIC Systems |
FA12 | iOS-soll | Der Client soll auf iPhones 5, 6 und 7 mit iOS 9 oder höher funktionsfähig sein. | Imagic, PIC Systems |
FA13 | Android-muss | Der Client muss auf einem Samsung Galaxy S7 mit Android 7.0 API Level 24 (Nougat) funktionsfähig sein. | Imagic |
FA14 | Android-soll | Der Client soll auf Smartphones mit Android 5.1 API Level 22 (Lollipop) oder höher funktionsfähig sein. | Imagic |
FA15 | Browser | Der Client kann auch mit einem modernen Browser (Chrome: aktuelle Version, Firefox: aktuelle Version, Edge 14 und Internet Explorer 11) benutzt werden. | Imagic, PIC Systems |
FA16 | Direktupload | Der Client kann so eingestellt werden, dass keine Mediendaten auf dem Gerät zwischengespeichert werden. | Imagic | Wenn aktiviert, können Spezifikationen wie NF15 und NF17 nur eingeschränkt erfüllt werden.
FA17 | Schnittstelle | Der Client muss mit dem Imagic IMS über die REST-API kommunizieren. | Imagic IMS |
FA18 | Entrypoint | Der Client soll über den REST-API Eingangspunkt die Ressourcen der API ansprechen. | Imagic IMS |
~~FA19~~ | ~~Bildlöschung~~ | ~~Hochgeladene Bilder können wieder gelöscht werden.~~ | | Imagic: nicht gewünscht. PIC Systems: nicht gewünscht.
FA20 | Bildanzeige | Bilder aus dem Imagic IMS können im Client angezeigt werden. | | Imagic: kann man später machen. PIC Systems: nicht benötigt.
FA21 | Pflichtfelder | Im Client müssen die im Imagic IMS definierten Pflichtfelder ausgefüllt werden, bevor das Bild ins Imagic IMS gespeichert werden kann. | Imagic IMS |
FA22 | Fallzuteilung | Der Client muss das Bild oder die Bilder zu einem Fall zuteilen können. | Imagic, PIC Systems | 
FA23 | Fehlermeldung | Der Client soll dem Benutzer Fehler bei Berechtigungen und Lizenz anzeigen. | Imagic |
FA24 | Filter | Der Client muss dem Benutzer eine Möglichkeit bieten, nach Fällen zu filtern. | Imagic, PIC Systems | 
FA25 | Mehrfachmetadaten | Der Client kann dem Benutzer die Möglichkeit bieten, Metadaten zu erfassen, welche zu sämtlichen ausgewählten Bildern gespeichert werden. | PIC Systems |
FA26 | Feldfilter | Der Client soll so eingestellt werden können, dass dem Benutzer nur eine definierte Auswahl von Feldern zur Eingabe von Metadaten angezeigt wird. | PIC Systems |  
FA27 | Aktualisierung | Software-Features oder Fehlerbehebungen im Client können automatisch aktualisiert werden. | Support Abteilung |
~~FA28~~ | ~~Publisherlink~~ | ~~Nach fertigem Upload der Bilder soll es möglich sein, einen Publisher Link zu erhalten, welcher dann mittels "Weiterleiten" an andere (dritt) Apps übermittelt werden können.~~ | PIC Systems | Funktionalität wird nicht von der REST API angeboten, kann deshalb nicht realisiert werden. 
~~FA29~~ | ~~Uploadbegrenzung~~ | ~~Es muss möglich sein, eine Begrenzung des Upload-Datenvolumens pro Monat zu konfigurieren.~~ | PIC Systems | Wird als Aufgabe eines Mobile Device Management angesehen.
FA30 | Verbindungsqualität | Die erlaubte Verbindungsqualität (3G/4G/WLAN), ab welcher ein Upload von Bildern gestattet ist, soll konfigurierbar sein. | PIC Systems | 
FA31 | Filmupload | Sämtliche Anforderungen, welche für Bildern gelten, sollen auch mit Filmaufnahmen gültig sein. | PIC Systems |
~~FA32~~ | ~~Uploadbegrenzung~~ | ~~Es kann möglich sein, eine Limite (Begrenzung) der Anzahl Bilder zu konfigurieren, die maximal pro Fall und pro Benutzer hochgeladen werden können.~~ | PIC Systems | Die Uploadbegrenzung wird sinnvollerweise durch eine Mobile Device Management Software sichergestellt.
FA33 | Bildentgegennahme | Es kann möglich sein, Bilder aus einer dritt App an den Mobile Client zu übermitteln, welche dann zugeteilt und upgeloadet werden können. | PIC Systems |
FA34 | Massenbildupload | Der Client soll bis zu 100 Bilder aus der Galerie in das Imagic IMS speichern können. | PIC Systems | 
FA35 | Galerieschutz | Es muss sichergestellt sein, dass ein im Client direkt von der Kamera des Smartphones aufgenommenes Bild nicht in der Galerie des Smartphones gespeichert wird. | PIC Systems |
FA36 | Bildschutz | Im Client direkt von der Kamera des Smartphones aufgenommene Bilder können nicht auf triviale Weise von Drittpersonen oder anderen Apps eingesehen werden. | PIC Systems | Als nicht trivial einsehbar gilt, wenn die Bilder nicht mithilfe der Standard Systemapps (Galerie, Cloudmanager usw.) eingesehen werden können. Auch eine kurzfristige Speicherung der Bilder im App-spezifischen Temporärverzeichnis mit sofortiger Löschung nach Upload ist möglich.
FA37 | Startparameter | Navigation zu einem bestimmten Tabellen-Entry im Client soll mit einem bestimmten Start-Parameter möglich sein. | PIC Systems | Hohe Priorisierung von PIC Systems gewünscht
FA38 | Browserupload | Ein Bildupload (FA1) soll auch mit einem modernen Browser (Chrome: aktuelle Version, Firefox: aktuelle Version, Edge 14 und Internet Explorer 11) möglich sein. | PIC Systems | 
~~FA39~~  | ~~Fallmodifikation~~ | ~~Der Client soll dem Benutzer die Möglichkeit bieten, Falldaten anzupassen.~~ | HSR Review | Imagic: nicht gewünscht. PIC Systems: nicht gewünscht.
FA40 | Dokumentation | Entwickler müssen das Projekt auf- und fortsetzen können.| Betreuer Review | Eine Entwickler Dokumentation reicht für Imagic und PIC Systems.

### Nicht-Funktional
ID   | Name | Beschreibung | Quelle      | Bemerkungen
---- | ---- | ------------ | ----------- | -----------
NF1  | Design | Die Gestaltung des Clients soll die Design-Guidelines von Android und iOS erfüllen. | PIC Systems |
NF2  | Publisher | Der Client soll von einem Privat- oder Firmenkonto in den Store publiziert werden können. | Google und Apple | 
NF3  | Kompabilität | Der Client muss mit REST-API Version 16Q2 bis und mit 17Q1 funktionieren. | PIC Systems |
NF4  | Selbsterklärend | Der Client soll durch einen Benutzer, welcher mit der Bedienung von Imagic IMS vertraut ist, ohne Schulung bedient werden können. | |
NF5  | Offline | Der Client kann auch ohne Netzwerkverbindung Bilder mit Metadaten erfassen. | PIC Systems |
NF6  | Verschlüsselung | Der Client muss verschlüsselt mit der REST-API kommunizieren können. | PIC Systems |
~~NF7~~  | ~~Deployment~~ | ~~Der Client kann durch ein Mobile Device Management von zentraler Stelle aus durch den IT-Verantwortlichen installiert, aktualisiert und deinstalliert werden.~~ | | Nicht durch uns beeinflussbar
NF8  | Zentralkonfig | Der Client soll durch ein Mobile Device Management z.B. mit Configuration Profile von zentraler Stelle aus durch den IT-Verantwortlichen konfiguriert werden. | PIC Systems |
~~NF9~~  | ~~PIN-Code~~ | ~~Der Client kann nur genutzt werden, wenn das Smartphone mit einer Sicherheits-Sperre (PIN-Code, Fingerabdruck etc) gegen Nutzung durch Drittpersonen geschützt ist.~~ | | Wird als Aufgabe eines Mobile Device Managements angesehen.
NF10 | Opensource | Der Quellcode des Clients soll frei zugänglich und von verschiedenen Firmen nutzbar sein. | Imagic, PIC Systems |
NF11 | Version | Im Client soll die Version ersichtlich sein. | Support-Abteilung |
NF12 | Wartezeiten | Der Client soll den Benutzer über Wartezeiten beim Upload oder API-Abfragen informieren. | Benutzer |
NF13 | Abbruch | Bilderupload und Änderung der Metadaten können bis zur Bestätigung des Uploads abgebrochen werden. | Benutzer |
NF14 | Fallanzahl | Der Client soll mit einem Imagic IMS funktionieren, welches 1'000'000 Fälle beinhaltet. | Imagic, PIC Systems |
NF15 | Hintergrund | Der Client soll im Hintergrund ein Bild in das Imagic IMS speichern können. | Benutzer | Wenn Direktupload aktiviert ist, muss der Hintergrundupload nicht verfügbar sein.
NF16 | Wiederverwendbarkeit | Teile des Quellcodes des Clients sollen wiederverwendbar sein für einen Browser-basierten Client. | Imagic, PIC Systems |
NF17 | Verbindungsunterbrüche | Nach einem Verbindungsunterbruch zum Imagic IMS, soll die Übermittlung erneut möglich sein, ohne dass der Benutzer sämtliche Angaben erneut eingeben muss. | PIC Systems | Wenn Direktupload aktiviert ist, kann die Verarbeitung von Verbindungsunterbrüchen eingeschränkt sein.
NF18 | Fehlerverminderung | Wiederholte Regressionen sollen nach Behebung vermieden werden. | Support-Abteilung |
NF19 | Codeübergabe | IMS Entwickler können nach zwei Arbeitstagen kleinere Fehler selbständig beheben. | IMS Entwickler |
NF20 | Softwarepaket | Der Client muss als IPA und APK erzeugt werden können. | PIC Systems |
NF21 | Sprache | Die Texte, welche der Benutzer im Client sieht, müssen auf Deutsch sein. | Imagic, PIC Systems | |
~~NF22~~ | ~~Internationalisierung~~ | ~~Der Client soll mehrere Sprachen unterstützen.~~ | | Imagic: nicht benötigt. PIC Systems: nicht benötigt.


## Priorisierung

### Vorgehen

Zur initialen Priorisierung der Anforderungen arbeiten wir mit Wiegers Priorisierungsmatrix. Bei diesem Verfahren werden Anforderungen durch folgende Kriterien bewertet:

- Welchen Nutzen man hat, wenn die Anforderung umgesetzt wird?
- Welchen Schaden erleidet man, wenn man eine Anforderung nicht umsetzt?
- Wie hoch ist der Aufwand bzw. die Kosten ?
- Wie hoch ist das Risiko ?

Danach werden aus Anforderungen User Stories und Epics. Bei User Stories werden die Anforderungen aus Sicht des Users betrachtet. Es kann sein, dass mehrere Anforderungen in einer User Story abgeschlossen werden. Der Aufwand der User Stories wird mit Story Points im Team geschätzt und mit kleineren Prioritätsanpassungen durchgeführt.

### Priorisierungsmatrix

Für Nutzen, Schaden, Aufwand und Risiko wurden Werte zwischen 1-9 eingetragen. Die genauen Berechnungsgrundlagen sind im Google Spreadsheet [Priorität Anforderungen](https://docs.google.com/spreadsheets/d/1cl-2JXs4DT9XrxSAEOfu3jKu25rMojmLpDIw2Eo8NLM/edit#gid=0) ersichtlich. Hier wird nur das Resultat der Priorisierungsmatrix dargestellt.


| ID      | Anforderung            | Nutzen | Schaden | Wert | Wert (%) | Aufwand | Aufwand (%) | Risiko | Risiko (%) | Prio  | Rang |
|---------|------------------------|--------|---------|------|----------|---------|-------------|--------|------------|-------|------|
| Gewicht |                        | 2      | 1       |      |          | 0.5     |             | 0.5    |            |       |      |
|         |                        |        |         |      |          |         |             |        |            |       |      |
| FA1     | Bildupload             | 9      | 9       | 20   | 8.77%    | 6       | 1.68%       | 2      | 0.68%      | 20.00 | 6    |
| FA2     | Kameraupload           | 5      | 4       | 11   | 4.82%    | 6       | 1.68%       | 3      | 1.03%      | 7.33  | 22   |
| FA5     | Metadaten              | 7      | 4       | 13   | 5.70%    | 4       | 1.12%       | 2      | 0.68%      | 13.00 | 15   |
| FA6     | Fallauswahl            | 8      | 9       | 19   | 8.33%    | 3       | 0.84%       | 2      | 0.68%      | 19.00 | 7    |
| FA7     | Fallerstellung         | 5      | 5       | 12   | 5.26%    | 4       | 1.12%       | 2      | 0.68%      | 12.00 | 16   |
| FA8     | Falldaten              | 7      | 7       | 16   | 7.02%    | 4       | 1.12%       | 2      | 0.68%      | 16.00 | 11   |
| FA9     | Strukturtiefe          | 3      | 5       | 10   | 4.39%    | 5       | 1.40%       | 2      | 0.68%      | 10.00 | 20   |
| FA10    | Lizenz                 | 8      | 9       | 19   | 8.33%    | 2       | 0.56%       | 1      | 0.34%      | 38.00 | 2    |
| FA15    | Browser                | 7      | 2       | 11   | 4.82%    | 7       | 1.96%       | 4      | 1.37%      | 5.50  | 26   |
| FA16    | Direktupload           | 5      | 4       | 11   | 4.82%    | 4       | 1.12%       | 6      | 2.05%      | 3.67  | 36   |
| FA17    | Schnittstelle          | 9      | 9       | 20   | 8.77%    | 6       | 1.68%       | 1      | 0.34%      | 40.00 | 1    |
| FA18    | Entrypoint             | 3      | 1       | 6    | 2.63%    | 2       | 0.56%       | 3      | 1.03%      | 4.00  | 30   |
| FA20    | Bildanzeige            | 5      | 2       | 9    | 3.95%    | 7       | 1.96%       | 2      | 0.68%      | 9.00  | 21   |
| FA21    | Pflichtfelder          | 8      | 8       | 18   | 7.89%    | 3       | 0.84%       | 2      | 0.68%      | 18.00 | 8    |
| FA22    | Fallzuteilung          | 7      | 8       | 17   | 7.46%    | 6       | 1.68%       | 2      | 0.68%      | 17.00 | 10   |
| FA23    | Fehlermeldung          | 4      | 7       | 13   | 5.70%    | 2       | 0.56%       | 5      | 1.71%      | 5.20  | 27   |
| FA24    | Filter                 | 6      | 8       | 16   | 7.02%    | 4       | 1.12%       | 2      | 0.68%      | 16.00 | 11   |
| FA25    | Mehrfachmetadaten      | 7      | 6       | 15   | 6.58%    | 3       | 0.84%       | 2      | 0.68%      | 15.00 | 13   |
| FA26    | Feldfilter             | 7      | 7       | 16   | 7.02%    | 6       | 1.68%       | 3      | 1.03%      | 10.67 | 17   |
| FA27    | Aktualisierung         | 6      | 4       | 12   | 5.26%    | 4       | 1.12%       | 8      | 2.74%      | 3.00  | 39   |
| FA30    | Verbindungsqualität    | 6      | 3       | 11   | 4.82%    | 2       | 0.56%       | 6      | 2.05%      | 3.67  | 36   |
| FA31    | Filmupload             | 6      | 4       | 12   | 5.26%    | 6       | 1.68%       | 4      | 1.37%      | 6.00  | 25   |
| FA33    | Bildentgegennahme      | 6      | 4       | 12   | 5.26%    | 5       | 1.40%       | 5      | 1.71%      | 4.80  | 28   |
| FA34    | Massenbildupload       | 6      | 6       | 14   | 6.14%    | 5       | 1.40%       | 2      | 0.68%      | 14.00 | 14   |
| FA36    | Bildschutz             | 6      | 4       | 12   | 5.26%    | 7       | 1.96%       | 7      | 2.40%      | 3.43  | 38   |
| FA37    | Startparameter         | 7      | 7       | 16   | 7.02%    | 6       | 1.68%       | 8      | 2.74%      | 4.00  | 30   |
| FA38    | Browserupload          | 7      | 8       | 17   | 7.46%    | 7       | 1.96%       | 5      | 1.71%      | 6.80  | 24   |
| NF2     | Publisher              | 5      | 5       | 12   | 5.26%    | 6       | 1.68%       | 8      | 2.74%      | 3.00  | 39   |
| NF5     | Offline                | 3      | 5       | 10   | 4.39%    | 8       | 2.23%       | 5      | 1.71%      | 4.00  | 30   |
| NF6     | Verschlüsselung        | 8      | 9       | 19   | 8.33%    | 1       | 0.28%       | 1      | 0.34%      | 38.00 | 2    |
| NF8     | Zentralkonfig          | 6      | 8       | 16   | 7.02%    | 5       | 1.40%       | 7      | 2.40%      | 4.57  | 29   |
| NF11    | Version                | 5      | 4       | 11   | 4.82%    | 2       | 0.56%       | 1      | 0.34%      | 22.00 | 5    |
| NF12    | Wartezeiten            | 7      | 7       | 16   | 7.02%    | 2       | 0.56%       | 3      | 1.03%      | 10.67 | 17   |
| NF13    | Abbruch                | 3      | 5       | 10   | 4.39%    | 5       | 1.40%       | 5      | 1.71%      | 4.00  | 30   |
| NF14    | Fallanzahl             | 6      | 4       | 12   | 5.26%    | 4       | 1.12%       | 6      | 2.05%      | 4.00  | 30   |
| NF15    | Hintergrund            | 7      | 5       | 14   | 6.14%    | 6       | 1.68%       | 7      | 2.40%      | 4.00  | 30   |
| NF17    | Verbindungsunterbrüche | 9      | 7       | 18   | 7.89%    | 6       | 1.68%       | 5      | 1.71%      | 7.20  | 23   |
| NF18    | Fehlerverminderung     | 8      | 6       | 16   | 7.02%    | 6       | 1.68%       | 3      | 1.03%      | 10.67 | 17   |
| NF20    | Softwarepaket          | 7      | 9       | 18   | 7.89%    | 2       | 0.56%       | 2      | 0.68%      | 18.00 | 8    |
| NF21    | Sprache                | 8      | 6       | 16   | 7.02%    | 1       | 0.28%       | 1      | 0.34%      | 32.00 | 4    |
| Summe   |                        |        | 228     |      |          | 179     |             | 146    |            |       |      |




### Initiale Priorität der Anforderungen

Dies ist die initiale Prioritätenliste der Anforderungen. Diese wird später im iterativen Prozess anhand von Kundenwünschen, Designentscheiden und weiteren nicht planbaren Elementen angepasst. Anhand dieser Prioritätenliste wird die Reihenfolge im Backlog erstellt.

| Rang | Id   | Anforderung            |
|------|------|------------------------|
| 1    | FA17 | Schnittstelle          |
| 2    | FA10 | Lizenz                 |
| 2    | NF6  | Verschlüsselung        |
| 4    | NF21 | Sprache                |
| 5    | NF11 | Version                |
| 6    | FA1  | Bildupload             |
| 7    | FA6  | Fallauswahl            |
| 8    | FA21 | Pflichtfelder          |
| 8    | NF20 | Softwarepaket          |
| 10   | FA22 | Fallzuteilung          |
| 11   | FA8  | Falldaten              |
| 11   | FA24 | Filter                 |
| 13   | FA25 | Mehrfachmetadaten      |
| 14   | FA34 | Massenbildupload       |
| 15   | FA5  | Metadaten              |
| 16   | FA7  | Fallerstellung         |
| 17   | FA26 | Feldfilter             |
| 17   | NF12 | Wartezeiten            |
| 17   | NF18 | Fehlerverminderung     |
| 20   | FA9  | Strukturtiefe          |
| 21   | FA20 | Bildanzeige            |
| 22   | FA2  | Kameraupload           |
| 23   | NF17 | Verbindungsunterbrüche |
| 24   | FA38 | Browserupload          |
| 25   | FA31 | Filmupload             |
| 26   | FA15 | Browser                |
| 27   | FA23 | Fehlermeldung          |
| 28   | FA33 | Bildentgegennahme      |
| 29   | NF8  | Zentralkonfig          |
| 30   | FA18 | Entrypoint             |
| 30   | FA37 | Startparameter         |
| 30   | NF5  | Offline                |
| 30   | NF13 | Abbruch                |
| 30   | NF14 | Fallanzahl             |
| 30   | NF15 | Hintergrund            |
| 36   | FA16 | Direktupload           |
| 36   | FA30 | Verbindungsqualität    |
| 38   | FA36 | Bildschutz             |
| 39   | FA27 | Aktualisierung         |
| 39   | NF2  | Publisher              |
