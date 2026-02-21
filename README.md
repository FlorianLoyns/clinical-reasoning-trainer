# Clinical-Reasoning-Trainer

**Klinisches Urteilen in der Pflege**

Ein interaktives Lernwerkzeug für die generalistische Pflegeausbildung. Der Trainer führt Schritt für Schritt durch pflegerisches Denken – von der Situationserfassung bis zur Evaluation.

**[Hier klicken, um direkt online auszuprobieren!](https://florianloyns.github.io/clinical-reasoning-trainer/index.html)**

---

## Warum dieser Trainer

Viele Auszubildende können Beobachtungen benennen. Der nächste Schritt ist jedoch schwer:

- Was ist jetzt pflegerisch wichtig?
- Was gehört zusammen?
- Was folgt daraus für Ziel und Maßnahme?
- Wie begründe ich das fachlich?

Genau hier setzt der Trainer an.  
Er zerlegt Clinical Reasoning in kleine, übbare Schritte und macht den Denkweg sichtbar:

**Beobachten → ordnen → begründen → planen → evaluieren**

Der Trainer ist damit keine reine Quiz-Seite, sondern eine **Übung zur Pflegeplanung** – mit realistischen Fällen, fachlicher Rückmeldung und einem Ablauf, der direkt an die Pflegeplanung anschließt.


## Didaktischer Rahmen

Der Trainer orientiert sich am Pflegeprozess nach Fiechter und Meier (1981) sowie am Clinical-Reasoning-Zyklus nach Levett-Jones et al. (2010). Die Lernenden arbeiten in sieben Schritten:

1. **Situation erfassen** - Fall lesen und Überblick gewinnen
2. **Cues erkennen** – pflegerisch relevante Hinweise auswählen
3. **Informationen clustern** - Hinweise nach ATL thematisch ordnen
4. **Pflegediagnose (PES)** - Problem, Ursache und Symptome zuordnen
5. **Ziele prüfen (SMART)** – Ziele fachlich bewerten
6. **Maßnahmen planen (6 W)** - Wer, Was, Wann, Wie oft, Wo, Warum?
7. **Evaluation** - Zielerreichung einschätzen und Maßnahme begründen

Die Fälle mischen bewusst relevante und weniger relevante Informationen, wie es auch im Pflegealltag der Fall ist. So wird nicht nur Wissen abgefragt, sondern auch das Priorisieren und Begründen pflegerischer Entscheidungen trainiert.

Zentrale Fachbegriffe (Clinical Reasoning, ATL, PES, SMART, 6 W, Cues, Evaluation) sind beim ersten Vorkommen pro Schritt mit einem Tooltip versehen. Das senkt die Einstiegshürde im ersten Ausbildungsdrittel, ohne den Fluss zu stören.


## Fallbeispiele

Die Fälle decken alle Vertiefungsbereiche der generalistischen Ausbildung ab:

| Fall | Vertiefungsbereich | Schwerpunkt |
|---|---|---|
| Frau Yıldız Kara, 78 | Akutpflege | Dekubitus, Mangelernährung, Angst |
| Herr Giovanni Esposito, 82 | Langzeitpflege | Demenz, Validation, Apraxie |
| Frau Nadja Petrow, 67 | Ambulante Pflege | Herzinsuffizienz, Versorgungskoordination |
| Amira Haddad, 11 | Pädiatrie | Diabetes-Edukation, Kind + Mutter |
| Herr Dariusz Kowalski, 54 | Psychiatrie | Depression, Suizidalität, Aktivierung |

Die Fallrotation sorgt dafür, dass alle Fälle gespielt werden, bevor sich einer wiederholt.


## Feedback-Konzept

Das Feedback ist fachlich klar, aber nicht nur „richtig/falsch":

- **Falsche Antworten** werden nach Art des Fehlers eingeordnet: komplett daneben, teilweise richtig oder überambitioniert. Jede Rückmeldung endet mit einem konkreten Tipp.
- **Teilerfolge** werden anerkannt ("Gute Richtung, aber noch nicht ganz").
- **Überambitionierte Ziele** werden als nachvollziehbar gewürdigt, bevor die Erklärung kommt.
- **Richtige Antworten** erklären, warum sie richtig sind – nicht nur, dass sie es sind.

Im Mittelpunkt steht die Begründung: Der Trainer zeigt nicht nur die Lösung, sondern auch den pflegerischen Denkweg dahinter.


## Gamification

Der Trainer nutzt Gamification-Elemente, ohne den fachlichen Fokus zu verlieren:

- **XP-System** – 700 XP pro Durchlauf, gewichtet nach Schrittkomplexität (PES und 6-W-Planung zählen stärker als Cue-Erkennung)
- **6 Level** – von Beobachter/in bis Clinical-Reasoning-Coach
- **Streak-Anzeige** – zählt aufeinanderfolgende Schritte mit ≥70% Ergebnis, belohnt Konsistenz statt Perfektion
- **Highscore pro Fall** – speichert den besten Durchlauf lokal im Browser, sichtbar auf der Startseite
- **Fälle-Fortschritt** – zeigt an, wie viele der Fälle bearbeitet wurden


## Zielgruppe und Einsatz

- Auszubildende in der generalistischen Pflegeausbildung
- Unterricht (Einzelarbeit, Partnerarbeit, Besprechung im Plenum)
- Übungsphasen zur Pflegeplanung
- Prüfungsvorbereitung

Der Trainer eignet sich besonders für Lernphasen, in denen Auszubildende lernen sollen, pflegerische Entscheidungen **zu begründen** – nicht nur Antworten anzukreuzen.


## Eigene Fälle ergänzen

Die Falldaten stehen als JavaScript-Objekte direkt in der HTML-Datei (Suche nach `const fall1 =`). Struktur pro Fall:

- `titel`, `setting`, `text` – Fallbeschreibung
- `cues` – Hinweise mit `relevant: true/false` und Feedback
- `cluster` – ATL-Zuordnung mit Zielzonen
- `pes` – PES-Diagnosen mit Drag-and-Drop-Feldern
- `smartZiele` – je 3 Optionen pro Cluster, eine SMART-konform
- `sechsW` – Lückentext mit Dropdown-Auswahl
- `evaluation` – Zielerreichung, Maßnahmenanpassung, Begründung

Neue Fälle werden ins `faelle`-Array aufgenommen und sind sofort spielbar. Tooltips, Level-System und Oberfläche passen sich automatisch an.


## Technisches

Eine einzelne HTML-Datei. Kein Build, kein Framework, kein Server, keine externen Abhängigkeiten. Läuft offline.

- Keine Datenübertragung, kein Tracking (DSGVO-konform)
- Highscores und Fortschritt bleiben lokal im Browser (localStorage)
- Mobile-optimiert mit Touch-Bedienung




## Lizenz

[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.de) · Nutzen, anpassen und teilen – unter Namensnennung, nicht-kommerziell und unter gleichen Bedingungen.

**Weg vom Auswendiglernen, hin zu begründetem pflegerischem Handeln.**
