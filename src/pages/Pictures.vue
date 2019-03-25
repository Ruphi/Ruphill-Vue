<template>
    <v-app>
      <Header></Header>
      <v-layout class="ruphi-pictures-container">
        <v-flex xs12 sm10 offset-sm1>
          <v-card>
            <v-container grid-list-md fluid>
              <v-layout row wrap>
                <v-flex xs6 sm4 v-for="(item,index) in imgArr" :key="index">
                  <v-card  tile @click="loadFullImg(item)">
                    <v-img :src="item" height="250">
                      <template v-slot:placeholder>
                        <v-layout
                          fill-height
                          align-center
                          justify-center
                          ma-0
                        >
                          <v-progress-circular indeterminate pa-2 color="blue lighten-5"></v-progress-circular>
                        </v-layout>
                      </template>
                    </v-img>
                  </v-card>
                </v-flex>
              </v-layout>
              <v-btn color="primary" @click="loadMoreImg">加载更多</v-btn>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
      <v-dialog v-model="imgDialog" max-width="80%">
          <v-window style="max-height: 80vh;">
            <v-card pa-2 @click="imgDialog=false">
              <v-img :src="dialogImgSrc" ma-2>
                <template v-slot:placeholder>
                  <v-layout
                    fill-height
                    align-center
                    justify-center
                    ma-0
                  >
                    <v-progress-circular indeterminate pa-2 color="blue lighten-5"></v-progress-circular>
                  </v-layout>
                </template>
              </v-img>
            </v-card>
          </v-window>
      </v-dialog>
      <v-snackbar
        v-model="snackbar"
        :bottom="snackbarY === 'bottom'"
        :left="snackbarX === 'left'"
        :multi-line="snackbarMode === 'multi-line'"
        :right="snackbarX === 'right'"
        :timeout="snackbarTimeout"
        :top="snackbarY === 'top'"
        :vertical="snackbarMode === 'vertical'"
      >
        {{ snackbarText }}
        <v-btn
          color="pink"
          flat
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
    </v-app>
</template>

<script>
    import Header from "../components/Header";

    export default {
      name: "Pictures",
      components: {Header},
      data(){
        return {
          imgArr: [],
          resultArr: [],
          next_cursor: 1,
          snackbar: false,
          snackbarY: 'top',
          snackbarX: null,
          snackbarMode: '',
          snackbarTimeout: 6000,
          snackbarText: '没有更多了！',
          imgDialog: false,
          dialogImgSrc: ''
        }
      },
      created() {
        var that = this;

        let basicUrl = 'https://res.cloudinary.com/dcktxc7vt/image/upload';
        that.imgArr = [];
        that.$axios.get('https://res.cloudinary.com/dcktxc7vt/image/list/ruphill.json',{
          params: {
            max_results: 9
          }
        }).then(function (response) {
            if (response && response.data && response.data.resources) {
              let temp = response.data.resources;
              for (let i = 0; i < temp.length; i++) {
                that.resultArr.push(basicUrl+'/v'+temp[i]['version']+'/'+temp[i]['public_id']+'.'+temp[i]['format']);
              }
              for (let i = 0; i < that.next_cursor*9; i++) {
                that.imgArr.push(that.resultArr[i]);
              }
            }
          });
      },
      methods: {
        loadMoreImg: function () {
          let cursor_pre = this.next_cursor;
          if (cursor_pre < Math.ceil(this.resultArr.length / 9)){
            this.next_cursor += 1;
            for (let i = cursor_pre * 9; i < (this.next_cursor * 9>this.resultArr.length?this.resultArr.length:this.next_cursor*9); i++) {
              this.imgArr.push(this.resultArr[i]);
            }
          }
          if (cursor_pre * 9 >= this.resultArr.length) {
            this.snackbar = true;
          }
        },
        loadFullImg: function (src) {
          this.dialogImgSrc = src;
          this.imgDialog = true;
        }
      }
    }
</script>

<style scoped>
  @media screen and ( min-width: 960px){
    .ruphi-pictures-container {
      margin-top: 68px !important;
    }
  }

  @media screen and ( max-width: 960px){
    .ruphi-pictures-container {
      margin-top: 50px !important;
    }
  }
 /* .ruphi-img-dialog-close-btn{
    position: absolute;
  }*/
</style>
