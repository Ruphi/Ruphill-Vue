<template>
  <v-container>
    <v-card>
      <v-layout row fill-height>
        <v-flex xs8>
          <v-img src="/static/imgs/index/personal-bg.jpg" height="100vh">
            <div class="card-img-text" style="margin-right: 30px"><h2 class="second"> 前進する</h2></div>
            <div class="card-img-text"><h2 class="first">一颗橡皮</h2></div>
          </v-img>
        </v-flex>
        <v-flex xs4 content>
          <v-container>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                <div>  </div>
              </div>
            </v-card-title>
            <div style="position: absolute;bottom: 10px; right: 5px">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat outline color="orange">进入空间</v-btn>
              </v-card-actions>
            </div>
          </v-container>
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
