<template>
    <v-container>
      <v-layout>
        <v-btn class="ruphi-btn-margin-left0" color="primary" @click="clearArea">清空面板</v-btn>
      </v-layout>
      <vue-dropzone 
        ref="RuphiVueDropzone"
        id="dropzone" 
        v-on:vdropzone-success="onSuccess"
        :options="dropzoneOptions">
      </vue-dropzone>

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
    </v-container>
</template>

<script>
  import vue2Dropzone from 'vue2-dropzone'
  import 'vue2-dropzone/dist/vue2Dropzone.min.css'
  const RUPHICLOUDINARY = {
    cloud_name: 'dcktxc7vt',
    api_key: '243633133824465',
    api_secret: 'R5UrrRxSO3KmA55wZhkouwICuIg',
    upload_preset: 'wxzzi0aj',
    base:'http://res.cloudinary.com/dcktxc7vt',
    image:'https://api.cloudinary.com/v1_1/dcktxc7vt/image/upload',
    video:'https://api.cloudinary.com/v1_1/dcktxc7vt/video/upload',
    audio:'https://api.cloudinary.com/v1_1/dcktxc7vt/raw/upload'
  };
  export default {
    name: "ImgUpload",
    components: {
      vueDropzone: vue2Dropzone
    },
    data: function () {
      return {
        fileName: '',
        snackbar: false,
        snackbarY: 'top',
        snackbarX: null,
        snackbarMode: '',
        snackbarTimeout: 6000,
        snackbarText: '已存在要添加的任务！',
        dropzoneOptions: {
          url: RUPHICLOUDINARY.image,
          thumbnailWidth: 200,
          thumbnailHeight: 300,
          maxFilesize: 5,//mb
          params: function (param) {//接口参数
            let nameArr = param[0]['name'].split('.');
            nameArr.pop();
            let name = nameArr.join('.');
            return {
              upload_preset: RUPHICLOUDINARY.upload_preset,
              // folder: 'personal-site-img-lib',
              public_id: name,
              tags: 'ruphill'
            }
          },
          dictDefaultMessage: '单击或将图片拖拽到此处以上传！',
        }
      }
    },
    methods: {
      onSuccess: function (file, response) {
        this.snackbarText = '图片已成功上传！';
        this.snackbar = true;
      },
      clearArea: function () {
        this.$refs.RuphiVueDropzone.removeAllFiles();
      }
    }
  }

</script>

<style>
  .dropzone .dz-preview .dz-image{
    border: 1px dashed grey
  }
  .ruphi-btn-margin-left0{
    margin-left: 1px;
  }
  .vue-dropzone>.dz-preview .dz-error-message {
    left: 5px;
    width: 95%;
    text-align: center;
    margin-top: 35px;
  }
</style>
