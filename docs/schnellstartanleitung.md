# Schnellstartanleitung
## Einleitung
Die vielfältige Auswahl an Tools und Services für die Entwicklung des mobilen Clients benötigt einiges an Einarbeitungszeit. Um diese zu verkürzen wurde eine Schnellstartanleitung erstellt, welche die wichtigsten Programme und Funktionen kurz erklärt.
## Voraussetzungen
Tools:
- Visual Studio Code
- Ionic
- Android Studio
- Itunes

Services:
- Github Repository
- Waffle Kanbanboard
- Ionic Pro
- Travis CI
- Play Store Developer Service
- Apple App Store Developer Service

## Einrichtung der Services/Tools
### Visual Studio Code
Visual Studio Code ist frei erhältlicher Quelltexteditor von Microsoft. Er arbeitet mit der vorhandenen Ordnerstruktur, besitzt einen integrierten Git-Client und kann mit Extensions erweitert werden.  

Die Versionverwaltung kann durch die Kommandozeile oder durch den intuitiven Gitclient bedient werden. Einen Einstieg in das Klonen, Commiten und Pushen mit dem Gitclient bietet eine [Hilfeseite von Visualstudio](https://code.visualstudio.com/docs/editor/versioncontrol).  

Erweiterungen können einfach im Marketplace innerhalb des Editors hinzugefügt werden. Folgende Plugins haben sich bewährt:
- Auto Import
- Auto-Open Markdown Preview
- TSLint

## Ionic

Für den Start mit Ionic muss zuerst NodeJS installiert werden. Anschliessend kann Ionic und Cordova einfach über die Commandozeile installiert werden:  
`npm install -g cordova ionic`

Anschliessend müssen die gewünschten Plattformen hinzugefügt werden:  
`ionic cordova platform add ios`  
`ionic cordova platform add android`

Wenn das Projekt vom Github Repository geladen ist, kann es mit dem Konsolenbefehl `ionic serve` im Browser gestartet werden. Für eine emulierte Smartphone-Ansicht auf verschiedenen Plattformen kann mit `ionic lab` eine Applikation gestartet werden.

## Android Studio
Natürlich kann ein Projekt auch direkt auf einem Smartphone getestet werden. Bei einem Android Smartphone muss zuerst auf dem Gerät der Developer Modus freigeschaltet werden ([Anleitung](https://developer.android.com/studio/debug/dev-options.html)). Ausserdem müssen die Android SDK-Plattformtools installiert werden, um eine Installation durchzuführen. Dank folgendem Befehl kann die App an das Smartphone gesendet werden.  
`ionic cordova run android`

Falls kein Smartphone gefunden wird, wird automatisch der Emulator gestartet (sofern installiert).

## Itunes
Für das Testen von Apple-Apps auf dem iPhone oder iPad wird ein Apple-Computer empfohlen. Eine Alternative dazu ist Builden des Pakets mithilfe von Ionic Pro (siehe dazu Kapitel Ionic Pro). 

## Verwendung

## Links
Offizielle Seite von Visual Studio Code 
https://code.visualstudio.com