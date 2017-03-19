# Kurzprotokoll Review Meeting mit PIC Systems

Freitag, 17.03.2017 13:30-15:10 bei PIC Systems AG, Glattbrugg

## Teilnehmer
PIC Systems: Marcel Bachmann  
IMS Mobile Client Entwickler: Sandro Zbinden, Niklaus Tschirky, Michael Leu

## Traktanden
- Feedback einholen zum [Fragenkatalog@782d85d](https://github.com/IMSmobile/app/blob/782d85d3ab4db55f1c2d2db6a96ef493f28da478/docs/questions.md)
- Feedback einholen zu Stakeholders und Anforderungen in der [Spezifikation IMS Mobile Clent@026bc68](https://github.com/IMSmobile/app/blob/026bc682222978aa17ae8f9c45229582690e1175/docs/spec.md)

## Protokoll

### Diskussion Fragenkatalog (13:35-13:40)
- Fragenkatalog sollte auch in's Repository. → Issue [#63](https://github.com/IMSmobile/app/issues/63) erstellt
- Netzwerkverbindung der Geräte zur IMS REST-Schnittstelle sind "out-of-scope" und Sache des Kunden.

### Vorstellung und Diskussion des Stakeholder-Diagramms (13:40-13:47)
- Sicherheitsbeuftragter könnte ein weiterer Stakeholder beim Kunden sein. → Als Frage im Fragenkatalog aufnehmen

### Vorstellung und Diskussion funktionale Anforderungen (13:47-14:35)
- FA1: Anzahl von 20 sind vorerst i.O. für PIC Systems, Feedback von Kunden wird noch eingeholt. → Status updaten
- FA5: Unklar ob für einzelnes Bild oder mehrere Bilder. → Präzisieren und neue Anforderung für mehrere Bilder erstellen
- Neue Anforderung "Es soll möglich sein dass im Client nur die vom Kunden gewünschten Felder angezeigt werden". → Anforderung erfassen
- FA8: Präzisierung auf nur "Metadaten erfassen für den neuen Fall". → Anforderung präzisieren
- FA11-FA14: keine Vorgaben von PIC Systems.
- FA19: Löschung ist nicht gewünscht von PIC Systems. → Status updaten
- FA20: Kann später gemacht werden. → Status updaten
- FA21: Auch eine Anforderung von PIC Systems. → Quelle updaten
- FA24: Aus Sicht PIC Systems auch ein "muss".

### Vorstellung und Diskussion nicht-funktionale Anforderungen (14:35-15:00)
- NF2: Appstore sollte generischer heissen. → auf Store umbenennen und im Glossar erwähnen
- NF3: Version nicht genau angegeben. → Präzisieren auf 16Q2 bis und mit 17Q1
- NF5: Keine Anforderungen für PIC Systems, macht keinen Sinn. → Status updaten und Anforderung streichen
- Neue Anforderung "Auch bei Verbindugsunterbrüchen soll ein Bildupload möglich sein ohne alle Angaben neu eingeben zu müssen". → Anforderung erfassen
- NF7: Ist nicht durch uns beeinflussbar. → Status updaten und Anforderung streichen
- NF15: Quelle ist der Benutzer selber. → Quelle anpassen

### Diverses (15:00-15:10)
- Spezifikation und Fragenkatalog als PDF per Email gewünscht bis Montag. → Issue [#62](https://github.com/IMSmobile/app/issues/62) erstellt
- Anfrage für Demomaterial für Kongress. → Issue [#61](https://github.com/IMSmobile/app/issues/61) erstellt
