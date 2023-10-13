
self.addEventListener('fetch', event => {
    // if (event.request.url.includes('style.css')) {
    //     let respuesta = new Response(`
    //         body {
    //             background-color: red !important;
    //             color: pink;
    //         }
    //     `, {
    //         headers: {
    //             'Content-Type': 'text/css'
    //         }
    //     })

    //     event.respondWith(respuesta)
    // } else {
    //     event.respondWith(fetch(event.request))
    // }
    const resp = fetch(event.request)
    .then(res => {
        return res.ok ? res : fetch('img/main.jpg')
    })

    event.respondWith( resp )
})
