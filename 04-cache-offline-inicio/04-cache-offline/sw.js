

self.addEventListener('fetch', event => {
    const offlineResp = new Response(`
        Error

        No existe conexió a  internet.
    `)

    const resp = fetch(event.request)
    .catch(() => offlineResp )

    event.respondWith(resp)
})