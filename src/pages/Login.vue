<template>
  <v-app id="login">
    <Header></Header>
    <v-layout row>
      <v-flex>
        <v-card class="ruphi-login-background">
          <v-img class="ruphi-login-background-img" src="http://przrk8h7u.bkt.clouddn.com/Po8d1EOmLDVCYcUs2z2nkB5V.jpg"></v-img>
        </v-card>
        <v-card class="ruphi-login-wrap">
          <v-form>
            <v-text-field
              label="昵称"
              required
            ></v-text-field>
            <v-text-field
              label="电子邮箱"
              required
            ></v-text-field>
            <v-text-field
              label="密码"
              required
            ></v-text-field>
            <v-btn color="primary" @click="">登录</v-btn>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
    import Header from "../components/Header";
    export default {
      name: "Login",
      components: {Header}
    }
</script>

<style scoped>
  .ruphi-login-background{
    margin: 20px 0 40px 0;
    border-radius: 0;
  }
  .ruphi-login-background-img{
    height: 40vh; border-radius: 0
  }
  .ruphi-login-wrap{
    margin: 0 auto;
    padding: 10px 20px
  }
  @media screen and (min-width:600px){
    .ruphi-login-wrap{
      width: 450px;
    }
  }
  @media screen and (max-width: 600px){
    .ruphi-login-wrap{
      width: 80%;
    }
  }
</style>
