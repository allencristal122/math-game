const CACHE_NAME = 'math-game-cache-v1';
const urlsToCache = [
    './', // Ensure this works for index.html
    './index.html',
    './style.css',
    './script.js'
];

// Install and Cache Files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch(error => console.error('Failed to cache:', error))
    );
});

// Fetch Cached Resources
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
            .catch(() => console.log('Fetch failed, offline mode active'))
    );
});

// Activate and Clean Up Old Caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cache => cache !== CACHE_NAME)
                    .map(cache => caches.delete(cache))
            );
        })
    );
});
