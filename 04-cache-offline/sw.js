const CACHE_STATIC_NAME = 'static-v2'
const CACHE_DYNAMIC_NAME = 'dynamic-v1'

const CACHE_INMUTABLE_NAME = 'inmutable-v1'

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

    // 2 - Cache with network fallback
    // busca primero en cache y si no encuentra va a internet
    const respuesta = caches.match( e.request )
    .then(res => {
        if (res) return res

        return fetch( e.request )
        .then(resp => {
            caches.open( CACHE_DYNAMIC_NAME )
            .then(cache => {
                cache.put( e.request, resp)
            })

            return resp.clone()
        })
    })

    e.respondWith( respuesta )

    // 1 - Cache only
    // cuando toda la aplicacion carga desde cache
    // e.respondWith( caches.match( e.request ) )
})