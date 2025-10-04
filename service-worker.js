const CACHE_NAME = "ingrid80-v1";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./play.html",
  "./manifest.json",
  "./logo.png"
];

// ✅ Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        FILES_TO_CACHE.map((url) => cache.add(url).catch(err => console.warn("Skipped:", url)))
      );
    })
  );
  self.skipWaiting();
});

// ✅ Activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }))
    )
  );
  self.clients.claim();
});

// ✅ Fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
