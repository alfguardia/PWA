

self.addEventListener('install', e => {
    console.log('Service Worker instalado con exito');
    console.log(e);
})

self.addEventListener('activate', e => {
    console.log('Service Worker activado');
    console.log(e);
})

self.addEventListener('fetch', e => {
    console.log('Fetch...', e);
})