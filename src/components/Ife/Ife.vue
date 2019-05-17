<template>
    <v-container>
      <iframe :src="iframeSrc"></iframe>
    </v-container>
</template>

<script>
    export default {
      name: "Ife",
      data(){
        return {

        }
      },
      computed: {
        iframeSrc(){
          let path = this.$route.path;
          if (path.indexOf('BaiduIFE/HTML_CSS') > 0) {
            return 'http://47.112.96.94/ife/BaiduIFE/HTML_CSS/' + this.$route.params.taskDic + '/' + this.$route.params.taskPage + '.html'
          }else {
            return 'http://47.112.96.94/ife/' + this.$route.params.page + '.html'
          }
        }
      },
      created(){

      }
    }
</script>

<style scoped>
  iframe{
    width: 100%;
    height: 80vh;
    border: none;
  }
</style>
