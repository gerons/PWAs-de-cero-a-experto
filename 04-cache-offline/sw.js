

self.addEventListener('install', e => {

    const crearCache = caches.open('cache-1')
    .then(cache => {
        return cache.addAll([
            '/04-cache-offline/',
            '/04-cache-offline/index.html',
            '/04-cache-offline/ccs/style.css',
            '/04-cache-offline/img/main.jpg',
            'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
            '/04-cache-offline/js/app.js'
        ])
    })

    e.waitUntil( crearCache )

})

self.addEventListener('fetch', e => {

    // 1 - Cache only
    // cuando toda la aplicacion carga desde cache
    e.respondWith( caches.match( e.request ) )
})