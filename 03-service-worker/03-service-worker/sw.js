
// Ciclo de vida del SW

self.addEventListener('install', event => {
    // creacion de cache
    console.log('Instalando serviceWorker V1.0.0')

    const instalacion = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Instalacion completada')
            self.skipWaiting()  // actualiza en automatico la cache
            resolve();
        }, 1);
    })

    event.waitUntil(instalacion)
})

self.addEventListener('activate', event => {
    // borrar cache viejo

    console.log('SW: Activo y listo para controlar la app')
})

// ================================
// FETCH: Manejo de peticiones HTTP
// ================================
self.addEventListener('fetch', event => {
    // aplicar estrategias de cache
    // console.log('SW: ', event.request.url)

    // if (event.request.url.includes('https://reqres.in')) {
    //     const respuesta = new Response(`
    //         {
    //             ok: false,
    //             mensaje: 'jajajaja'
    //         }
    //     `)

    //     event.respondWith(respuesta)
    // }
})

// ================================
// SYNC: recuperamos conexion a internet
// ================================
self.addEventListener('sync', event => {
    console.log('Conectado de nuevo...')

    console.log(event)
    console.log(event.tag)
})

// ================================
// PUSH: Manejar las push notifications
// ================================
self.addEventListener('push', event => {
    console.log('SW: Notificación recibida')
    console.log(event)
})