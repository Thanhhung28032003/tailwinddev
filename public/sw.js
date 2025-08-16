// sw.js - Service Worker cache cơ bản cho TechNews
const CACHE_NAME = 'technews-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/main.js',
  '/output.css',
  '/styles.css',
  // Thêm các file tĩnh khác nếu cần
];

self.addEventListener('install', event => {
  console.log('Service Worker installed');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker activated');
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
