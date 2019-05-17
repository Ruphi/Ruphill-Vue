<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  body{
    margin: 0;
  }

  .v-navigation-drawer--is-mobile{
    z-index: 6500;
  }

  @media screen and ( max-width: 960px){
    .ruphi-index-sidebar {
      z-index: 6500!important;
    }
  }
  
  .v-snack{
    z-index: 6200!important;
  }
</style>
