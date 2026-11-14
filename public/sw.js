// Service Worker Cache-First para Next.js en Cloudflare Pages (OWASP A03:2025 Same-Origin Isolation)
const CACHE_NAME = 'portal-migrante-next-v2.0.0';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/guias/',
  '/requisitos/',
  '/checklist/',
  '/directorio/',
  '/emergencias/',
  '/data/guias.json',
  '/data/guias_tramites.json',
  '/data/directorio.json',
  '/data/directorio_instituciones.json',
  '/data/emergencias.json',
  '/data/numeros_emergencia.json',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch(() => {});
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
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const reqUrl = new URL(event.request.url);
  if (reqUrl.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        })
        .catch(() => {
          if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/emergencias/') || caches.match('/');
          }
        });
    })
  );
});
