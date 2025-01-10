const CACHE_NAME = 'qna-pwa-cache-v6';
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
    './images/qna1.gif',
    './images/qna2.gif',
    './images/qna3_1.jpg',
    './images/qna3.2.gif',
    './images/qna3_3.jpg',
    './images/qna4(en).jpg',
    './images/qna4(zh).jpg',
    './images/qna4.1.jpg',
    './images/qna5.jpg',
    './images/qna6.1.jpg',
    './images/qna_6.jpg',
    './images/ddds(en).gif',
    './images/qna8.jpg',
    './images/qna9.jpg'
];

// Install event - Cache all required files
self.addEventListener('install', event => {
    console.log('[Service Worker] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Caching all files');
                return cache.addAll(urlsToCache);
            })
            .catch(err => console.error('[Service Worker] Caching failed:', err))
    );
    self.skipWaiting();
});

// Fetch event - Normalize URLs and serve from cache
self.addEventListener('fetch', event => {
    const requestUrl = new URL(event.request.url);

    // Remove query parameters for matching with cached URLs
    const normalizedUrl = requestUrl.origin + requestUrl.pathname;

    event.respondWith(
        caches.match(normalizedUrl).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse; // Serve from cache
            }

            return fetch(event.request)
                .then(networkResponse => {
                    // Cache the new response if it's a GET request
                    if (event.request.method === 'GET') {
                        return caches.open(CACHE_NAME).then(cache => {
                            cache.put(normalizedUrl, networkResponse.clone());
                            return networkResponse;
                        });
                    }
                    return networkResponse;
                })
                .catch(() => {
                    // Offline fallback for HTML files
                    if (event.request.destination === 'document') {
                        if (requestUrl.pathname.includes('qna.html')) {
                            return caches.match('./qna.html');
                        }
                        return caches.match('./index.html');
                    }
                });
        })
    );
});

// Activate event - Clean up old caches
self.addEventListener('activate', event => {
    console.log('[Service Worker] Activating...');
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (!cacheWhitelist.includes(cache)) {
                        console.log('[Service Worker] Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    self.clients.claim();
});