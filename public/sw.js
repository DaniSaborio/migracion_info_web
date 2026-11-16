// Service Worker Network-First para contenido y datos, Cache-First para estáticos
const CACHE_NAME = 'portal-migrante-next-v2.4.0';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/index.txt',
  '/manifest.json',
  '/guias/',
  '/guias/index.html',
  '/guias/index.txt',
  '/requisitos/',
  '/requisitos/index.html',
  '/requisitos/index.txt',
  '/checklist/',
  '/checklist/index.html',
  '/checklist/index.txt',
  '/directorio/',
  '/directorio/index.html',
  '/directorio/index.txt',
  '/emergencias/',
  '/emergencias/index.html',
  '/emergencias/index.txt',
  '/guias/refugio/',
  '/guias/refugio/index.html',
  '/guias/refugio/index.txt',
  '/guias/categoria_especial_2026/',
  '/guias/categoria_especial_2026/index.html',
  '/guias/categoria_especial_2026/index.txt',
  '/guias/categoria-especial/',
  '/guias/categoria-especial/index.html',
  '/guias/categoria-especial/index.txt',
  '/guias/residencia_vinculo/',
  '/guias/residencia_vinculo/index.html',
  '/guias/residencia_vinculo/index.txt',
  '/guias/vinculo/',
  '/guias/vinculo/index.html',
  '/guias/vinculo/index.txt',
  '/guias/dimex_renovacion/',
  '/guias/dimex_renovacion/index.html',
  '/guias/dimex_renovacion/index.txt',
  '/guias/dimex/',
  '/guias/dimex/index.html',
  '/guias/dimex/index.txt',
  '/guias/seguro_ccss/',
  '/guias/seguro_ccss/index.html',
  '/guias/seguro_ccss/index.txt',
  '/guias/ccss/',
  '/guias/ccss/index.html',
  '/guias/ccss/index.txt',
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
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Precache partial error:', err);
      });
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

  const isRsc = reqUrl.searchParams.has('_rsc') ||
    (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/x-component')) ||
    reqUrl.pathname.endsWith('.txt');

  const isHtml = event.request.mode === 'navigate' ||
    (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html'));

  const isData = reqUrl.pathname.startsWith('/data/');

  // 1. Next.js RSC payload requests (Network-first with ignoreSearch cache fallback)
  if (isRsc) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
            return networkResponse;
          }
          // Si el servidor responde 404 a una petición con ?_rsc, buscar en caché ignorando search params
          return caches.match(event.request, { ignoreSearch: true }).then((cached) => {
            return cached || networkResponse;
          });
        })
        .catch(() => {
          return caches.match(event.request, { ignoreSearch: true });
        })
    );
    return;
  }

  // 2. HTML navigation requests
  if (isHtml) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
            return networkResponse;
          }
          // Si responde 404 (ej. falta barra final), intentar con barra o index.html
          return caches.match(event.request, { ignoreSearch: true }).then((cached) => {
            if (cached) return cached;
            if (!reqUrl.pathname.endsWith('/')) {
              return caches.match(`${reqUrl.pathname}/`);
            }
            return networkResponse;
          });
        })
        .catch(() => {
          return caches.match(event.request, { ignoreSearch: true }).then((cached) => {
            if (cached) return cached;
            if (!reqUrl.pathname.endsWith('/')) {
              return caches.match(`${reqUrl.pathname}/`);
            }
            return caches.match('/emergencias/') || caches.match('/');
          });
        })
    );
    return;
  }

  // 3. JSON Data requests (Network-first)
  if (isData) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(event.request, { ignoreSearch: true });
        })
    );
    return;
  }

  // 4. Static assets (Cache-first)
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      });
    })
  );
});
