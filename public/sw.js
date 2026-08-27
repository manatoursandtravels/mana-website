/* ═════════════════════════════════════════════════════════════════════
   MANA Tours & Travels — Progressive Web App Service Worker v3.0
   Offline Highway Support | Stale-While-Revalidate | Background Sync
   ═════════════════════════════════════════════════════════════════════ */

const CACHE_VERSION = 'v3';
const CACHE_STATIC  = `mana-static-${CACHE_VERSION}`;
const CACHE_PAGES   = `mana-pages-${CACHE_VERSION}`;
const CACHE_IMAGES  = `mana-images-${CACHE_VERSION}`;

// Critical shell assets — cached on install
const STATIC_ASSETS = [
  '/',
  '/offline',
  '/manifest.webmanifest',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/apple-touch-icon.png',
  '/images/logo.png',
];

// Key pages to pre-cache for offline pilgrimage customers
const PREFETCH_PAGES = [
  '/routes/kadapa-tirupati-cab',
  '/routes/kadapa-hyderabad-cab',
  '/routes/kadapa-bangalore-cab',
  '/services/pilgrimage-tours',
  '/services/self-drive',
  '/contact',
  '/faq',
];

// ── 1. INSTALL — Pre-cache static shell + key pages ──────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_STATIC).then((cache) => cache.addAll(STATIC_ASSETS)),
      caches.open(CACHE_PAGES).then((cache) => {
        // Best-effort pre-cache of key pages — failures don't block install
        return Promise.allSettled(PREFETCH_PAGES.map(url => cache.add(url)));
      }),
    ]).then(() => self.skipWaiting())
  );
});

// ── 2. ACTIVATE — Clean old caches ───────────────────────────────────
self.addEventListener('activate', (event) => {
  const VALID_CACHES = [CACHE_STATIC, CACHE_PAGES, CACHE_IMAGES];
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (!VALID_CACHES.includes(key)) {
            console.log('[MANA SW] Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

// ── 3. FETCH — Smart strategy by request type ────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET, cross-origin, and API requests
  if (request.method !== 'GET') return;
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/')) return;
  if (url.pathname.startsWith('/_next/webpack-hmr')) return;

  // IMAGES: Cache-first (fastest UX for repeat visitors)
  if (request.destination === 'image') {
    event.respondWith(cacheFirstImages(request));
    return;
  }

  // STATIC ASSETS (JS, CSS, fonts): Stale-While-Revalidate
  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'font' ||
    url.pathname.startsWith('/_next/static/')
  ) {
    event.respondWith(staleWhileRevalidate(request, CACHE_STATIC));
    return;
  }

  // HTML NAVIGATION: Network-first with offline fallback
  if (request.mode === 'navigate') {
    event.respondWith(networkFirstPages(request));
    return;
  }
});

// ── Helper: Cache-First for images ───────────────────────────────────
async function cacheFirstImages(request) {
  const cached = await caches.match(request, { cacheName: CACHE_IMAGES });
  if (cached) return cached;
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_IMAGES);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    return new Response('', { status: 408 });
  }
}

// ── Helper: Stale-While-Revalidate for static assets ─────────────────
async function staleWhileRevalidate(request, cacheName) {
  const cached = await caches.match(request, { cacheName });
  const networkFetch = fetch(request).then((networkResponse) => {
    if (networkResponse && networkResponse.status === 200) {
      caches.open(cacheName).then((cache) => cache.put(request, networkResponse.clone()));
    }
    return networkResponse;
  }).catch(() => cached);
  return cached || networkFetch;
}

// ── Helper: Network-First for HTML pages ─────────────────────────────
async function networkFirstPages(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_PAGES);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch {
    const cached = await caches.match(request, { cacheName: CACHE_PAGES });
    if (cached) return cached;
    // Full offline fallback
    return caches.match('/offline', { cacheName: CACHE_STATIC });
  }
}

// ── 4. BACKGROUND SYNC (for failed form submissions) ─────────────────
self.addEventListener('sync', (event) => {
  if (event.tag === 'mana-booking-sync') {
    event.waitUntil(replayFailedBookings());
  }
});

async function replayFailedBookings() {
  // Open IndexedDB to replay any queued booking requests
  // This is a stub — actual IDB integration handled by BookingForm component
  console.log('[MANA SW] Replaying failed booking submissions...');
}

// ── 5. PUSH NOTIFICATIONS (for booking confirmations) ────────────────
self.addEventListener('push', (event) => {
  if (!event.data) return;
  let data = {};
  try { data = event.data.json(); } catch { data = { title: 'MANA Tours', body: event.data.text() }; }

  const options = {
    body: data.body || 'Your MANA Tours booking update is ready.',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
    vibrate: [200, 100, 200],
    data: { url: data.url || '/' },
    actions: [
      { action: 'open', title: '✓ View Booking' },
      { action: 'dismiss', title: '✕ Dismiss' },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'MANA Tours & Travels', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'dismiss') return;
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
