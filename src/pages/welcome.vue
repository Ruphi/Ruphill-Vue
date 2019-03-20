<template>
  <v-container>
    <v-card>
      <v-layout row fill-height>
        <v-flex xs12>
          <v-img src="https://res.cloudinary.com/dcktxc7vt/image/upload/v1552567785/personal-site-for-project/personal-bg.jpg" height="100vh">
            <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=453413861&auto=1&height=66"></iframe>
            <div class="card-img-text" style="margin-right: 30px"><h2 class="second"> 前進する</h2></div>
            <div class="card-img-text"><h2 class="first">一颗橡皮</h2></div>
            <v-container style="float: right">
              <v-card-title primary-title>
                <div style="text-align: left; margin-top: 10vh;">
                  <div style="padding: 8px; color: #009688">
                    <h3 class="headline mb-0">生活，</h3>
                    <h3 class="headline mb-0">不只有</h3>
                    <h3 class="headline mb-0">苟且；</h3>
                    <h3 class="headline mb-0">还有</h3>
                    <h3 class="headline mb-0">诗和远方。</h3>
                  </div>

                  <v-card-actions>
                    <v-btn flat outline color="orange" @click="toIndex">进入空间</v-btn>
                  </v-card-actions>
                </div>
              </v-card-title>

              <div style="position: absolute;bottom: 10px; right: 5px">

              </div>
            </v-container>
          </v-img>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
    export default {
      name: "index",
      data(){
        return {

        }
      },
      methods: {
        toIndex(){
          console.log(this);
          this.$router.push('/index');
        }
      }
    }
</script>

<style scoped>
  .card-img-text{
    font-family: "Microsoft YaHei UI";
    width: 40px;
    float: right;
  }
  .card-img-text .first{
    margin-top: 80px;
  }
  .content{
    height: 100vh;
  }
  .container{
    padding: 0;
  }
  .container.grid-list-md .layout:only-child{
    margin: 0;
  }
  .v-card__title{
    position: absolute;
    float: right;
    border: 1px solid rgb(38, 166, 154);
    box-shadow: rgb(0, 105, 92) 0px 3px 1px -2px, rgb(77, 182, 172) 0px 2px 2px 0px, rgb(178, 223, 219) 0px 1px 5px 0px;
    border-radius: 2px;
    right: 38px;
    bottom: 10px;
    background: rgba(255,255,255,0.6)
  }
</style>
