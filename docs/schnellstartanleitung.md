# Schnellstartanleitung
## Einleitung
Die vielfältige Auswahl an Tools und Services für die Entwicklung des mobilen Clients benötigt einiges an Einarbeitungszeit. Um diese zu verkürzen wurde eine Schnellstartanleitung erstellt, welche die wichtigsten Programme und Funktionen kurz erklärt.

## GitHub Repository einrichten
In einem ersten Schritt wird das Projekt auf dem lokalen Rechner geklont. Dafür wird ein [Git Client](https://git-scm.com) benötigt. In der Kommandozeile kann das Projekt mit dem Befehl `git clone https://github.com/IMSmobile/app.git` lokal abgespeichert werden. Ab diesem Zeitpunkt wird [Visual Studio Code](https://code.visualstudio.com) als Entwicklertool empfohlen. Dieser frei erhältlicher Quelltexteditor arbeitet mit der vorhandenen Ordnerstruktur, besitzt einen integrierten Git-Client und kann mit Extensions erweitert werden.  

## Ionic installieren und App in Browser starten

Für den Start mit Ionic muss zuerst NodeJS installiert werden. Anschliessend kann Ionic und Cordova einfach über die Commandozeile installiert werden:  
```shell
npm install -g cordova ionic
```

Anschliessend müssen die gewünschten Plattformen hinzugefügt werden:  
```shell
ionic cordova platform add ios
ionic cordova platform add android
```
Um alle Plugins und Pakete zu laden, müssen vor dem ersten aufstarten die NPM-Abhängigkeiten installiert werden:  
```shell
npm install
```

Das Projekt kann mit dem Konsolenbefehl `ionic serve` gestartet werden. Für eine emulierte Smartphone-Ansicht auf verschiedenen Plattformen kann mit `ionic lab` eine Applikation gestartet werden.

## Installieren der Entwicklerversion auf einem Android Gerät
Natürlich kann ein Projekt auch direkt auf einem Smartphone getestet werden. Bei einem Android Smartphone muss zuerst auf dem Gerät der Developer Modus freigeschaltet werden ([Anleitung](https://developer.android.com/studio/debug/dev-options.html)). Für die Übertragung auf das Gerät muss zuerst das Android Studio installiert werden. Von den Android Tools müssen mindestens die Platformtools installiert werden. Mit dem folgendem Befehl kann die App an das Smartphone gesendet werden.  
```shell
ionic cordova run android
```

Falls kein Smartphone gefunden wird, wird automatisch der Emulator gestartet (sofern installiert). 

## Installieren der Entwicklerversion auf dem iPhone
Für das Testen mit einem iPhone muss zwingend ein Apple Developer Account vorhanden sein. Mit einem Apple Computer kann das Projekt analog zur Android-Version kompiliert werden. Falls kein Apple Computer vorhanden ist, kann mithilfe von Ionic Cloud ein IPA-File kompiliert werden. Für diese Variante muss zuerst das gewünschte Gerät mit seiner UUID-Nummer im Developer Account eingetragen werden. Im Developer Account kann man anschliessend einen neuen Schlüssel erzeugen, der in der Ionic Cloud hinterlegt werden muss. Die App kann nach diesen Schritten mit dem folgenden Kommando gebuildet werden:  
```shell
ionic package build ios
```
Das erzeugte IPA-File kann entweder über CLI mit `ionic package download` und der dazugehörigen Buildnummer oder direkt auf dem Ionic Benutzerkonto heruntergeladen werden. Das IPA-File kann anschliessend im Apple iTunes importiert und mit Gerät synchronisiert werden.