

// Detectar si podemos usar Service Workers
if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js')
    .then(reg => {
        // setTimeout(() => {
        //     reg.sync.register('sync-todos')
        // }, 3000);

        Notification.requestPermission().then(result => {
            console.log(result)

            reg.showNotification('hola mundo')
        })
    })

}
