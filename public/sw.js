// Service Worker for caching strategies
const CACHE_NAME = 'building-app-v2';
const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v2';
const IMAGE_CACHE = 'images-v2';
const API_CACHE = 'api-v2';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/3.jpg',
  '/4.jpg',
  '/29.09.2025 г..glb'
];

// Cache strategies for different resource types
const CACHE_STRATEGIES = {
  images: 'cache-first',
  scripts: 'stale-while-revalidate',
  styles: 'stale-while-revalidate',
  html: 'network-first',
  api: 'network-first'
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - implement advanced caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Determine resource type and apply appropriate strategy
  const resourceType = getResourceType(url);
  const strategy = CACHE_STRATEGIES[resourceType] || 'network-first';

  switch (strategy) {
    case 'cache-first':
      event.respondWith(cacheFirst(request, getCacheName(resourceType)));
      break;
    case 'stale-while-revalidate':
      event.respondWith(staleWhileRevalidate(request, getCacheName(resourceType)));
      break;
    case 'network-first':
      event.respondWith(networkFirst(request, getCacheName(resourceType)));
      break;
    default:
      event.respondWith(networkFirst(request, DYNAMIC_CACHE));
  }
});

// Determine resource type
function getResourceType(url) {
  const pathname = url.pathname;
  if (pathname.match(/\.(jpg|jpeg|png|webp|gif|svg|ico)$/i)) return 'images';
  if (pathname.match(/\.(js|mjs)$/i)) return 'scripts';
  if (pathname.match(/\.(css)$/i)) return 'styles';
  if (pathname.match(/\.(html)$/i)) return 'html';
  if (pathname.match(/\/api\//)) return 'api';
  return 'other';
}

// Get appropriate cache name
function getCacheName(resourceType) {
  switch (resourceType) {
    case 'images': return IMAGE_CACHE;
    case 'api': return API_CACHE;
    default: return DYNAMIC_CACHE;
  }
}

// Cache first strategy (for images and 3D models)
async function cacheFirst(request, cacheName = DYNAMIC_CACHE) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Cache first failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Network first strategy (for HTML)
async function networkFirst(request, cacheName = DYNAMIC_CACHE) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network first failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Offline', { status: 503 });
  }
}

// Stale while revalidate strategy (for JS/CSS)
async function staleWhileRevalidate(request, cacheName = DYNAMIC_CACHE) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => cachedResponse);
  
  return cachedResponse || fetchPromise;
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle offline actions when connection is restored
  console.log('Background sync triggered');
}
