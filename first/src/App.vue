<template>
  <div id="app">
    <MySelf></MySelf>
  </div>
</template>

<script>
import {} from './config/rem'
import MySelf from "./components/common/MySelf";
export default {
  name: 'App',
  components: {MySelf}
}
</script>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
</style>
