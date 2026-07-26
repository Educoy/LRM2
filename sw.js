/* Service worker de la app de presupuestos.
   Guarda una copia de la app en el teléfono para que abra sin señal.

   IMPORTANTE: cada vez que cambies index.html, súbele el número a VERSION.
   Si no lo haces, el teléfono va a seguir mostrando la versión vieja. */

const VERSION = 'v1';
const CACHE   = 'presupuestos-' + VERSION;
const FUENTES = 'fuentes-' + VERSION;

const ARCHIVOS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './vendor/html2canvas.min.js',
  './vendor/jspdf.umd.min.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon.png'
];

/* Instalación: guarda todo lo necesario */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ARCHIVOS))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

/* Activación: borra las copias de versiones anteriores */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(
        ks.filter(k => k !== CACHE && k !== FUENTES).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

const esFuente = url =>
  url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';

self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET') return;

  let url;
  try{ url = new URL(req.url); }catch(_){ return; }

  /* Fuentes de Google: se guardan la primera vez que hay señal */
  if(esFuente(url)){
    e.respondWith(
      caches.open(FUENTES).then(c =>
        c.match(req).then(hit => hit || fetch(req).then(res => {
          if(res && (res.ok || res.type === 'opaque')) c.put(req, res.clone());
          return res;
        }).catch(() => hit))
      )
    );
    return;
  }

  if(url.origin !== self.location.origin) return;

  /* Navegación: si no hay señal, se abre la copia guardada */
  if(req.mode === 'navigate'){
    e.respondWith(
      fetch(req)
        .then(res => {
          caches.open(CACHE).then(c => c.put('./index.html', res.clone())).catch(()=>{});
          return res;
        })
        .catch(() => caches.match('./index.html').then(r => r || caches.match('./')))
    );
    return;
  }

  /* Resto de archivos: primero la copia local, y se refresca de fondo */
  e.respondWith(
    caches.match(req).then(hit => {
      const red = fetch(req).then(res => {
        if(res && res.ok) caches.open(CACHE).then(c => c.put(req, res.clone())).catch(()=>{});
        return res;
      });
      return hit || red.catch(() => hit);
    })
  );
});
