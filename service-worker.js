self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("ingrid80-cache").then(cache => {
      return cache.addAll(["/", "/index.html", "/play.html"]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
