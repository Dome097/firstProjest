<template>
  <div id="app">
    <Header></Header>
    <loading v-if="amendEndOfDataLoad"></loading>
    <router-view></router-view>
    <!--<FootGuide></FootGuide>-->
  </div>
</template>

<script>
import {} from './config/rem'
import Header from "./components/header/Header";
import FootGuide from "./components/footer/footGuide";
import Loading from "./components/common/loading";
export default {
  name: 'App',
  components: {Loading, Header, FootGuide},
  computed: {
    amendEndOfDataLoad () {
      console.log('this.$store.state.dome.endOfDataLoad',this.$store.state.dome.endOfDataLoad)
      return this.$store.state.dome.endOfDataLoad
    }
  }
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
  background-color: #f5f5f5;
}
</style>
