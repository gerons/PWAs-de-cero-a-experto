

if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/04-cache-offline/sw.js');
}

// if ( window.caches ) {
//     caches.open('prueba-1')
//     caches.open('prueba-2')

//     //caches.has('prueba-2').then(console.log)
//     //caches.delete('prueba-1')

//     caches.open('cache-v1.1').then( cache => {
//         //cache.add('http://127.0.0.1:5501/04-cache-offline/index.html')

//         cache.addAll([
//             '/04-cache-offline/index.html',
//             '/04-cache-offline/paginas/offline.html',
//             '/04-cache-offline/css/style.css',
//             '/04-cache-offline/img/main.jpg'
//         ]).then(() => {
//             // cache.delete('http://127.0.0.1:5501/04-cache-offline/css/style.css')
//             cache.put('/04-cache-offline/index.html', new Response('Hola mundo'))
//         })

//         // cache.match('http://127.0.0.1:5501/04-cache-offline/index.html')
//         //     .then(res => {
//         //         res.text().then(console.log)
//         //     })


//         // devuelve todos los caches que hay
//         caches.keys().then(keys => console.log(keys))

//     })
// }