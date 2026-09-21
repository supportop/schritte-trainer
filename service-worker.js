const CACHE='schritte-trainer-pages-v8';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));
  self.skipWaiting();
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  const networkFirst=e.request.mode==='navigate'||u.pathname.endsWith('/sync-config.js')||u.pathname.endsWith('/index.html');
  if(networkFirst){
    e.respondWith(fetch(e.request).then(res=>{
      const copy=res.clone();
      if(u.origin===location.origin)caches.open(CACHE).then(c=>c.put(e.request,copy));
      return res;
    }).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
    return;
  }
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{
    const copy=res.clone();
    if(u.origin===location.origin)caches.open(CACHE).then(c=>c.put(e.request,copy));
    return res;
  })));
});
