<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h2>Your new Kuzzle Plugin Front-End</h2>
    <p><b>Node Version:</b> {{ nodeVersion }}</p>
    <p><b>Kuzzle Version:</b> {{ version }}</p>
    <p><b>Uptime:</b> {{ uptime }}</p>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      nodeVersion: "0",
      version: "0v",
      uptime: "0s",
    }
  },
  async mounted() {
    let res = await window.kuzzle.server.info();
    this.nodeVersion = res.serverInfo.kuzzle.nodeVersion;
    this.version = res.serverInfo.kuzzle.version;
    this.uptime = res.serverInfo.kuzzle.uptime;
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background: #d3d3d38c;
  border-radius: 15px;
  padding: 1em;
}
</style>
