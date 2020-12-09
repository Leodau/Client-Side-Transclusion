import Vue from "vue";
import wrap from "@vue/web-component-wrapper";

import App from "./App.vue";

// Parse sources, requirements and build a shadowdom tree.
const wrappedElement = wrap(Vue, App);

// Register a custom element
window.customElements.define("kuzzle-plugin", wrappedElement);