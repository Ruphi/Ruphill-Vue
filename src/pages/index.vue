<template>
  <v-container>
    <v-card>
      <v-layout row fill-height>
        <v-flex xs12>
          <v-img src="/static/imgs/index/personal-bg.jpg" height="100vh">
            <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=453413861&auto=1&height=66"></iframe>
            <div class="card-img-text" style="margin-right: 30px"><h2 class="second"> 前進する</h2></div>
            <div class="card-img-text"><h2 class="first">一颗橡皮</h2></div>
            <v-container style="float: right">
              <v-card-title primary-title style="float: right;border: 1px solid #26A69A;margin-top: 20vh;margin-right: 30px;box-shadow: 0 3px 1px -2px #00695C, 0 2px 2px 0 #4DB6AC, 0 1px 5px 0 #B2DFDB;border-radius: 2px;">
                <div style="text-align: left; margin-top: 10vh;">
                  <div style="padding: 8px; color: #009688">
                    <h3 class="headline mb-0">生活，</h3>
                    <h3 class="headline mb-0">不只有</h3>
                    <h3 class="headline mb-0">苟且；</h3>
                    <h3 class="headline mb-0">还有</h3>
                    <h3 class="headline mb-0">诗和远方。</h3>
                  </div>

                  <v-card-actions>
                    <v-btn flat outline color="orange">进入空间</v-btn>
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
    margin-top: 100px;
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
</style>
