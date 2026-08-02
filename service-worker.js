'use strict';
const CACHE='wa-mobile-v0.9.120-rebuild';
const CORE=['./', './index.html', './app.js', './style.css', './manifest.webmanifest', './version.json', './data/demo-cards.json', './data/automated-certification-v0992.json', './data/runtime-match-certification-v09116.json', './data/card-metadata-remediation-v0992.json', './data/original-campaign-v0964.json', './data/artwork-manifest.json', './data/authentic-starter-decks.json', './data/starter-edition-art-audit-v0967.json', './data/starter-roster-map.json', './data/booster-products.json', './data/original-offline-missions.json', './data/final-preservation-audit-v0952.json', './data/original-branding-audit-v0953.json', './data/original-audio-manifest.json', './data/starter-upgrade-recommendations-v0974.json', './data/product-build-recovery-v0977.json', './assets/audio/AppBackground.opus', './assets/audio/Bell.opus', './assets/audio/Crowd.opus', './assets/audio/MenuPress.opus', './assets/audio/GameAccepted.opus', './assets/audio/EventAdded.opus', './assets/audio/PinAttempt.opus', './assets/audio/Stinger1.opus', './assets/audio/Stinger3.opus', './assets/audio/Stinger4.opus', './assets/gai/LaunchPoster-v0972.png', './assets/gai/b-WWFWithAuthority.webp', './assets/gai/SplashScreen.webp', './assets/gai/WithAuthority.webp', './assets/gai/ring.webp', './assets/gai/ringoutside.webp', './assets/gai/card-back-page.webp', './assets/gai/momentum-back.webp', './assets/gai/specials-back.webp', './assets/gai/superstar-back.webp', './icons/wa-mobile-180.png', './icons/wa-mobile-192.png', './icons/wa-mobile-512.png', './favicon.png',
  './data/card-effect-pass-v0993.json',
  './data/edition-starter-verification-v0993.json',
  './data/unresolved-starter-source-pass-v0993.json',
  './data/mission-decoding-pass-v0993.json',
  './data/ui-mobile-pass-v0993.json',
  './data/consolidated-pass-certification-v0993.json',
  './PASS-v0.9.93.md'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==location.origin)return;
  const path=url.pathname;
  const isVersion=path.endsWith('/version.json');
  const isCore=event.request.mode==='navigate'||/\/(?:index\.html|app\.js|style\.css|manifest\.webmanifest)$/.test(path);
  const isRuntimeData=/\/data\/.*\.json$/.test(path);
  if(isVersion){
    event.respondWith(fetch(event.request,{cache:'no-store'}).catch(()=>caches.match('./version.json')));
    return;
  }
  if(isCore||isRuntimeData){
    event.respondWith(fetch(event.request,{cache:'no-store'}).then(response=>{
      if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(event.request,copy))}
      return response;
    }).catch(()=>caches.match(event.request).then(r=>r||caches.match('./index.html'))));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
    if(response&&response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(event.request,copy))}
    return response;
  })));
});
