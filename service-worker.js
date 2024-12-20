const CACHE_NAME = 'qna-pwa-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './qna.html',
    './style.css',
    './script.js',
    './translations.json',
    './manifest.json',
    './images/china.jpg',
    './images/exosome_1.jpg',
    './images/exosome.gif',
    './images/home.png',
    './images/japan.jpg',
    './images/logo-color.png',
    './images/usa.jpg',
];

// Install event
self.addEventListener('install', event => {
    console.log('[Service Worker] Install');
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('[Service Worker] Caching all files');
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    console.log(`[Service Worker] Fetching: ${event.request.url}`);
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        }).catch(() => {
            if (event.request.destination === 'document') {
                return caches.match('./index.html');
            }
        })
    );
});

// Activate event
self.addEventListener('activate', event => {
    console.log('[Service Worker] Activate');
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