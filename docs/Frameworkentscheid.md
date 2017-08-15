# Framework Entscheid
## Einleitung

Für die Framework Entscheidung wurde pro Framework ein Prototyp erstellt. Mithilfe dieser Prototypen sollte abgeklärt werden, ob das Framework unseren Anforderungen entspricht. Die Anforderungen an den Prototyp wurden im Dokument [Frameworkanforderungen](frameworkanforderungen.md) zusammengefasst. Die Prototypen und Frameworkbeschreibungen sind auf den GitHub-Seiten einsehbar:

- [Ionic 2](https://github.com/IMSmobile/ionic2-prototype)
- [React Native](https://github.com/IMSmobile/rn-prototype)
- [Xamarin](https://github.com/IMSmobile/XamarinPrototype)

## Evaluierte Anforderungen

Nur eine Auswahl der wichtigsten Framworkanforderungen konnte im im Prototyp implementiert und bewertet werden.

| ID | Anforderung | Ionic 2 | React Native | Xamarin |
| -- | ----------- | ------- | ------------ | ------- |
|  1 | Android Support | Ja | Ja | Ja |
|  2 | iOS-Support |	Ja |	Ja | Ja |
|  3 | Unterstützt Webbrowser | Ja | Nein | Nein (Projekt in Entwicklung) |
|  4 | REST-Client |	Ja |	Ja | Ja |
|  5 | Galerie-Support | Ja |	Ja |	Begrenzt (Multipicture Selection nicht implementiert) |
|  6 | Kamera-Support | Ja |	Ja |Ja |
| 12 | Gleiche Codebasis | Ja | Ja | Ja |
| 14 | Unterstützt SSL |	Ja |	Ja |	Ja, jedoch Probleme mit Prototype |
| 16 | Persistent Data |	Ja |	Ja |	Muss nativ eingepflegt werden |
| 17 | Authentifizierung | Ja | Ja | Ja |
| 21 | Dynamische Felder | Ja, jedoch nicht optimal | Ja | Ja |			

## Ionic 2
### Vorteile
- Gute und komplette Bibliotheksfunktionen für HW-Ansteuerung
- Layout kann in HTML beschrieben werden
- Wird im Webbrowser unterstützt
- Betriebsystemspezifsche UI-Komponenten
- TypeScript erlaubt sauberere JavaScript Programmierung
### Nachteile
- Wenn Feature von Cordova nicht unterstützt wird, dann ist es schwierig zu implementieren
- Relativ neu, keine Global Players dahinter
- Fehlende Funktionalitäten müssen als Cordova-Plugin implementiert werden
- Testing noch in den Anfängen

## React Native
### Vorteile
- Bietet eine Vielzahl an Plugins
- Funktioniert dynamisch, kann auf Ereignisse gut reagieren

### Nachteile
- Layout wird dynamisch erstellt
- Framework ist für asynchrone Ereignisse ausgerichtet

## Xamarin
### Vorteile
- Grosse Auswahl an bisherigen DOTNET-Bibliotheken
- Native Funktionen können OS-spezifisch implementiert werden
- XML-Code für die Layoutbeschreibung
- Testing gut implementiert (Unit Test, Device Test auf Cloud usw.)

### Nachteile
- Bibliotheksfunktionen teilweise unvollständig
- DOTNET-Bibliotheken unterstützen nicht immer das Xamarin Framework
- Auf proprietäre Software (Visual Studio oder Xamarin Studio) angewiesen
- Wird im Webbrowser nicht unterstützt

## Entscheid
Alle Frameworks liefern eine gute Ausgangslage für die Entwicklung des mobilen Clients. Wir haben uns für Ionic 2 entschieden, da uns die integrierten Bibliotheksfunktionen und die eine einfache Layouterstellung überzeugt haben. Ausserdem ist es lauffähig im Webbrowser. Ionic 2 baut auf dem Angular Framework auf. Dies hilft bei der Strukturierung des Quellcodes. Auch wenn wir noch Vorbehalte gegenüber der fehlenden (Global Player) Unterstützung haben, denken wir, dass die Vorteile überwiegen.
