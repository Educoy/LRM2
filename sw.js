/* Service worker de la app de presupuestos.
   Guarda una copia en el teléfono para que abra sin señal.

   IMPORTANTE: cada vez que subas un index.html nuevo, súbele el número
   a VERSION. Si no, los teléfonos seguirán mostrando la versión vieja. */

const VERSION = 'v5';
const CACHE   = 'presupuestos-' + VERSION;
const FUENTES = 'fuentes-' + VERSION;

const ARCHIVOS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './html2canvas.min.js',
  './jspdf.umd.min.js',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './favicon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      /* uno por uno: si falta alguno, los demás se guardan igual */
      .then(c => Promise.all(ARCHIVOS.map(f => c.add(f).catch(()=>{}))))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(
        ks.filter(k => k !== CACHE && k !== FUENTES).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

const esFuente = u => u.hostname === 'fonts.googleapis.com' || u.hostname === 'fonts.gstatic.com';

self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET') return;

  let url;
  try{ url = new URL(req.url); }catch(_){ return; }

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
