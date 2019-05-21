<template>
    <v-container>
      <v-layout row>
        <v-flex xs8 sm10>
          <v-text-field style="background-color: #FFFFFF"
                        class="pa-3 ruphi-text-field"
                        label=""
                        placeholder="文章标题"
                        v-model="blogTitle"
                        required
                        :error-messages="setErrMsg"
                        @blur="$v.blogTitle.$reset()"
          ></v-text-field>
        </v-flex>
        <v-flex xs4 sm2>
          <v-btn color="info" @click.stop.prevent="postBlog" style="margin-top: 15px">提交</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex sm12 xs12>
          <tiny-editor
            :init="options"
            v-model="blogContent"></tiny-editor>
        </v-flex>
      </v-layout>

      <TopSnackbar :snackbar-text="snackbarText" :snackbar-timeout="snackbarTimeout"></TopSnackbar>
    </v-container>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme'
import 'tinymce/themes/mobile/theme'
import TinyEditor from '@tinymce/tinymce-vue'

import 'tinymce/plugins/advlist'// 高级列表
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/importcss'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/legacyoutput'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/noneditable'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/print'
import 'tinymce/plugins/quickbars'
import 'tinymce/plugins/save'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/tabfocus'
import 'tinymce/plugins/table'
import 'tinymce/plugins/template'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/toc'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/wordcount'

import {required} from 'vuelidate/lib/validators'
import TopSnackbar from "../../components/TopSnackbar";

import baiduAI from '../../common/baiduAI';

const timyMceOptions =  {
  language: 'zh_CN',
  language_url: '/static/tinymce/langs/zh_CN.js',
  skin_url: '/static/tinymce/skins/ui/oxide',
  plugins: 'lists, advlist, autosave, autoresize, code, codesample, table, emoticons, hr, charmap, autolink link image imagetools insertdatetime legacyoutput tabfocus searchreplace nonbreaking preview print pagebreak wordcount visualblocks textpattern template toc',
  toolbar: 'bullist numlist forecolor backcolor codesample table, emoticons hr charmap link image insertdatetime searchreplace nonbreaking preview print pagebreak visualblocks template toc',
  mobile: {
    theme: 'mobile',
    plugins: ['autosave', 'lists', 'autolink'],
    toolbar: ['undo', 'redo', 'bold', 'italic', 'styleselect', 'underline', 'link', 'unlink', 'image', 'bullist', 'numlist', 'fontsizeselect', 'forecolor', 'removeformat']
  },
  toc_depth: 3,
  imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
  tabfocus_elements: ':prev,:next',
  emoticons_database_url: '/static/tinymce/emoticons/js/emojis.js',
  min_height: 420,
  max_height: 420
};

export default {
  name: 'Editor',
  components: {TopSnackbar, TinyEditor},

  validations: {
    blogTitle: {required}
  },

  data () {
    return {
      blogContent: '',
      blogTitle: '',
      snackbar: false,
      snackbarText: '',
      snackbarTimeout: 6000,
      options: timyMceOptions
    }
  },
  methods: {
    postBlog: function (ev) {
      this.$v.blogTitle.$touch();
      if (this.blogTitle.trim() === '' || this.blogContent.trim() === '') {
        this.showMsg('标题和内容都要写哦~');
      } else {
        console.log(this.blogTitle, this.blogContent);
      }
      baiduAI.getToken(function (response) {
        console.log(response);
      }, function (error) {
        console.log(error);
      })
    },
    saveBlog: function (){
      const that = this;
      this.$rpserver.post('/save', {
        title: that.blogTitle,
        content: that.blogContent,
        date: Date.now()
      })
    },
    showMsg: function (msg){
      this.snackbarText = msg;
      this.$store.commit('showTopSnackbar');
    }
  },

  computed: {
    setErrMsg: function () {
      const errors = []
      if (this.blogTitle === '' && this.$v.blogTitle.$dirty) {
        errors.push('请输入文章标题！')
      }
      return errors
    }
  },
  mounted () {
    tinymce.init({})
  }
}
</script>

<style>
  .tox-dialog {
    margin-top: 40px!important;
  }
  .tox .tox-dialog--width-lg{
    height: 520px!important;
  }
  .ruphi-text-field{
    padding-bottom: 6px!important;
    padding-top: 6px!important;
  }
</style>
