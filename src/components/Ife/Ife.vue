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
          return 'http://47.112.96.94/ife/' + this.$route.params.page + '.html'
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
