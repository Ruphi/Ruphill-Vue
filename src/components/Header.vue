<template>
    <v-toolbar color="primary" class="ruphi-header" fixed clipped dark>
      <v-btn icon class="hidden-md-and-up" @click="setDrawerAsTrue">
        <v-icon>menu</v-icon>
      </v-btn>
      <v-avatar class="hidden-sm-and-down">
        <v-img src="https://res.cloudinary.com/dcktxc7vt/image/upload/v1552743889/personal-site-for-project/king.jpg"></v-img>
      </v-avatar>
      <v-toolbar-title class="hidden-sm-and-down"><router-link to="/index" class="ruphi-router-link">一颗橡皮</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>文章</v-btn>
        <v-btn flat to="/pictures">图库</v-btn>
        <v-btn flat>音乐</v-btn>
        <v-btn flat to="/admin">管理</v-btn>
        <v-btn flat>关于我</v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-md-and-up">
        <v-btn icon to="/index">
          <v-icon>home</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>library_books</v-icon>
        </v-btn>
        <v-btn icon to="/pictures">
          <v-icon>photo_library</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>library_music</v-icon>
        </v-btn>
        <v-btn icon to="/admin/dashboard/todo">
          <v-icon>settings_applications</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>perm_identity</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
    export default {
      name: "Header",
      methods:{
        setDrawerAsTrue: function () {
          this.$store.commit('setDrawerAsTrue');
        }
      }
    }
</script>

<style scoped>
  .ruphi-header{
    z-index: 6000;
  }
  .ruphi-router-link{
    color: white;
    text-decoration: none;
  }
</style>
