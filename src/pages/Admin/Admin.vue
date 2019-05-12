<template>
  <v-app>
    <Header></Header>
    <v-content>
      <AdminSideBar></AdminSideBar>
      <v-content class="ruphi-index-content">
        <v-btn
          class="ruphi-spread-index-sidebar-btn hidden-sm-and-down"
          @click="toggleDrawer"
          fab
          small
          dark
          left
          fixed
          color="indigo"
          v-if="!drawer"
        >
          <v-icon>chevron_right</v-icon>
        </v-btn>
        <router-view></router-view>
      </v-content>
    </v-content>
  </v-app>
</template>

<script>
    import Header from "../../components/Header";
    import AdminSideBar from "../../components/Admin/AdminSideBar";

    export default {
      name: "Admin",
      components: {AdminSideBar, Header},
      data(){
        return {

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
      },
      methods: {
        toggleDrawer: function () {
          this.$store.commit('toggleDrawer');
        }
      }
    }
</script>

<style scoped>
  .ruphi-spread-index-sidebar-btn{
    bottom: 36px;
    left: 2px;
  }

  @media screen and ( min-width: 960px){
    .ruphi-index-content {
      padding-left: 0 !important;
      margin-top: 64px !important;
      max-height: calc(100% - 64px) !important;
    }
  }

  @media screen and ( max-width: 960px){
    .ruphi-index-content {
      padding-left: 0 !important;
      margin-top: 48px !important;
      max-height: calc(100% - 48px) !important;
    }
  }
</style>
