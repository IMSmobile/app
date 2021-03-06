# Software Architecture Document

Beschreibt die Architektur des Mobile Clients.
## Inhaltsverzeichnis
  - [Einleitung](#einleitung)
  - [Data Flow Diagramm](#data-flow-diagramm)
  - [Imagic IMS Daten Model](#imagic-ims-daten-model)
    - [Datenmodell](#datenmodell)
    - [Objektmodell](#objektmodell)
  - [Komponentendiagramm](#komponentendiagramm)
  - [Design Prinzipien](#design-prinzipien)
    - [Ordnerstruktur Konventionen](#ordnerstruktur-konventionen)
    - [Model](#model)
    - [Pages](#pages)
    - [Provider](#provider)
    - [Functional Reactive Programming / Observable](#functional-reactive-programming--observable)
    - [Dependency Injection](#dependency-injection)
    - [Blockierende Aktionen](#blockierende-aktionen)
    - [Fehlerbehandlung](#fehlerbehandlung)
  - [Assembly Flow](#assembly-flow)
  - [Technologie Stack](#technologie-stack)
    
## Einleitung
Aus den wichtigsten [Anforderungen](spec.md#anforderungskatalog) Bildupload (FA1), Kameraupload (FA2), Metadaten (FA5) und Fallauswahl (FA6) ergibt sich eine Architektur, welche sich primär auf die Entgegennahme und Übermittlung von Benutzerdaten in ein dynamisches Datenmodell ausrichtet.

Die Unterteilung der Services und die Struktur der Models orientiert sich an der der vorgegebenen Schnittstelle des Imagic IMS Servers (FA17). Damit bleibt das Datenmodell des Imagic IMS erhalten, was den Einstieg für Imagic IMS Entwickler erleichtern soll (NF19).

Eine granulare Aufteilung auf Komponenten- und Methoden-Ebene erhöht die Testbarkeit. Dies soll zur Fehlerverminderung (NF18) beitragen. Die konsequente Navigation über den Einstiegspunkt (FA18) bedeutet pro Aktion eine Kette von Anfragen zur REST Schnittstelle. Diese Kette wird mit hilfe von Functional Reactive Programming aus wiederverwendbaren Observables zusammengestellt.

## Data Flow Diagramm

![Data Flow Diagramm](images/dataflow_diagram.png)

Ein Data Flow Diagramm bietet einen Überblick über die Richtung des Datenflusses und zeigt auf, wo die Daten persistiert werden. Beim Arkivar Mobile Clients liefert der IMS Server alle Informationen, welche für den Aufbau der Navigationsstruktur notwendig sind. Die Bilder können von verschiedenen Quellen eingelesen werden und mit Feldeinträgen vom User komplettiert werden. Beim Upload werden die Bilder mit den Feldinformationen vom Mobile Client an den IMS Server übertragen. 

## Imagic IMS Daten Model
Um im Imagic IMS Daten via REST API zu speichern, müssen wir uns mit dem Datenmodell der Firma Imagic vertraut machen.
Da das Imagic IMS für verschiedene Kundensegemente flexibel einsetzbar sein muss, ist das Datenmodell sehr abstrakt.

### Datenmodell

![IMS Datenmodell](images/Ims_Datenmodell.png)

Innerhalb einer IMS Datenbank können verschiedene **Archive** installiert sein. Jedes dieser Archive kann unterschiedliche Tabellen (**Table**) mit wiederum unterschiedlichen Feldern (**Field**) haben. Die Tabellen sind hierarchisch in einer 1:n Struktur aufgebaut. Die letzte Kind Tabelle wird jeweils als Bilder Tabelle bezeichnet. Auf dieser Ebene werden alle Mediendaten gespeichert und sie ist damit zwingend. Alle Tabellen besitzen zwingend neben IMS spezifischen Felder ein vom Kunden definiertes IdentifierField. Dieses wird für eine eindeutige Identifikation der Objekte durch den Kunden gebraucht.

Neben normalen Feldern (String, Boolean, Integer usw.) gibt es noch ein spezielles Keyword Feld. Dies ist ein Feld, welches String Werte abspeichern kann. Diese Werte sollten jedoch aus einem Katalog geholt werden.

### Objektmodell
Mit dem Objektmodell wird aufgezeigt, wie unterschiedlich Tabellen und Felder bei einem Archive sein können. Als Beispiel dient ein Auszug aus einem Polizeiarchiv und einem Medizinarchiv.

![Objektmodell Polizeiarchiv](images/Polizeiarchiv_Objektmodell.png)

Das Polizeiarchiv workflow_db1 hat drei Tabellen. Auf der höchsten Ebene steht die Tabelle Art. Danach kommen Fälle und zu jedem Fall gibt es Bilder.

![Objektmodell Medizinarchiv](images/Medizinarchiv_Objectmodell.png)

Das Medizinarchiv beinhaltet völlig andere Tabellen. Auf höchster Ebene ist dort ein Patient, danach kommen Besuche (Visit), Studien (Study) und am Schluss, wie von IMS vorgegeben, die Bilder Tabelle. Als Beispiel eines Keyword Katalogs wurde das Geschlecht (Sex) bei einem Patienten gewählt. Man erkennt, dass innerhalb des Keyword Kataloges die Werte masculin und feminin ausgewählt werden können.

## Komponentendiagramm

![Komponentendiagramm](images/components.png)

Der Mobile Client besteht aus mehreren **Pages**, welche wiederum auf **Services** zugreifen. Dabei unterscheiden wir zwischen Imagic IMS spezifischen **Services** und allgemeinen **Infrastruktur Komponenten**.
Die Verbindungen zeigen die Abhängigkeiten untereinander auf. Infrastruktur Komponenten sind in sich geschlossen und können unabhängig genutzt werden.
Die Reihenfolge der Pages entspricht einem typischen Ablauf von Login, Konfiguration und Upload.

Auf die Darstellung der **Models** und **Mocks** wurde aus Gründen der Übersichtlichkeit verzichtet.

## Design Prinzipien

Die Design Prinzipien beschreiben die wichtigsten architektonischen Richtlinien und Design Patterns. Sie helfen dem Entwickler, bestehende Lösungen zu übernehmen und einen einheitlichen Code zu schreiben. 

### Ordnerstruktur Konventionen

Damit das Projekt sauber strukturiert ist und sich neue Entwickler rasch zurechtfinden, verwenden wir eine Ordnerstruktur Konvention. Diese entsprechen im Grundsatz den Konventionen eines Ionic Projekts.  

    .
    ├── e2e                          # Automatisierte End to End Tests
    ├── docs                         # Dokumentationen
    ├── resources                    # Icon, Splashscreen
    |── scripts                      # Scripts für Travis CI oder Entwickler
    ├── src                          # Sourcecode Files
    ├──── app                        # Zusammenstellung der App, Dependency Managment Konfiguration
    ├──── assets                     # Bilder, die innerhalb der App gebraucht werden
    ├──── components                 # Wiederverwendbare UI Elemente
    ├────── any-component            # Überordner eines Elements
    ├──────── any-component.html     # Struktur und UI des Elements
    ├──────── any-component.scss     # Gestaltung des Elements
    ├──────── any-component.spec.ts  # Testklasse des Elements
    ├──────── any-component.ts       # Logik für das Element
    ├──── mocks                      # Mocks und Klassen für Testing
    ├────── providers                # Mock Klassen von Provider
    ├────── response                 # Mock-Antworten der REST API
    ├──── models                     # Model Klassen
    ├──── pages                      # UI Screen Seiten
    ├────── any-page                 # Überordner einer Seite
    ├──────── any-page.html          # Struktur und UI Elemente der Seite
    ├──────── any-page.scss          # Gestaltung der Seite
    ├──────── any-page.spec.ts       # Testklasse der Seite
    ├──────── any-page.ts            # Logik der Seite. Aufrufe von Services
    ├──── providers                  # Services, welche innerhalb der Pages gebraucht werden können
    ├──────── any-service.spec.ts    # Testklasse des Services
    ├──────── any-service.ts         # Serviceklasse
    ├──── themes                     # SCSS Files für die Gestaltung der App 
    ├──── validators                 # Validationsklassen für unterschiedliche Feldtypen

### Model

Ein Model ist eine Klasse mit Attributen, welche Informationen beinhalten. Model Klassen werden hauptsächlich für die Repräsentation der Rückgabewerte von der REST Schnittstelle und für Error Klassen eingesetzt. 

Ein wichtiger Designentscheid ist, dass Model Klassen **keine Methoden** enthalten. Dies liegt daran, dass beim Mapping einer Angular HTTP Response ein Model nicht automatisch instanziiert wird. Das folgende Beispiel gibt zwar Credentials zurück, jedoch ist das Objekt keine Instanz von Credential. Somit kann nur auf Attribute, nicht aber auf Methoden, zugegriffen werden.  

```typescript
  public getCredential(): Observable<Credential> {
   this.http.get('rest/info').map(response => response.json());
  } 
}
``` 

Mit dem **readonly** Modifier bei Attributen wird sichergestellt, dass Model Klassen unveränderlich (immutable) sind. 

Ein Beispiel einer Model Klasse:

```typescript
export class Credential {
  public readonly username: string;
  public readonly password: string;
  
  constructor(string, password: string) {
    this.username = username;
    this.password = password;
  }
}
```

### Pages

Pages sind von Ionic erweiterte [Angular Komponenten](https://angular.io/api/core/Component). Sie entsprechen einer Bildschirmseite wie zum Beispiel dem Loginscreen und werden in drei Files unterteilt:

 * HTML für UI-Elemente
 * SCSS für Design 
 * Typescript für die Logik

Eine neue Page kann mit dem Ionic CLI Kommando automatisch erstellt werden.

```bash
ionic generate page [<name>]
```

Sämtliche Members und Methoden einer Page sind `public`, weil ausser im Testing nie mehrere Instanzen davon erstellt werden.

### Provider

Ein Provider ist eine Klasse, welche einen Service für einen bestimmten Zweck bereitstellt. Ein Beispiel ist der Kamera Service, welcher für das Aufnehmen von Fotos verantwortlich ist. Provider werden via Dependency Injection geladen und sind in der Regel Singleton Objekte.

Ein neuer Provider kann mit dem Ionic CLI Kommando automatisch erstellt werden.

```bash
ionic generate provider [<name>]
```

Beispiel eines Providers, versehen mit der zwingenden `@Injectable()` Annotation für Dependency Injection:

```typescript
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class CameraService {
  
  public acquireImage(): Observable<Image> {
    // Logic to acquire Image
  }
}
```
### Functional Reactive Programming / Observable

Um Probleme mit Zustand und weiteren Seiteneffekten zu verringern, wird die Software im Angular Framework mit dem [Functional Reactive Programming Paradigma](https://en.wikipedia.org/wiki/Functional_reactive_programming) entwickelt.

Ein zentraler Baustein ist die Verwendung von Observables. Ein Observable ist ein Stream von Ereignissen. Zum besseren Verständnis wird empfohlen, Literatur über den [ReactiveX Standard](http://reactivex.io/) zu lesen. Vor allem für Entwickler mit Kenntnissen in prozeduraler oder objektorientierter Programmierung führt die Verwendung von Observables zu einem Paradigmenwechsel.

Das folgende vereinfachte Beispiel zeigt die häufigste Verwenden von Observables in dieser Applikation. Mithilfe der Observable *flatMap* Methode wird das Laden vom Token und das Laden der Einträge verkettet. Die User Interface Methode *loadEntries* aktiviert mit *subscribe* das neu verkettete Observable. Erst dann werden Daten von der REST Schnittstelle abgerufen. 

```typescript
  // Provider Functions
  public getEntries(): Observable<Entries> {
    return this.getToken().flatMap(token =>
      this.http.get('rest/entries', token).map(response => response.json())
    );
  }
  public getToken(): Observable<Token> {
    return http.get('rest/tokens').map(response => response.json());
  }

  // Page Function
  public loadEntries(): void {
    Observable<Entires> entriesStream = getEntries(); // no http calls until now 
    entriesStream.subscribe( // subscribe executes the observable
      entries => displayEntries(entries);
      err => // do error handling
    );
  }
```

### Dependency Injection
Dependency Injection ist ein Pattern zum Auflösen von Abhängigkeiten zur Laufzeit. Angular hat Dependency Injection fest im Framework integriert. Durch Dependency Injection müssen die Objektinstanzen nicht hin- und hergeschoben werden und die Testbarkeit wird erleichtert. Module können besser abgekoppelt werden und sind unabhängig voneinander.  

Um die Applikationslogik möglichst plattformneutral zu halten, soll die plattform-spezifische Variante einer Komponente mithilfe der Dependency Injection `useFactory` geladen werden.

Die Provider müssen, wie im [Kapitel Provider](#provider) erwähnt, mit einem Label annotiert sein. Zusätzlich müssen sie im `app.module.ts` im Abschnitt @NgModule registriert werden.

```typescript
@NgModule({
  // ...
  providers: [
    CameraServiceProvider 
  ],
  // ...
})
```

Um einen Provider via Dependency Injection zu nutzen, muss er lediglich im Konstruktor der Klasse deklariert werden:

```typescript
constructor(cameraService: CameraService) {
  cameraServiceProvider.acquireImage();
}
```

### Blockierende Aktionen

Für blockierende Aktionen, bei welchen der Benutzer auf ein Ereignis wartet, wird der LoadingService verwendet. Der LoadingService zeigt einen modalen `Bitte Warten` Dialog an, bis das Observable abgeschlossen ist.

Das Codebeispiel zeigt die Verwendung des LoadingService.

```typescript
Observable<Response> responseObservable = this.http.get('http://slowloadingsite.com');
loadingService.subscribeWithLoading(responseObservable, 
  response => { successMethod(response) }, 
  err => { throw new ImsLoadingError('Homepage', err) },
  () => { finishedMethod();});
```
### Fehlerbehandlung

Bei unerwarteten Ereignissen wie z.B. einem Netzwerk-Unterbruch, einer Fehlkonfiguration der REST Schnittstelle oder falschem Programmcode, kümmert sich die ImsErrorHandler Klasse um die korrekte Behandlung des Fehlers.

Im Produktivbetrieb zeigt der ImsErrorHandler dem Benutzer einen Dialog mit einem kurzen Fehlerbeschrieb an. Im Entwicklermodus wird hingegen die Standard Ionic Error Seite mit der technischen Fehlermeldung sowie ein Stacktrace dargestellt.

Damit im Produktivbetrieb die richtige Fehlerbeschreibung angezeigt werden kann, müssen alle Observables im Fehlerfall eine von ImsError geerbte Exception werfen.

Beispielverwendung in der Applikationslogik:

```typescript
loadingService.subscribeWithLoading(responseObservable, 
  response => { successMethod(response) }, 
  err => { throw new ImsLoadingError('Homepage', err) });
```

Die Implementation der im vorherigen Beispiel verwendeten Exception Klasse:

```javascript
import { ImsError } from './ims-error';
export class ImsLoadingError extends ImsError {

  constructor(wantedToLoad: string, message: string) {
    super('Fehler beim Laden der ' + wantedToLoad, message);
    Object.setPrototypeOf(this, ImsLoadingError.prototype);
  }
}
```

Dabei wird aus dem ersten Parameter im Konstruktor die benutzerfreundliche Fehlermeldung erstellt und an `ImsError` übergeben. Gleichzeitig wird für den Entwicklermodus die ursprüngliche Fehlermeldung als zweiter Parameter unverändert durchgereicht.

`Object.setPrototypeOf()` ist wegen einer [Limitation von TypeScript beim Ableiten von Error](https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work) nötig.


## Assembly Flow
Der Assembly Flow zeigt die Module und verschiedenen Technologien auf, welche gebraucht werden, um eine Ionic App zu bauen.

![Assembly FLow](images/assembly_flow.png)

Ionic basiert auf Angular und bietet weitere Funktionen wie Templates, Komponenten und vorgefertigte Providers. Ausserdem gibt es die Struktur vor und ist zuständig für das Verbinden der Komponenten. Für die Smartphone-Anbindung werden Cordova-Plugins verwendet, damit auch die nativen Betriebssystemfunktionen (z.B. Kamera) benutzt werden können. Zur Einbindung dieser Ionic-Funktionen wird Typescript genutzt, welches die Grundlage für den eigenen Code ist. Dieser kann erweitert werden durch HTML und Sass. Auch ist es möglich, fremdes Javascript oder HTML zu verwenden. Das komplette Paket kann anschliessend zu einem App für verschiedene mobile Betriebssysteme oder zu einer Browser Applikation kompiliert werden.


## Technologie Stack

Folgende Technologien werden innerhalb des Projekts verwendet:

| Kategorie                            | Technologie        | Logo                            | Link                                    |
|--------------------------------------|--------------------|---------------------------------|-----------------------------------------|
| Framework                            | Ionic              | ![Ionic](images/logo/Ionic_Logo.jpg) | http://ionicframework.com/              |
| Framework                         | Angular            | ![Angular](images/logo/Angular_Logo.jpg) | https://angular.io/                     |
| Programmiersprache                   | Typescript         | ![Typescript](images/logo/Typescript_Logo.jpg) | https://www.typescriptlang.org          |
| Unit Testing                         | Jasmine            | ![Jasmine](images/logo/Jasmine_Logo.jpg) | https://jasmine.github.io/              |
| End To End Testing                   | Protractor         | ![Protractor](images/logo/Protractor_Logo.jpg) | http://www.protractortest.org/        |
| Code Coverage                   | Coveralls         | ![Coveralls](images/logo/Coveralls_Logo.jpg) | https://coveralls.io/        |
| Wireframes                   | Ninja Mock         | ![NinjaMock](images/logo/Ninjamock_Logo.jpg) | https://ninjamock.com/        |
| Versionsverwaltungstool              | Git                | ![Git](images/logo/Git_Logo.jpg) | https://git-scm.com/                    |
| Hoster Versionsverwaltungstool       | GitHub             | ![GitHub](images/logo/Github_Logo.jpg) | https://github.com/                     |
| Build Tool                           | npm                | ![npm](images/logo/npm_Logo.jpg) | https://www.npmjs.com/                  |
| Continuous Integration               | Travis CI          | ![Travis CI](images/logo/Travis_CI_Logo.jpg) | https://travis-ci.org/                  |
| Project Management, Bugtracking Tool | Waffle             | ![Waffle](images/logo/Waffle_Logo.jpg) | https://waffle.io/                      |
| Dokumentationstool                   | GitHub             | ![GitHub](images/logo/Github_Logo.jpg) | https://github.com/                     |
| Team Kommunikation                   | Slack              | ![Slack](images/logo/Slack_Logo.jpg) | https://slack.com/                      |
| Entwicklungsumgebung                 | Visual Studio Code | ![Visual Studio Code](images/logo/Visual_Studio_Code_Logo.jpg) | https://code.visualstudio.com/          |
| Zeiterfassung                        | Google Drive       | ![Google Drive](images/logo/Google_Drive_Logo.jpg) | https://drive.google.com/ |

