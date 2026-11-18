const nombreCache = 'APV-V12'; //Crea el nombre del archivo cache
const archivos = [  // Los archivos que se quieren cachear (deben ser pocos ya que ocupa tiempo en guardar en cache)
    '/',
    '/index.html',
    '/error.html',
    '/css/bootstrap.css',
    '/css/styles.css',
    '/js/app.js',
    '/js/apv.js',
    'manifest.json'
];

self.addEventListener('install', e => {
    console.log('Service Worker instalado con exito');

    // Espera hasta que abra el archivo cache
    e.waitUntil(
        caches.open(nombreCache)
            // Entonces cachea los archivos del array
            .then(cache => {
                console.log('cacheando...');
                cache.addAll(archivos)
            })
    )

})

self.addEventListener('activate', e => {
    //console.log(e);

    e.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(
                    // Filtro la version que coincida con la version actual guardada en la variable
                    keys.filter(key => key !== nombreCache)
                        // Borra las versiones que no son iguales a la variable
                        .map(key => caches.delete(key))
                )
            })
    )
})

self.addEventListener('fetch', e => {
    console.log('Fetch...', e);

    e.respondWith(
        // Estructura vista en el curso

        // caches.match(e.request)
        //     .then(respuestaCache => {
        //         return respuestaCache;
        //     })
        //     .catch(() => caches.match('/error.html'))


        // Asi lo recomienda la documentación de mozilla
        (async function () {
            const cachedResponse = await caches.match(e.request);
            if (cachedResponse) {
                return cachedResponse;
            }
            return caches.match('/error.html');
        })()    // <-- Importante estos paréntesis finales!!
    );
})