# Spezifikation IMS Mobile Client

## Einleitung
Mit dem IMS Mobile Client möchten wir den Kunden von Imagic ermöglichen über iOS und Android Smartphones digitale Medien (Bilder, Audio, Video, Texte) ins digitalen Bildmanagement-System Imagic IMS abzuspeichern.

Als Schnittstelle soll die von Imagic IMS Server bereitgestellte REST-API verwendet werden.

## Vision
Siehe [Vision](../README.md#vision).

## Stakeholder
Siehe [Stakeholder](../README.md#stakeholder).

## Anforderungskatalog
### Funktional
ID   | Name | Beschreibung | Priorität | Quelle      | Status
---- | ---- | ------------ | --------- | ----------- | ------
FA1  | Bildupload | Der Client muss bis zu 20 Bilder aus der Galerie in das Imagic IMS speichern können. | | PIC Systems | 
FA2  | Kameraupload | Der Client muss ein Bild direkt von der Kamera des Smartphones in das Imagic IMS speichern können. | | PIC Systems |
FA3  | Bildformat | Der Client muss die Bildformate PNG und JPEG in das Imagic IMS speichern können. | | PIC Systems |
FA4  | Bildattribute | Der Client muss das Bild inkl. EXIF-Daten ins das Imagic IMS speichern können. | | PIC Systems |
FA5  | Metadaten | Der Client muss dem Benutzer vor dem Speichern eines Bildes die Möglichkeit bieten Metadaten pro Bild zu erfassen. | | PIC Systems |
FA6  | Fallauswahl | Der Client muss dem Benutzer die Möglichkeit bieten einen bestehenden Fall auszwählen. | | PIC Systems |
FA7  | Fallerstellung | Der Client muss dem Benutzer die Möglichkeit bieten einen neuen Fall zu erstellen. | | PIC Systems |
FA8  | Falldaten | Bei der Erstellung eines neuen Falles soll der Client dem Benutzer die Möglichkeit bieten Metadaten für den neuen Fall zu erfassen. | | PIC Systems | 
FA9  | Strukturtiefe | Eine Fallauswahl oder Fallerstellung muss in einer bis zu 5 Ebenen tiefen Struktur möglich sein. | | Imagic | 
FA10 | Lizenz | Der Client muss sich an die Benutzerbegrenzung der REST-API gemäss Imagic IMS Lizenzmodell halten. | | Imagic | 
FA11 | iOS-muss | Der Client muss auf einem iPhone 6 mit iOS 10 funktionsfähig sein. | | Imagic, PIC Systems |
FA12 | iOS-soll | Der Client soll auf iPhones 5, 6 und 7 mit iOS 9 oder höher funktionsfähig sein. | | Imagic, PIC Systems |
FA13 | Android-muss | Der Client muss auf einem Samsung Galaxy S7 mit Android 6.0 API Level 23 (Marshmallow) funktionsfähig sein. | | Imagic |
FA14 | Android-soll | Der Client soll auf Smartphones mit Android 5.1 API Level 22 (Lollipop) oder höher funktionsfähig sein. | | Imagic |
FA15 | Browser | Der Client kann auch mit einem modernen Browser (Chrome: aktuelle Version, Firefox: aktuelle Version, Edge 14 und Internet Explorer 11) benutzt werden. | | Imagic, PIC Systems |
FA16 | Direktupload | Der Client kann so eingestellt werden dass keine Mediendaten auf dem Gerät zwischengespeichert werden | | Imagic | 
FA17 | Schnittstelle | Der Client muss mit dem Imagic IMS über die REST-API kommunizieren. | | Imagic IMS |
FA18 | Entrypoint | Der Client soll über den REST-API Eingangspunkt die Ressourcen der API ansprechen. | | Imagic IMS |
~~FA19~~ | ~~Bildlöschung~~ | ~~Hochgeladene Bilder können wieder gelöscht werden.~~ | | | Imagic: nicht gewünscht. PIC Systems: nicht gewünscht
FA20 | Bildanzeige | Bilder aus dem Imagic IMS können im Client angezeigt werden. | | | Imagic: kann man später machen. PIC Systems: nicht benötigt.
FA21 | Pflichtfelder | Im Client müssen die im Imagic IMS definierten Pflichtfelder ausgefüllt werden bevor das Bild ins Imagic IMS gespeichert werden kann. | | Imagic IMS |
FA22 | Fallzuteilung | Der Client muss das Bild oder die Bilder zu einem Fall zuteilen können. | | Imagic, PIC Systems | 
FA23 | Fehlermeldung | Der Client soll dem Benutzer Fehler bei Berechtigungen und Lizenz anzeigen. | | Imagic |
FA24 | Filter | Der Client muss dem Benutzer eine Möglichkeit bieten nach Fällen zu filtern. | | Imagic, PIC Systems | 
FA25 | Mehrfachmetadaten | Der Client kann dem Benutzer die Möglichkeit bieten Metadaten zu erfassen welche zu sämtlichen ausgewählten Bildern gespeichert werden. | | PIC Systems |
FA26 | Feldfilter | Der Client soll dem Benutzer nur eine vom Benutzer definierte Auswahl der möglichen Felder zur Eingabe von Metadaten anzeigen. | | PIC Systems |  
FA27 | Aktualisierung | Software-Features oder Fehlerbehebungen im Client können automatisch aktualisiert werden. | |Support Abteilung |
~~FA28~~ | ~~Publisherlink~~ | ~~Nach fertigem Upload der Bilder soll es möglich sein, einen Publisher Link zu erhalten, welcher dann mittels "Weiterleiten" an andere (dritt) Apps übermittelt werden können.~~ | | PIC Systems | Funktionaltät wird nicht von der REST API angeboten, kann deshalb nicht realisiert werden. 
~~FA29~~ | ~~Uploadbegrenzung~~ | ~~Es muss möglich sein, eine Begrenzung des Upload-Datenvolumens pro Monat zu konfigurieren.~~ | | PIC Systems | Wird als Aufgabe eines Mobile Device Management angesehen.
FA30 | Verbindungsqualität | Die erlaubte Verbindungsqualität (3G/4G/WLAN) ab welcher ein Upload von Bildern gestattet ist soll konfigurierbar sein. | | PIC Systems | 
FA31 | Filmupload | Aufnahme und Upload von Filmen sollte möglich sein. | | PIC Systems |
~~FA32~~ | ~~Uploadbegrenzung~~ | ~~Es kann möglich sein, eine Limite (Begrenzung) der Anzahl Bilder zu konfigurieren, die maximal pro Fall und pro Benutzer hochgeladen werden können.~~ | | PIC Systems | In Abklärung bei PIC Systems.
FA33 | Bildentgegennahme | Es kann möglich sein, Bilder aus einer dritt App an den Mobile Client zu übermitteln, welche dann zugeteilt und upgeloadet werden können. | | PIC Systems |
FA34 | Massenbildupload | Der Client soll bis zu 100 Bilder aus der Galerie in das Imagic IMS speichern können. | | PIC Systems | 
FA35 | Galeriefrei | Es muss sichergestellt sein dass ein im Client direkt von der Kamera des Smartphones aufgenommenes Bild nicht in der Galerie des Smartphones gespeichert wird. | | PIC Systems |
FA36 | Bildschutz | Im Client direkt von der Kamera des Smartphones aufgenommene Bilder können nicht auf triviale Weise von Drittpersonen oder anderen Apps eingesehen werden. | | PIC Systems |
FA37 | Startparameter | Navigation zu einem bestimmten Tabellen-Entry im IMS Mobile Client soll mit einem bestimmten Start-Parameter möglich sein. | _hoch_ | PIC Systems | 
FA38 | Browserupload | Ein Bildupload (FA1) soll auch mit einem modernen Browser (Chrome: aktuelle Version, Firefox: aktuelle Version, Edge 14 und Internet Explorer 11) möglich sein. | | PIC Systems | 


### Nicht-Funktional
ID   | Name | Beschreibung | Priorität | Quelle      | Status
---- | ---- | ------------ | --------- | ----------- | ------
NF1  | Design | Die Gestaltung des Clients soll die Design-Guidelines von Android und iOS erfüllen. | | PIC Systems |
NF2  | Publisher | Der Client soll von einem Privat- oder Firmenkonto in den Store publiziert werden können. | | Google und Apple | 
NF3  | Kompabilität | Der Client muss mit REST-API Version 16Q2 bis und mit 17Q1 funktionieren. | | PIC Systems |
NF4  | Selbsterklärend | Der Client soll durch einen Benutzer welcher mit der Bedienung von Imagic IMS vertraut ist ohne Schulung bedient werden können. | | |
NF5  | Offline | Der Client kann auch ohne Netzwerkverbindung Bilder mit Metadaten erfassen. | | PIC Systems |
NF6  | Verschlüsselung | Der Client muss verschlüsselt mit der REST-API kommunizieren können. | | PIC Systems |
~~NF7~~  | ~~Deployment~~ | ~~Der Client kann durch ein Mobile Device Management von zentraler Stelle aus durch den IT-Verantwortlichen installiert, aktualisiert und deinstalliert werden.~~ | | | Nicht durch uns beeinflussbar
NF8  | Zentralkonfig | Der Client soll durch ein Mobile Device Managment z.B. mit Configuration Profile von zentraler Stelle aus durch den IT-Verantwortlichen konfiguriert werden. | | PIC Systems |
~~NF9~~  | ~~PIN-Code~~ | ~~Der Client kann nur genutzt werden wenn das Smartphone mit einer Sicherheits-Sperre (PIN-Code, Fingerabdruck etc) gegen Nutzung durch Drittpersonen geschützt ist.~~ | | | Wird als Aufgabe eines Mobile Device Management angesehen.
NF10 | Opensource | Der Quellcode des Clients soll frei zugänglich und von verschiedenen Firmen nutzbar sein. | | Imagic, PIC Systems |
NF11 | Version | Im Client soll die Version ersichtlich sein. | | Support-Abteilung |
NF12 | Wartezeiten | Der Client soll den Benutzer über Wartezeiten beim Upload oder API-Abfragen informieren. | | Benutzer |
NF13 | Abbruch | Bilderupload und Änderung der Metadaten können jederzeit abgebrochen werden. | | Benutzer |
NF14 | Fallanzahl | Der Client soll mit einem Imagic IMS funktionieren welches 1'000'000 Fälle beinhaltet. | | Imagic, PIC Systems |
NF15 | Hintergrund | Der Client soll im Hintergrund ein Bild in das Imagic IMS speichern können. | | Benutzer | 
NF16 | Wiederverwendbarkeit | Teile des Quellcodes des Clients soll wiederverwendbar sein für einen Browser-basierten Client. | | Imagic, PIC Systems |
NF17 | Verbindungsunterbrüche | Nach einem Verbindungsunterbrüch zum Imagic IMS soll die Übermittlung erneut möglich sein ohne dass der Benutzer sämtliche Angaben erneut eingeben muss. | | PIC Systems | 
NF18 | Fehlerverminderung | Wiederholte Regressionen sollen nach Behebung vermieden werden. | | Support-Abteilung |
NF19 | Codeübergabe | IMS Entwickler können nach zwei Arbeitstagen kleinere Fehler selbständig beheben. | | IMS Entwickler |
NF20 | Softwarepaket | Der Client muss als IPA und APK erzeugt werden können. | | PIC Systems |


## Glossar

Siehe [Glossar](glossary.md).
