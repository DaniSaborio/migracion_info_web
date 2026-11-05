// Service Worker con estrategia Cache-First para resiliencia offline PWA
const CACHE_NAME = 'portal-migrante-cache-v1.0.0';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './src/css/styles.css',
  './src/js/app.js',
  './src/js/storage.js',
  './src/js/orientador.js',
  './src/js/guias.js',
  './src/js/checklist.js',
  './src/js/directorio.js',
  './src/js/emergencias.js',
  './src/data/guias_tramites.json',
  './src/data/directorio.json',
  './src/data/emergencias.json',
  './icons/icon-192.svg',
  './icons/icon-512.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-cacheando recursos para funcionamiento desconectado...');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Limpiando caché antigua:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Estrategia Cache First, fallback a Network
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // En caso de fallo de red y estar en modo desconectado
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('./index.html');
        }
      });
    })
  );
});
