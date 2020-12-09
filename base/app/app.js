// Instantiate a 'global' kuzzle sdk.
window.kuzzle = new KuzzleSDK.Kuzzle(
    new KuzzleSDK.WebSocket('A REAL KUZZLE SERVER URL HERE', { sslConnection:true })
);

kuzzle.on('networkError', error => {
    console.error('Network Error: ', error)
});

kuzzle.on('connected', () => {
    console.log('Successfully connected to Kuzzle')
});


(async() => {
    await kuzzle.connect()

    loadjs(['http://your-distant-service:4000/plugin/kuzzle-plugin/kuzzle-plugin.js'], 'kuzzle-plugin-bundle');

    loadjs.ready('kuzzle-plugin-bundle', function() {
        let plugin = document.createElement('kuzzle-plugin');
        document.body.appendChild(plugin);
    });

})()
