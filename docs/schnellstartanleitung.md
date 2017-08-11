# Schnellstartanleitung
## Einleitung
Die vielfältige Auswahl an Tools und Services für die Entwicklung des mobilen Clients benötigt eine Einarbeitungszeit. Um diese zu verkürzen, werden in der Schnellstartanleitung die gängigsten Kommandos erläutert, welche notwendig sind, um das Projekt zu laden und zu kompilieren.

## Lokales GitHub Repository einrichten
In einem ersten Schritt wird das Projekt auf den lokalen Rechner geklont. Dafür wird ein [Git Client](https://git-scm.com) benötigt. In der Kommandozeile kann das Projekt mit folgendem Befehl heruntergeladen werden: 
```shell
git clone https://github.com/IMSmobile/app.git
``` 

Ab diesem Zeitpunkt wird [Visual Studio Code](https://code.visualstudio.com) als Entwicklertool empfohlen. Dieser frei erhältlicher Quelltext-Editor arbeitet mit der vorhandenen Ordnerstruktur, besitzt einen integrierten Git-Client und kann mit [Extensions](projektplan.md#plugins) erweitert werden.

## Ionic installieren und App in Browser starten

Für den Start mit Ionic muss zuerst [NodeJS](https://nodejs.org/en/) installiert werden. Anschliessend kann Ionic und Cordova einfach über die Commandozeile installiert werden:  
```shell
npm install -g cordova ionic
```

Anschliessend müssen die gewünschten Plattformen hinzugefügt werden:  
```shell
ionic cordova platform add ios
ionic cordova platform add android
```
Um alle Plugins und Pakete zu laden, müssen vor dem ersten Aufstarten die NPM-Abhängigkeiten installiert werden:  
```shell
npm install
```

Das Projekt kann nun mit dem Konsolenbefehl `ionic serve` gestartet werden. Als Alternative kann die App mit einer emulierten Smartphone-Ansicht über den Befehl `ionic lab` gestartet werden.

## Installieren der Entwicklerversion auf einem Android Gerät
Natürlich kann ein Projekt auch direkt auf einem Smartphone getestet werden. Bei einem Android Smartphone muss zuerst auf dem Gerät der Developer Modus freigeschaltet werden ([Anleitung](https://developer.android.com/studio/debug/dev-options.html)). Für die Übertragung auf das Gerät reicht es, [Android Studio](https://developer.android.com/studio/index.html) zu installieren. Bei Problemen kann der [Cordova Android Platform Guide](https://cordova.apache.org/docs/en/7.x/guide/platforms/android/) konsultiert werden. Mit dem folgendem Befehl wird die App auf dem Smartphone installiert:  
```shell
ionic cordova run android
```

Falls kein Smartphone gefunden wird, startet der Android-Emulator automatisch, sofern dieser installiert und verfügbar ist.

## Installieren der Entwicklerversion auf dem iPhone
Für das Testen mit einem iPhone muss zwingend eine Apple ID vorhanden sein. Mit einem Apple Computer kann das Projekt analog zur Android-Version kompiliert werden. Falls kein Apple Computer vorhanden ist, kann mithilfe von Ionic Cloud ein IPA-File kompiliert werden. Für diese Variante muss zuerst das gewünschte Gerät mit seiner [UDID-Nummer](https://docs.ionic.io/services/profiles/ios-udid.html) im Developer Account eingetragen werden. Im Developer Account kann danach einen neuen Schlüssel erzeugen, der in der Ionic Cloud hinterlegt werden muss. Details zum Einrichten der iOS Zertifikate und dem Provisioning Profile findet man in der [Ionic Cloud Dokumentation](https://docs.ionic.io/services/profiles/#ios-app-certificate--provisioning-profile). Die App kann nach diesen Schritten mit dem folgenden Kommando gebaut werden:  
```shell
ionic package build ios
```
Das erzeugte IPA-File kann entweder über die Kommandozeile mit `ionic package download` und der dazugehörigen Buildnummer oder direkt vom Ionic Benutzerkonto heruntergeladen werden. Das IPA-File kann via Apple iTunes direkt auf dem Gerät installiert werden.


## Mitarbeit und Richtlinien

Eine Übersicht der Architektur und der wichtigsten Richtlinien findet man im [Software Architecture Dokument](sad.md)

Detailinformationen über den Entwicklungsprozess, Testing, Code-Coverage und statische Codeanalyse können im [Projektplan](projektplan.md#qualitätsmassnahmen) ab dem Kapitel Qualitätsmassnahmen eingesehen werden.
