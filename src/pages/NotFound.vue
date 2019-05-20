<template>
  <v-app id="404">
    <Header></Header>
    <v-img src="static/imgs/404.png">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <div class="text-md-center">
            <h1>404</h1>
            <h2 class="my-3 headline ">Oh! 页面被藏起来了吧!</h2>
            <div>
              <v-btn color="primary" @click="goHome">返回主页看看</v-btn>
            </div>
          </div>
        </v-layout>
      </v-container>
    </v-img>
  </v-app>
</template>

<script>
    import Header from "../components/Header";
    export default {
      name: "NotFound",
      components: {Header},
      methods: {
        goHome(){
          this.$router.push('index');
        }
      }
    }
</script>

<style scoped>
  h1 {
    font-size: 150px;
    line-height: 150px;
    font-weight: 700;
    color: #252932;
    text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px, rgba(61, 61, 61, 0.3) 3px 3px;
  }
</style>
