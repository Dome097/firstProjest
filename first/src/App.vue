<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <FootGuide></FootGuide>
  </div>
</template>

<script>
import {} from './config/rem'
import Header from "./components/header/Header";
import FootGuide from "./components/footer/footGuide";
export default {
  name: 'App',
  components: {Header, FootGuide}
}
</script>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
@import '../src/assets/icon.css';
*{
  text-decoration: none;
  margin: 0;
  padding: 0;
}
#app,html,body{
  width: 100%;
  height: 100%;
}
#app {
  margin-top: 0.44rem;
}
</style>
