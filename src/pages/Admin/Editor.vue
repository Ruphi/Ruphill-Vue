<template>
    <v-container>
      <tiny-editor
        :init="options"
        v-model="content"></tiny-editor>
    </v-container>
</template>

<script>
  import tinymce from 'tinymce/tinymce';
  import 'tinymce/themes/silver/theme';
  import 'tinymce/themes/mobile/theme';
  import TinyEditor from '@tinymce/tinymce-vue';

  import 'tinymce/plugins/advlist'//高级列表
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

  export default {
    name: "Editor",
    components: {TinyEditor},
    data(){
      return {
        content: '',
        options: {
          language: 'zh_CN',
          language_url:'/static/tinymce/langs/zh_CN.js',
          skin_url: '/static/tinymce/skins/ui/oxide',
          plugins:'lists, advlist, autosave, autoresize, code, codesample, table, emoticons, hr, charmap, autolink link image imagetools insertdatetime legacyoutput tabfocus searchreplace nonbreaking preview print pagebreak wordcount visualblocks textpattern template toc',
          toolbar:'bullist numlist forecolor backcolor codesample table, emoticons hr charmap link image insertdatetime searchreplace nonbreaking preview print pagebreak visualblocks template toc',
          mobile: {
            theme: 'mobile',
            plugins: [ 'autosave', 'lists', 'autolink' ],
            toolbar: [ 'undo', 'redo', 'bold', 'italic', 'styleselect', 'underline', 'link', 'unlink', 'image', 'bullist', 'numlist', 'fontsizeselect', 'forecolor', 'removeformat']
          },
          toc_depth: 3,
          imagetools_toolbar: "rotateleft rotateright | flipv fliph | editimage imageoptions",
          tabfocus_elements: ":prev,:next",
          emoticons_database_url:'/static/tinymce/emoticons/js/emojis.js',
          min_height: 500
        }
      }
    },
    mounted() {
      tinymce.init({});
    }
  }
</script>

<style>
  .tox-dialog {
    margin-top: 40px!important;
  }
</style>
