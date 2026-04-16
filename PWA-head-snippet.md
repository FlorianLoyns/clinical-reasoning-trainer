# PWA-Einbindung in `index.html`

Diese kleinen Blöcke müssen in deine `index.html` ergänzt werden, damit die PWA funktioniert. Ich modifiziere die Datei nicht selbst – du fügst das manuell ein (ist jeweils kurz und an klar erkennbaren Stellen).

---

## 1) Zusätzliche Meta-Tags und Links

**Wo:** im `<head>` deiner `index.html`, möglichst weit oben (nach dem bestehenden `<meta charset>` und `<title>`). Du hast aktuell dort schon `<meta name="viewport" …>` — direkt dahinter passt gut.

```html
<!-- PWA -->
<link rel="manifest" href="./manifest.json">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)">

<!-- iOS Home-Bildschirm -->
<link rel="apple-touch-icon" href="./icons/apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="CR-Trainer">

<!-- Browsertab -->
<link rel="icon" type="image/png" sizes="32x32" href="./icons/favicon-32.png">
```

**Was das tut:**
- Der `manifest`-Link macht Safari/Chrome den Installations-Vorschlag bekannt (App-Name, Icon, Farben).
- Die zwei `theme-color`-Varianten passen die iOS-Statusleiste an den Light-/Dark-Mode an.
- Die `apple-touch-icon`- und `apple-mobile-web-app-*`-Tags brauchen iOS explizit — ohne sie erscheint nur ein Safari-Lesezeichen, kein vollwertiges App-Icon.
- `apple-mobile-web-app-title` ist der Text, der unter dem Home-Icon steht (wir haben hier die Kurzform, damit er nicht abgeschnitten wird).

---

## 2) Service-Worker-Registrierung

**Wo:** im `<body>` ganz am Ende, direkt vor dem schließenden `</body>` — oder am Ende des bestehenden großen `<script>`-Blocks.

```html
<script>
  // Service Worker registrieren (nur wenn HTTPS / localhost)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('./sw.js')
        .then(function(reg) {
          console.log('[PWA] Service Worker aktiv, Scope:', reg.scope);
        })
        .catch(function(err) {
          console.warn('[PWA] Service Worker nicht registriert:', err);
        });
    });
  }
</script>
```

**Was das tut:**
- Auf GitHub Pages (HTTPS) läuft die Registrierung automatisch.
- Beim ersten Besuch installiert der Browser den Service Worker im Hintergrund und lädt alle Kern-Assets in den Cache.
- Beim zweiten Besuch startet die Seite sofort — auch offline.
- Updates (neue Version der `index.html` oder neues `sw.js`) werden beim nächsten Laden geholt und beim nächsten Start aktiviert.

---

## 3) Ablauf zum Live-Schalten

1. Alle Dateien (`index.html`, `dozenten-auswertung.html`, `manifest.json`, `sw.js`, `icons/`) in dein GitHub-Repo pushen.
2. In den Repo-Settings unter **Pages** den Branch aktivieren.
3. Im iPhone-Safari die Adresse öffnen.
4. **„Teilen" → „Zum Home-Bildschirm"** → CR-Trainer erscheint als App.

---

## 4) Updates rollen aus

Wenn du später Änderungen pushst:
- **HTML-Änderungen** (z. B. neuer Fall in `index.html`): werden sofort beim nächsten Öffnen geholt (network-first Strategie).
- **Asset-Änderungen** (z. B. neue Icons): erst sichtbar, wenn du in `sw.js` die `CACHE_VERSION` hochzählst (`'crt-v1'` → `'crt-v2'`). Erst damit verwirft der Service Worker den alten Asset-Cache.

Daumenregel: **Cache-Version bei jedem Release um 1 erhöhen** — dann bist du auf der sicheren Seite.

---

## 5) Prüfen, ob die PWA installierbar ist

Nach dem Push kannst du in Chrome DevTools auf dem Desktop prüfen:
1. Seite öffnen
2. DevTools → **Application**-Tab
3. links unter **Manifest** stehen Name, Icons, Start-URL
4. unter **Service Workers** sollte „activated and running" stehen
5. unter **Lighthouse** kannst du einen PWA-Audit laufen lassen — grüner Haken bedeutet: iPhone-Safari erkennt die App und bietet die Installation an.

Falls Lighthouse meckert („Manifest is not installable"), fehlt meist nur eins der `icon-192.png` / `icon-512.png` — beides ist bei dir gesetzt, also sollte das sauber durchlaufen.
