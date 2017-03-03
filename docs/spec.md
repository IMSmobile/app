# Spezifikation ims Mobile Client

## Einleitung
Mit dem ims Mobile Client möchten wir den Kunden von Imagic ermöglichen über iOS und Android Smartphones digitale Medien (Bilder, Audio, Video, Texte) ins digitalen Bildmanagement-System Imagic ims abzuspeichern.

Als Schnittstelle soll die von Imagic ims Server bereitgestellte REST-API verwendet werden.

## Stakeholder


## Anforderungskatalog
### Funktional
ID   | Name | Beschreibung | Priorität | Quelle      | Status
---- | ---- | ------------ | --------- | ----------- | ------
FA1  | Bildupload | Der Client muss bis zu 20 :warning: Bilder aus der Galerie in das Imagic ims speichern können. | muss | PIC Systems | Maximalanzahl noch abzuklären
FA2  | Kameraupload | Der Client muss ein Bild direkt von der Kamera des Smartphones in das Imagic ims speichern können.
FA3  | Bildformat | Der Client muss die Bildformate PNG und JPEG in das Imagic ims speichern können. 
FA4  | Metadaten | Der Client muss das Bild inkl. EXIF-Daten ins das Imagic ims speichern können.
FA5  | Bildbeschreibung | Nach Auswahl der Bilder muss der Client dem Benutzer die Möglichkeit bieten eine Beschreibung dazu zu erfassen
FA6  | Fallauswahl | Der Client muss dem Benutzer die Möglichkeit bieten einen bestehenden Fall auszwählen | | PIC Systems
FA7  | Fallerstellung | Der Client muss dem Benutzer die Möglichkeit bieten einen neuen Fall zu erstellen | | PIC Systems
FA8  | Falldaten | Bei der Erstellung eines neuen Falles soll der Client dem Benutzer nur die erforderlichen Felder für die Fallerstellung anzeigen. | | PIC Systems | 

### Nicht-Funktional
ID   | Name | Beschreibung | Priorität | Quelle      | Status
---- | ---- | ------------ | --------- | ----------- | ------


## Glossar

Begriff | Bedeutung
------- | ---------
Client | ims Mobile Client, die Software welche wir entwickeln
Imagic | Imagic Bildverarbeitung AG, Hersteller des Imagic ims
Imagic ims | Bildmanagement-System zur Erfassung, Bearbeitung, Speicherung, Visualisierung und Präsentation von digitalen Bildern, Filmen und allgemeinen Dokumenten für medizinische, industrielle und Verwaltungs-Institutionen.
muss | Zwingende Anforderung, mandatory nach IEEE Std 830-1998
soll | Gewünschte Anforderung, optional nach IEEE Std 830-1998
kann | Optionale Anforderung, nice-to-have nach IEEE Std 830-1998
Fall | Begriff der Polizei für eine Gruppiereinheit im Imagic ims
