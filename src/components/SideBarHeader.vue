<template>
  <v-card>
    <v-list class="pa-1 hidden-md-and-up">
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <v-img src="https://res.cloudinary.com/dcktxc7vt/image/upload/v1552743889/personal-site-for-project/king.jpg"></v-img>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title><router-link to="/index" class="ruphi-router-link">一颗橡皮</router-link></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
    export default {
      name: "SideBarHeader",
      methods: {

      }
    }
</script>

<style scoped>
  .ruphi-router-link{
    color: #000;
    text-decoration: none;
  }
</style>
