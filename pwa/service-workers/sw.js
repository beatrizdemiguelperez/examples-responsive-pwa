const ASSETS_CACHE = 'app-cache-v5';
const CDN_CACHE = 'cdn-cache-v5';
const urlsToCache = [
  'app.css',
  'app.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(ASSETS_CACHE).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});



self.addEventListener('fetch', (event) => {
    const request = event.request;
    const isGETRequest = request.method === 'GET';
    const url = request.url;

    if(!isGETRequest) {
        return;
    }

    // dynamic urls
    if (url.match(/cdn.example.com/)) {
        event.respondWith(
            caches.open(CDN_CACHE).then((cache) => {
                return cache.match(request).then((response) => {
                    if (response) {
                        return response;
                    }
            
                    return fetch(request).then((response) => {
                        cache.put(request, response.clone());
                        return response;
                    });
                })
            })
        );
    }

    event.respondWith(
        caches.match(request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(request);
        })
    );
});


self.addEventListener('activate', (event) => {
    event.waitUntil(cleanUpCaches([ASSETS_CACHE, CDN_CACHE]));
});

/*
 * Deletes all caches except whitelist
 */
function cleanUpCaches(cacheWhitelist = []) {
    debugger;
    return caches.keys().then((cacheNames) => {
        Promise.all(
            cacheNames.map((cacheName) => {
              if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
              }
            })
        ); 
    });
  };