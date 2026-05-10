const CACHE = 'cheka-v3';
const OFFLINE = [
  '/', '/index.html', '/landing.html', '/feed.html', '/login.html', '/signup.html',
  '/search.html', '/profile.html', '/messages.html', '/upload.html',
  '/battles.html', '/live.html', '/studio.html', '/onboarding.html',
  '/saved.html', '/creators.html', '/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(OFFLINE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Network-first for API calls
  if (url.hostname.includes('cheka-backend') || url.pathname.startsWith('/api/')) {
    e.respondWith(fetch(e.request).catch(() => new Response(JSON.stringify({ error: 'offline' }), { headers: { 'Content-Type': 'application/json' } })));
    return;
  }
  // Cache-first for static assets
  e.respondWith(caches.match(e.request).then(cached => {
    if (cached) return cached;
    return fetch(e.request).then(res => {
      if (res.ok && e.request.method === 'GET') {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return res;
    }).catch(() => caches.match('/index.html'));
  }));
});

// Push notifications
self.addEventListener('push', e => {
  if (!e.data) return;
  const data = e.data.json().catch(() => ({ title: 'Cheka', body: 'You have a new notification' }));
  e.waitUntil(self.registration.showNotification(data.title || 'Cheka', {
    body: data.body, icon: '/icon-192.png', badge: '/icon-192.png',
    data: { url: data.url || '/' }
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow(e.notification.data?.url || '/'));
});
