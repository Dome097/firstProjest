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
</style>
