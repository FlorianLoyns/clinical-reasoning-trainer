/**
 * Service Worker für Clinical-Reasoning-Trainer
 * ------------------------------------------------------------
 * Cache-Strategie:
 *   - HTML (index.html / Navigation):  network-first
 *     → so bekommen Lernende Updates sofort, wenn online.
 *   - Assets (Icons, Manifest):        cache-first
 *     → schnell und offline-fähig.
 *
 * Bei einer neuen CACHE_VERSION verwirft die PWA die alten Caches
 * automatisch beim nächsten Aktivieren. Version bei jedem Release
 * hochzählen (z. B. crt-v1 → crt-v2).
 *
 * WICHTIG: dozenten-auswertung.html wird bewusst NICHT gecacht
 * und ist kein Teil der PWA-Oberfläche.
 */

const CACHE_VERSION = 'crt-v1';

const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/icon-maskable-512.png',
  './icons/favicon-32.png'
];

// ---- INSTALL: Kern-Dateien vorab in den Cache legen ----
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(function(cache) { return cache.addAll(CORE_ASSETS); })
      .then(function() { return self.skipWaiting(); })
  );
});

// ---- ACTIVATE: alte Cache-Versionen aufräumen ----
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names
          .filter(function(n) { return n !== CACHE_VERSION; })
          .map(function(n)  { return caches.delete(n); })
      );
    }).then(function() { return self.clients.claim(); })
  );
});

// ---- FETCH: Anfragen abfangen ----
self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;

  var url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  // Dozenten-Auswertung NICHT durch die PWA laufen lassen
  if (url.pathname.indexOf('dozenten-auswertung') !== -1) return;

  var isHTML = event.request.mode === 'navigate'
            || event.request.destination === 'document';

  if (isHTML) {
    // HTML: erst Netzwerk, dann Cache als Fallback
    event.respondWith(
      fetch(event.request).then(function(res) {
        var clone = res.clone();
        caches.open(CACHE_VERSION).then(function(c) {
          c.put(event.request, clone);
        });
        return res;
      }).catch(function() {
        return caches.match(event.request).then(function(r) {
          return r || caches.match('./index.html');
        });
      })
    );
    return;
  }

  // Assets: erst Cache, dann Netzwerk
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) return cached;
      return fetch(event.request).then(function(res) {
        if (res.ok) {
          var clone = res.clone();
          caches.open(CACHE_VERSION).then(function(c) {
            c.put(event.request, clone);
          });
        }
        return res;
      });
    })
  );
});
