# Framework Entscheid
## Einleitung

Für die Framework Entscheidung wurde pro Framework ein Prototyp erstellt. Mithilfe dieser Prototypen sollte abgeklärt werden, ob das Framework unseren Anforderungen entspricht. Die Anforderungen an den Prototyp wurde im Dokument Frameworkanforderungen zusammengefasst. Die Prototypen und Frameworkbeschreibungen sind auf der Github-Seite einsehbar.

## Anforderungsmatrix
| Anforderung | Ionic 2 | React Native | Xamarin |
| ----------- | ------- | ------------ | ------- |
| Android Support | Ja | Ja | Ja |
| iOS-Support |	Ja |	Ja | Ja |
| Kamera-Support | Ja |	Ja |Ja |
| Gallerie-Support | Ja |	Ja |	Begrenzt (Multipicture Selection nicht implementiert) |
| Persistent Data |	Ja |	Ja |	Muss nativ eingepflegt werden |
| REST-Client |	Ja |	Ja | Ja |
| Unterstützt SSL |	Ja |	Ja |	Ja, jedoch Probleme mit Prototype |
| Dynamische Felder | Ja, jedoch nicht optimal | Ja | Ja |			
| Unterstützt Webbrowser | Ja | Ja | Nein (Projekt in Entwicklung) |

## IONIC 2
### Vorteile
- Gute und komplette Bibliotheksfunktionen für HW-Ansteuerung
- Layout kann in HTML beschrieben werden
- Wird im Webbrowser unterstützt
### Nachteile
- Wenn Feature von Cordova nicht unterstützt wird, dann ist es schwierig zu implementieren
- Relativ neu, keine Global Players dahinter
- Fehlende Funktionalitäten müssen als Cordova-Plugin implementiert werden
- Testing noch in den Anfängen

## React Native
### Vorteile
- Bietet eine Vielzahl an Plugins
- Funktioniert dynamisch, kann auf Ereignisse gut reagieren
- Lauffähig in Webbrowser

### Nachteile
- Layout wird dynamisch erstellt
- Framework auf asynchrone Ereignisse ausgerichtet

## Xamarin
### Vorteile
- Grosse Auswahl an bisherigen DOTNET-Bibliotheken
- Native Funktionen können OS-spezifisch implementiert werden
- XML-Code für den Layoutbeschreib
- Testing gut implementiert (Unittest, Device Test auf Cloud usw.)

### Nachteile
- Bibliotheksfunktionen teilweise unvollständig
- DOTNET-Bibliotheken unterstützen nicht immer das Xamarin Framework
- Auf proprioritäre Software (Visual Studio oder Xamarin Studio) angewiesen
- Wird im Webbrowser nicht unterstützt

## Entscheid
Alle Frameworks liefern eine gute Ausgangslage für die Entwicklung des mobilen Clients. Wir haben uns für IONIC2 entschieden, da uns die integrierten Bibliotheksfunktionen und die eine einfache Layouterstellung überzeugt haben. Ausserdem ist es lauffähig im Webbrowser. Auch wenn wir noch Vorbehalte gegenüber der fehlenden (Global Player) Unterstützung haben, denken wir, dass die Vorteile überwiegen.
