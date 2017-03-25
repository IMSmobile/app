# Software Architecture Document

Beschreibt die Archtiektur der IMS Mobile App.


## Imagic Daten Model
Um im IMS Daten via Rest API zu speichern müssen wir uns mit dem Datenmodell der Firma Imagic vertraut machen.
Da Imagic Software für verschiedene Kundensegement programmiert ist das Datenmodell sehr abstrakt.

![IMS Datenmodell](Ims_Datenmodell.png)

Innerhalb einer IMS Datenbank können verschiedene **Archive** installiert sein. Jedes dieser Archive kann unterschiedliche Tabellen (**Table**) mit wieder unterschiedlichen Felder (**Field**) habe. Die Tabellen sind hierarchisch in einer 1:n Struktuer aufgebaut. Die letzte Kind Tabelle ist jeweils die Bilder Tabelle. Auf dieser Ebene werden alle Mediendaten gespeichert und sie ist zwingend. Alle Tabellen besitzen zwingend neben IMS spefizischen Felder ein vom Kunden definitertes IdentifierField. Dieses wird für eine eindeutige Identifiaktion gebraucht.

Neben normalen Felder (String, Boolean, Integer usw.) gibt es noch ein speziellers Keyword Feld. Dies ist ein Feld welches String Werte abspeichern kann. Diese Werte sollten jedoch aus einem Katalog geholt werden. 