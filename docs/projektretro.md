# Schlussbericht

## Projekt-Retrospektive

### Phase Anforderungsanalyse und Prototype
Früh zeigte sich dass leider kein direktes Requirements Engineering mit einer Polizeieinheit möglich sein wird. Wir konnten zu Beginn nur auf die Erfahrungen von PIC Systems mit ihren Kunden zurückgreifen und versuchten deshalb indirekt mittels Fragenkatalog die wichtigsten Anforderungen und Constraints eines möglichen Endkunden in Erfahrung zu bringen.

Gleichzeitig erstellte jeder für sich alleine einen Prototyp in einem ihm noch völlig unbekannten Framework, was uns viel Energie kostete. Trotzdem machte es Spass und war eine willkommene Abwechslung zum Requirements Engineering. 

### Phase Design und Architektur
Bei der Erstellung der Wireframes durften wir unserer Kreativität freien Lauf lassen. Dank dieser frühen Festlegung des Interaction Designs konnten wir uns anschliessend voll und ganz auf die Implementierung konzentrieren.

### Phase Implementierung
Die konsequente Implementierung von Features zu Zweit am selben Bildschrim mit anschliessendem Code-Review durch den Dritten war das richtige Rezept um die Qualität hinsichtlich Verständlichkeit und Robustheit sicherzustellen. So entstand kein "eigener" Code an den sich niemand sonst heranwagte. Die Continuous Integration von Beginn Weg gab uns die Sicherheit keine Regressionen zu verursachen. Es bedeutete aber auch dass die Umsetzung der Haupt-Anforderungen einiges an Zeit beanspruchte. Das führte dazu dass erst spät in der Implementierungsphase erstmals mit den Stakeholdern über eine Repriorisierung der Backlog-Items gesprochen werden konnte.

Der regelmässige Austausch mit den Stakeholdern im Rahmen des Sprint Reviews war für alle Beteiligten sehr motivierend. Wir konnten durchgehend eine funktionsfähige Software mit neuer Funktionaltiät zeigen und danach gleich auf den Smartphones interessierter Stakeholder installieren. 

Die späte Einführung einer Vielzahl neuer Regeln der statischen Codeanalyse war aufgrund der bereits beträchtlichen Codebasis ein aufwändiges Unterfangen. Auch der Umgang mit der Laufzeitumgebung konnte unerwartet viel Zeit in Anspruch nehmen, was wir vorallem beim Drag & Drop im Browser sowie den Cordova Plugins zur Bildentgegennahme zu spüren bekamen. Hier galt es Kompromisse einzugehen und das Beste daraus zu machen.

### Phase Abschluss und Übergabe

*TODO*
