const CACHE_STATIC_NAME = 'static-v2'
const CACHE_DYNAMIC_NAME = 'dynamic-v1'

const CACHE_INMUTABLE_NAME = 'inmutable-v1'

const CACHE_LIMIT = 50

function limpiarCache( cacheName, numeroItems ) {
    caches.open( cacheName )
    .then(cache => {
        return cache.keys()
        .then(keys => {
            if (keys.length > numeroItems) {
                // borrar en forma recursiva los caches viejos
                cache.delete(keys[0]).then(limpiarCache(cacheName, numeroItems))
            }
        })
    })
}

self.addEventListener('install', e => {
    const cacheEstatico = caches.open( CACHE_STATIC_NAME )
    .then(cache => {
        return cache.addAll([
            '/04-cache-offline/',
            '/04-cache-offline/index.html',
            '/04-cache-offline/css/style.css',
            '/04-cache-offline/img/main.jpg',
            '/04-cache-offline/js/app.js'
        ])
    })

    const cacheInmutable = caches.open( CACHE_INMUTABLE_NAME )
    .then(cache => cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css' ))

    e.waitUntil( Promise.all([cacheEstatico, cacheInmutable ]))

})

self.addEventListener('fetch', e => {
    // ==============================================
    // 3- Cache with network update   (Stale While Revalidate)
    // Cuando el rendimiento es critico
    // el cache siempre estará un paso atraz 
    // (primero mostramos cache y luego actualizamos el mismo)
    // ==============================================
    if (e.request.url.includes('bootstrap')) {
        return e.respondWith(caches.match(e.request))
    }
    
    const respuesta = caches.open(CACHE_STATIC_NAME)
    .then(cache => {
        fetch(e.request).then(newREs => cache.put(e.request, newREs))

        return cache.match(e.request)
    })

    e.respondWith( respuesta )

    // ==============================================
    // 3- Cache Network with cache fallback (Network First)
    // ==============================================
    // const respuesta = fetch(e.request).then(res => {
    //     if ( !res) return caches.match(e.request)
        
    //     caches.open( CACHE_DYNAMIC_NAME )
    //     .then( cache => {
    //         cache.put( e.request, res)

    //         limpiarCache(CACHE_DYNAMIC_NAME, CACHE_LIMIT)
    //     })

    //     return res.clone()
    // }).catch( err => {
    //     return caches.match(e.request)
    // })

    // e.respondWith( respuesta )

    // ==============================================
    // 2 - Cache with network fallback (Cache First)
    // busca primero en cache y si no encuentra va a internet
    // ==============================================
    // const respuesta = caches.match( e.request )
    // .then(res => {
    //     if (res) return res

    //     return fetch( e.request )
    //     .then(resp => {
    //         caches.open( CACHE_DYNAMIC_NAME )
    //         .then(cache => {
    //             cache.put( e.request, resp)

    //             limpiarCache( CACHE_DYNAMIC_NAME, 50 )
    //         })

    //         return resp.clone()
    //     })
    // })

    // e.respondWith( respuesta )

    // 1 - Cache only
    // cuando toda la aplicacion carga desde cache
    // e.respondWith( caches.match( e.request ) )
})