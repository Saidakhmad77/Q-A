const CACHE_NAME = 'qna-pwa-cache-v3';
const urlsToCache = [
    './',
    './index.html?v=3',
    './qna.html?v=3',
    './style.css?v=3',
    './script.js?v=3',
    './translations.json?v=3',
    './manifest.json?v=3',
    './images/china.jpg',
    './images/exosome_1.jpg',
    './images/exosome.gif',
    './images/home.png',
    './images/japan.jpg',
    './images/logo-color.png',
    './images/usa.jpg',
];

// Install event - Cache all required files
self.addEventListener('install', event => {
    console.log('[Service Worker] Install');
    self.skipWaiting(); // Immediately activate the new service worker
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('[Service Worker] Caching all files');
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch event - Serve files from cache first, then fallback to network
self.addEventListener('fetch', event => {
    console.log(`[Service Worker] Fetching: ${event.request.url}`);
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response; // Serve from cache
            }
            return fetch(event.request)
                .then(networkResponse => {
                    // Optionally cache new files retrieved from the network
                    return caches.open(CACHE_NAME).then(cache => {
                        if (event.request.method === 'GET') {
                            cache.put(event.request, networkResponse.clone());
                        }
                        return networkResponse;
                    });
                })
                .catch(() => {
                    // Offline fallback
                    if (event.request.destination === 'document') {
                        if (event.request.url.includes('qna.html')) {
                            return caches.match('./qna.html?v=3');
                        }
                        return caches.match('./index.html?v=3');
                    }
                });
        })
    );
});

self.addEventListener('activate', event => {
    console.log('[Service Worker] Activate');
    self.clients.claim();
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(keyList =>
            Promise.all(
                keyList.map(key => {
                    if (!cacheWhitelist.includes(key)) {
                        console.log(`[Service Worker] Deleting old cache: ${key}`);
                        return caches.delete(key);
                    }
                })
            )
        )
    );
});