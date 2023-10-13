
self.addEventListener('fetch', event => {
    // const offlineResponse = new Response(`
    //     <!DOCTYPE html>
    //     <html lang="en">
    //         <head>
    //             <meta charset="UTF-8">
    //             <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //             <meta http-equiv="X-UA-Compatible" content="ie=edge">
    //             <title>Mi PWA</title>
            
    //             <link rel="stylesheet" href="css/style.css">
    //         </head>
    //         <body class="container p-3">
    //             <h1>Sin internet...</h1>
    //         </body>
    //     </html>
    // `, {
    //     headers: {
    //         'Content-Type': 'text/html'
    //     }
    // })

    const offlineResponse = fetch('paginas/offlien.html')

    const resp = fetch(event.request)
        .catch(() => offlineResponse)

    event.respondWith( resp )
})