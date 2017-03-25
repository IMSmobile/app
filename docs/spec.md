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
FA1  | Bildupload | Der Client muss bis zu 20 :warning:#39 Bilder aus der Galerie in das Imagic IMS speichern können. | | PIC Systems | Maximalanzahl für PIC Systems ok, noch bei Kunden abzuklären
FA2  | Kameraupload | Der Client muss ein Bild direkt von der Kamera des Smartphones in das Imagic IMS speichern können. | | PIC Systems |
FA3  | Bildformat | Der Client muss die Bildformate PNG und JPEG in das Imagic IMS speichern können. | | PIC Systems |
FA4  | Bildattribute | Der Client muss das Bild inkl. EXIF-Daten ins das Imagic IMS speichern können. | | PIC Systems |
FA5  | Metadaten | Der Client muss dem Benutzer vor dem Speichern eines Bildes die Möglichkeit bieten Metadaten pro Bild zu erfassen | | PIC Systems |
FA6  | Fallauswahl | Der Client muss dem Benutzer die Möglichkeit bieten einen bestehenden Fall auszwählen | | PIC Systems |
FA7  | Fallerstellung | Der Client muss dem Benutzer die Möglichkeit bieten einen neuen Fall zu erstellen | | PIC Systems |
FA8  | Falldaten | Bei der Erstellung eines neuen Falles soll der Client dem Benutzer die Möglichkeit bieten Metadaten für den neuen Fall zu erfassen. | | PIC Systems | 
FA9  | Strukturtiefe | Eine Fallauswahl oder Fallerstellung muss in einer bis zu 5 Ebenen tiefen Struktur möglich sein. | | Imagic | 
FA10 | Lizenz | Der Client muss sich an die Benutzerbegrenzung der REST-API gemäss Imagic IMS Lizenzmodell halten. | | Imagic | 
FA11 | iOS-muss | Der Client muss auf iPhone *tbd* mit iOS 10 :warning:#40 funktionsfähig sein. | | | Referenzgerät definieren
FA12 | iOS-soll | Der Client soll auf iPhones mit iOS 8 :warning:#40 oder höher funktionsfähig sein. | | |
FA13 | Android-muss | Der Client muss auf Smartphone *tbd* mit Android *tbd* API Level *tbd* :warning:#40 funktionsfähig sein. | | | Referenzgerät definieren
FA14 | Android-soll | Der Client soll auf Smartphones mit Android 5.1 API Level 22 :warning:#40 oder höher funktionsfähig sein. | | |
FA15 | Browser | Der Client kann auch mit einem modernen :warning:#38 Browser benutzt werden. | | Imagic | Modern genauer definieren
FA16 | Direktupload | Der Client kann so eingestellt werden dass keine Mediendaten auf dem Gerät zwischengespeichert werden | | Imagic, PIC Systems | 
FA17 | Schnittstelle | Der Client muss mit dem Imagic IMS über die REST-API kommunizieren. | | Imagic IMS |
FA18 | Entrypoint | Der Client soll über den REST-API Eingangspunkt die Ressourcen der API ansprechen. | | Imagic IMS |
~~FA19~~ | ~~Bildlöschung~~ | ~~Hochgeladene Bilder können wieder gelöscht werden.~~ | | | Imagic: nicht gewünscht. PIC Systems: nicht gewünscht
FA20 | Bildanzeige | Bilder aus dem Imagic IMS können im Client angezeigt werden. | | | Imagic: kann man später machen. PIC Systems: nicht benötigt.
FA21 | Pflichtfelder | Im Client müssen die im Imagic IMS definierten Pflichtfelder ausgefüllt werden bevor das Bild ins Imagic IMS gespeichert werden kann | | Imagic IMS, PIC Systems |
FA22 | Fallzuteilung | Der Client muss das Bild oder die Bilder zu einem Fall zuteilen können | | Imagic, PIC Systems | 
FA23 | Fehlermeldung | Der Client soll dem Benutzer Fehler bei Berechtigungen und Lizenz anzeigen | | Imagic |
FA24 | Filter | Der Client muss dem Benutzer eine Möglichkeit bieten nach Fällen zu filtern | | Imagic, PIC Systems | 
FA25 | Mehrfachmetadaten | Der Client kann dem Benutzer die Möglichkeit bieten Metadaten zu erfassen welche zu sämtlichen ausgewählten Bildern gespeichert werden | | PIC Systems |
FA26 | Feldfilter | Der Client soll dem Benutzer nur eine vom Benutzer definierte Auswahl der möglichen Felder anzeigen | | PIC Systems |  
FA27 | Aktualisierung | Software-Features oder Fehlerbehebungen im Client können automatisch aktualisiert werden. | |Support Abteilung |

### Nicht-Funktional
ID   | Name | Beschreibung | Priorität | Quelle      | Status
---- | ---- | ------------ | --------- | ----------- | ------
NF1  | Design | Die Gestaltung des Clients soll die Design-Guidelines von Android und iOS erfüllen | | |
NF2  | Publisher | Der Client soll von einem Privat- oder Firmenkonto in den Store publiziert werden können. | | Google und Apple | 
NF3  | Kompabilität | Der Client muss mit REST-API Version 16Q2 bis und mit 17Q1 funktionieren | | |
NF4  | Selbsterklärend | Der Client soll durch einen Benutzer welcher mit der Bedienung von Imagic IMS vertraut ist ohne Schulung bedient werden können. | | |
~~NF5~~  | ~~Offline~~ | ~~Der Client kann auch ohne Netzwerkverbindung Bilder mit Metadaten erfassen.~~ | | | Wird weder von Imagic noch PIC Systems benötigt
NF6  | Verschlüsselung | Der Client soll verschlüsselt mit der REST-API kommunizieren. | | |
~~NF7~~  | ~~Deployment~~ | ~~Der Client kann durch ein Mobile Device Management von zentraler Stelle aus durch den IT-Verantwortlichen installiert, aktualisiert und deinstalliert werden.~~ | | | Nicht durch uns beeinflussbar
NF8  | Zentralkonfig | Der Client kann durch ein Mobile Device Managment z.B. mit Configuration Profile von zentraler Stelle aus durch den IT-Verantwortlichen konfiguriert werden. | | |
NF9  | PIN-Code | Der Client kann nur genutzt werden wenn das Smartphone mit einer Sicherheits-Sperre (PIN-Code, Fingerabdruck etc) gegen Nutzung durch Drittpersonen geschützt ist. | | |
NF10 | Opensource | Der Quellcode des Clients soll frei zugänglich und von verschiedenen Firmen nutzbar sein | | |
NF11 | Version | Im Client soll die Version ersichtlich sein | | Support-Abteilung |
NF12 | Wartezeiten | Der Client soll den Benutzer über Wartezeiten beim Upload oder API-Abfragen informieren | | Benutzer |
NF13 | Abbruch | Bilderupload und Änderung der Metadaten können jederzeit abgebrochen werden. || Benutzer |
NF14 | Fallanzahl | Der Client soll mit einem Imagic IMS funktionieren welches 1'000'000 Fälle beinhaltet. | | Imagic |
NF15 | Hintergrund | Der Client soll im Hintergrund ein Bild in das Imagic IMS speichern können. | | Benutzer | 
NF16 | Wiederverwendbarkeit | Teile des Quellcodes des Clients soll wiederverwendbar sein für einen Browser-basierten Client | | Imagic |
NF17 | Verbindungsunterbrüche | Nach einem Verbindungsunterbrüch zum Imagic IMS soll die Übermittlung erneut möglich sein ohne dass der Benutzer sämtliche Angaben erneut eingeben muss | | PIC Systems | 
NF18 | Fehlerverminderung | Wiederholte Regressionen sollen nach Behebung vermieden werden. | | Support-Abteilung |
NF19 | Codeübergabe | IMS Entwickler können nach zwei Arbeitstagen kleinere Fehler selbständig beheben. | | IMS Entwickler |

## Glossar

Siehe [Glossar](glossary.md).

## Quellen
Icons von https://icons8.com/
