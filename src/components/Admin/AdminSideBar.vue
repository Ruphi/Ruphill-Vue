<template>
  <v-navigation-drawer class="ruphi-index-sidebar" @input="setDrawerByInput" clipped fixed app v-model="drawer" mobile-break-point="960">
    <div class="ruphi-limit-max-height">
      <SideBarHeader></SideBarHeader>
      <AdminSideBarList></AdminSideBarList>
    </div>

    <v-bottom-nav class="ruphi-bottom-nav">
      <span class="pa-3">Ruphi &copy; {{new Date().getFullYear()}}</span>
    </v-bottom-nav>
    <v-btn
      class="ruphi-collect-index-sidebar-btn hidden-sm-and-down"
      @click.stop="toggleDrawer"
      fab
      small
      dark
      right
      color="indigo"
    >
      <v-icon>chevron_left</v-icon>
    </v-btn>
  </v-navigation-drawer>
</template>

<script>
    import SideBarHeader from '../SideBarHeader';
    import AdminSideBarList from './AdminSideBarList';
    export default {
      name: "AdminSideBar",
      components: {SideBarHeader, AdminSideBarList},
      data(){
        return {

        }
      },
      created(){
        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
          case 'sm':
            this.$store.commit('toggleDrawer');
            break;
        }
      },
      methods: {
        setDrawerByInput: function (ev){
          this.$store.commit('setDrawerByInput', ev)
        },
        toggleDrawer: function () {
          this.$store.commit('toggleDrawer');
        }
      },
      computed: {
        drawer:{
          get(){
            return this.$store.state.drawer;
          },
          set(){

          }
        }
      }
    }
</script>

<style scoped>
  .ruphi-index-sidebar{
    margin-top: 64px!important;
    max-height: calc(100% - 64px)!important;
  }
  .v-navigation-drawer--is-mobile{
    margin-top: 0!important;
    max-height: calc(100% - 0px)!important;
  }
  .ruphi-limit-max-height{
    max-height: calc(100% - 56px);
    height: calc(100% - 56px);
    overflow: auto;
  }
  .ruphi-bottom-nav{
    margin-top: -60px;
  }
  .ruphi-collect-index-sidebar-btn{
    margin-top: -16px;
    margin-left: 275px;
  }
</style>
