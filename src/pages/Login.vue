<template>
  <v-app id="login">
    <Header></Header>
    <v-layout row>
      <v-flex>
        <v-card class="ruphi-login-background" flat>
          <v-img class="ruphi-login-background-img"></v-img>
        </v-card>
        <v-card class="ruphi-login-wrap">
          <v-img src="static/imgs/login/login_bg_a.png"></v-img>
          <v-form ref="form" class="ruphi-form">
            <v-text-field
              label="昵称"
              required
              v-model="user"
              prepend-inner-icon="account_circle"
              :rules="[rules.required]"
              @keydown.enter="login"
            ></v-text-field>
            <v-text-field
              label="电子邮箱"
              required
              v-model="mail"
              prepend-inner-icon="mail"
              :rules="[rules.required, rules.email]"
              @keydown.enter="login"
            ></v-text-field>
            <v-text-field
              label="密码"
              required
              v-model="password"
              prepend-inner-icon="security"
              :rules="[rules.required, rules.password]"
              @keydown.enter="login"
              type="password"
            ></v-text-field>
            <v-btn color="primary" @click.prevent="login">进入管理面板</v-btn>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
    <TopSnackbar :snackbar-text="snackbarText" :snackbar-timeout="snackbarTimeout"></TopSnackbar>
  </v-app>
</template>

<script>
    import Header from "../components/Header";
    import TopSnackbar from "../components/TopSnackbar";
    export default {
      name: "Login",
      components: {TopSnackbar, Header},
      data(){
        return {
          snackbarText: '',
          snackbarTimeout: 6000,
          user: '',
          mail: '',
          password: '',
          rules: {
            required: value => !!value || '此项不能为空！',
            email: value => {
              const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              return pattern.test(value) || '请检查格式！'
            },
            password: value => {
              const pattern = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
              return pattern.test(value) || '仅限输入数字+字母、字母+特殊字符、数字+特殊字符！'
            }
          }
        }
      },
      methods: {
        login(){
          const that = this;
          if (this.$refs.form.validate()) {//通过校验
            this.$rpserver.post('/api/user/login', {
              user: that.user,
              mail: that.mail,
              password: that.password
            }).then(res=>{
              that.showMsg(res.data.message);
              if (res.data.code === 0) {
                that.$router.push('/admin/dashboard/todo');
              }
            }).catch(err=>{
              that.showMsg('验证失败！');
            });
          }
        },
        showMsg: function (msg){
          this.snackbarText = msg;
          this.$store.commit('showTopSnackbar');
        },
      }
    }
</script>

<style scoped>
  .ruphi-login-background{
    margin: 20px 0 0 0;
    border-radius: 0;
    background-color: transparent!important;;
  }
  .ruphi-login-background-img{
    height: 15vh; border-radius: 0
  }
  .ruphi-login-wrap{
    margin: 0 auto;
    padding: 10px 20px
  }
  .ruphi-form .v-input{
    margin: 25px 0!important;
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
