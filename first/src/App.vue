<template>
  <div id="app">
  <MyHome></MyHome>
  </div>
</template>

<script>
import {} from './resize'
import MyHome from "./components/MyHome";
export default {
  name: 'App',
  components: {MyHome}
}
</script>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
*{
  text-decoration: none;
  margin: 0;
  padding: 0;
}
#app,html,body{
  width: 100%;
  height: 100%;
}
</style>
