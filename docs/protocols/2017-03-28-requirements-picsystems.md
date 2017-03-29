# Kurzprotokoll Abstimmungs-Meeting mit PIC Systems

Dienstag, 29.03.2017 16:00-18:30 bei PIC Systems AG, Glattbrugg

## Teilnehmer
PIC Systems: Marcel Bachmann, Michael Bachmann  
IMS Mobile Client Entwickler: Michael Leu, Sandro Zbinden  

## Traktanden
- Referenzgerät iOS
- Besprechen Feedback von Kunden und PIC Systems zu den Anforderungen in der [Spezifikation IMS Mobile Client](https://github.com/IMSmobile/app/blob/master/docs/spec.md)
- Besprechen der Antworten im [Fragenkatalog](https://github.com/IMSmobile/app/blob/master/docs/questions.md)

## Protokoll

### Referenzgerät iOS (16:00-16:10)
- IMS Mobile Client Entwickler haben kein modernes iPhone zur Hand. Gewünscht wäre eine Leihgabe eines iPhone 6 für die Dauer des Projekts. → Marcel klärt es PIC System intern ab. 

### Diskussion Feedback funktionale Anforderungen (16:10-17:25)

- FA1 (Bildupload): Testbarkeit bei "muss 100 Bilder" ist schwer sicherzustellen. → FA1 auf "muss 20 Bilder" und neue Anforderung mit "soll 100 Bilder" erstellen.

- Ergänzung zu FA2 (Kameraupload): es sind drei Anforderungen enthalten
  - In einer Galerie während man ein einzelnes Bild betrachtet soll dieses Bild ausgewählt werden können. → Ist ein Interaktions-Detail welches iterativ mit PIC Systems entwickelt wird, kommt deshalb nicht in die Anforderungen.
  - Direkt aufgenommenes Bild darf nicht in der Standard-Galerie des Smartphones auftauchen. → Als neue muss Anforderung aufnehmen.
  - Direkt aufgenommene Bilder müssen verschlüsselt abgespeichert werden. → Als neue Anforderung "Direkt aufgenommene Bilder können nicht einfach zugänglich sein" aufnehmen.
  
- FA6 (Fallauswahl): Keine Anforderung von PIC Systems. → Die Anforderung bleibt damit IMS Mobile Client weiterhin generisch ist.
- Ergänzung zu FA6 (Fallauswahl): Aufruf des IMS Mobile Client von anderen Apps ist Voraussetzung für den Einsatz bei Polizeieinheiten. → Als neue Anforderung "Navigation zu einem bestimmten Tabellen-Entry im IMS Mobile Client soll mit einem bestimmten Start-Parameter möglich sein" aufnehmen und hoch priorisieren.

- FA15 (Browser): Wird für den internen Einsatz bei Kunden gewünscht. Die vollständige Funktionalität kann einen grossen Aufwand bedeuten. → Neue zusätzliche Anforderung "Ein Upload (FA1) soll auch mit einem Browser möglich sein" aufnehmen.

- FA16 (Direktupload): Daten dürfen im IMS Mobile Client gespeichert werden. → PIC Systems als Quelle streichen.

- FA24 (Filter): Für PIC Systems unnötig weil ihre Kunden aus anderen Apps direkt zum Fall navigieren. → Anforderung bleibt weil notwendig für Imagic.

- FA25 (Mehrfachmetadaten): Eine Formularsteuerung wird nicht über die REST API angeboten. Einzelne Felder für alle zu übernehmen ist keine Anforderunge. Umsetzung in Form "für alle Übernehmen" bei erster Metadateneingabe wäre akzeptabel.

- FA26 (Feldfilter): PIC Systems hat etwas anderes verstanden. → Anforderung präzisieren mit "zur Eingabe von Metadaten anzeigen".

### Diskussion Feedback neue funktionale Anforderungen (17:25-17:45)

- FA28 (Publisher Link): Funktionalität wird von REST API nicht angeboten. → Anforderung wird nicht aufgenommen.

- FA29 (Uploadbegrenzung): Grund ist um die Datenabos zu schonen. → Ist Aufgabe eines Mobile Device Management, Anforderung wird nicht aufgenommen.

- FA30 (Verbindungsqualität): Die minimale Verbindungsqualität bei der ein Upload durchgeführt wird soll konfigurierbar sein. → Als neue soll Anforderung aufnehmen.

- FA31 (Filmupload): Aufnahme und Upload von Filmen soll möglich sein. → Als neue Anforderung aufnehmen.

- FA32 (Upload-Limit von Bildern pro Fall): Motivation dahinter ist dass nur die guten Bilder ins IMS hochgeladen werden. Es sollte eher mit Schulung statt mit technischen Mitteln die Bildqualität sichergestellt werden. → PIC Systems klärt alternative Lösungswege ab.

- FA33 (Übergabe von Bildern aus dritt App): Anforderung ist ok. → Anforderung aufnehmen.

### Diskussion Feedback nicht funktionale Anforderungen (17:45-18:10)

- NF1 (Design): Es kann nicht garantiert werden dass wir sämtliche Design Guidelines einhalten. → Anforderung als soll belassen.

- Ergänzung zu NF2 (IPA File): Die Verteilung mittels Mobile Device Management kann nicht garantiert werden. → Neue Anforderung "muss fertiges IPA und APK abliefern" aufnehmen.

- NF5 (Offline): Erwartung ist dass gesamte Liste der Fälle im IMS Mobile Client gecached wird. → Anforderung als kann wieder aufnehmen.

- NF6 (Verschlüsselung): Muss statt soll. → Anforderung anpassen.

- NF8 (Zentralkonfig): Weil wir kein Mobile Device Management zu Testzwecken besitzen ist ein _muss_ nicht realistisch. → Anforderung auf _soll_ anpassen.

- PIC Systems wird im Glossar nicht erwähnt. → PIC Systems in's Glossar aufnehmen.

### Diskussion Antworten im Fragenkatalog (18:10-18:15)

- Fallerstellungs-Prozess: der Fokus soll liegen auf
  - Den Aufruf aus anderen Apps bei existierenden Fällen
  - Die Möglichkeit einen "Container" zu erstellen um die Bilder temporär dorthin hochzuladen

### Nächste Schritte (18:15-18:30)

- Anforderungen sollen abgenommen werden. → Finale Version der Anforderungen an PIC Systems senden.
- Termin für ersten Sprint Review. → Termin fixiert.
