<template>
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
      @click="close"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
    export default {
      name: "TopSnackbar",
      props: ['snackbarText', 'snackbarTimeout'],
      data(){
        return {
          snackbarY: 'top',
          snackbarX: null,
          snackbarMode: '',
        }
      },
      methods: {
        close(){
          this.$store.commit('closeTopSnackbar');
        }
      },
      computed: {
        snackbar: {
          get(){
            return this.$store.state.topSnackbar;
          },
          set(){

          }
        }
      }
    }
</script>

<style scoped>

</style>
