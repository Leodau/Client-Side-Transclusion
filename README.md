# 🎏 Client Side Transclusion (really..)
### A proof of concept, live injection of multiple exposed applications into a single base page.

## Modules.

### 1. The VueJS **/plugin**.

Contains an example VueJS application, on build it gets packaged into a webcomponent (see main.js)

```js
import Vue from "vue";
import wrap from "@vue/web-component-wrapper";

import App from "./App.vue";

// Parse sources, requirements and build a shadowdom tree.
const wrappedElement = wrap(Vue, App);

// Register a custom element on the destination context.
window.customElements.define("kuzzle-plugin", wrappedElement);
```

### 2. The **/distant** (should be a Kuzzle server exposing plugin front-ends).

Is a minimalistic static server in NodeJS, it exposes the **/dist/< plugin name >** folder that should contain our wc packaged (dist) VueJS app.

### 3. The 'base' Service.

Another NodeJS static server, it exposes the *app* folder containing a simple *index.html* file and a *app.js* script that where the magic happends.

1. It initializes a Kuzzle SDK instance and exposes it on the **window**.
2. Connects to the Kuzzle Backend.
3. Using **loadJs**, we load *known* 'exposed plugins' into the current site as a *package*.
4. Creates and appends the newly registered web-component into the page.

```js
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
```

## Dev Flow.

0. ```npm install``` everywhere.

1. Update the *base/app.js* file, your kuzzle host and your local *distant*(plugin server) url.

2. Build the app in the **plugin** folder with:

```npm run build -- --target wc --name kuzzle-plugin src/App.vue```

3. Copy the generated **dist** folder into a new folder < plugin-name > in the **distant/dist** folder.

4. Launch both the *distant* and *base* services, with ```node server```

5. Now you can access directly the *distant* to see the 'standalone' plugin micro-frontend. Or the *base* to check the injected version of it.


## Some resources that may be helpful.

- [Øredev 2017 - Gustaf Nilsson Kotte - Micro­service Websites](https://www.youtube.com/watch?v=j2ynHColelw)
- [Micro Frontends by Cam Jackson - Run-time integration via Web Components](https://martinfowler.com/articles/micro-frontends.html)
- [Declarative client-side transclusion with h-include](https://gustafnk.github.io/h-include/)
- [LoadJS](https://github.com/muicss/loadjs)
- [Create a web-component with VueJS](https://vuejsdevelopers.com/2018/05/21/vue-js-web-component/)
- [VueJS Build targets](https://cli.vuejs.org/guide/build-targets.html#library)

### Checkout Kuzzle Backend at [Kuzzle.io](https://kuzzle.io/) 🔥