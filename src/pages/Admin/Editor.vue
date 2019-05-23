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
        <v-flex xs4 sm2 style="background-color: white">
          <v-btn-toggle style="margin-top: 15px">
            <v-btn @click.stop.prevent="postBlog">
              <v-icon color="primary">send</v-icon>
            </v-btn>
            <v-btn @click.stop.prevent="newBlog">
              <v-icon color="primary">add</v-icon>
            </v-btn>
          </v-btn-toggle>
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

import aip from '../../common/aip';

/*
* 编辑器配置项
* */
const timyMceOptions =  {
  language: 'zh_CN',
  language_url: '/static/tinymce/langs/zh_CN.js',
  skin_url: '/static/tinymce/skins/ui/oxide',
  plugins: 'lists, advlist, autosave, autoresize, code, codesample, table, emoticons, hr, charmap, autolink link image imagetools insertdatetime legacyoutput tabfocus searchreplace nonbreaking preview print pagebreak wordcount visualblocks textpattern template toc',
  toolbar: 'bullist numlist forecolor backcolor codesample table, emoticons hr charmap link image insertdatetime searchreplace nonbreaking preview print pagebreak visualblocks template paste toc',
  mobile: {
    theme: 'mobile',
    plugins: ['autosave', 'lists', 'autolink'],
    toolbar: ['undo', 'redo', 'bold', 'italic', 'styleselect', 'underline', 'link', 'unlink', 'image', 'bullist', 'numlist', 'fontsizeselect', 'forecolor', 'removeformat']
  },
  toc_depth: 3,
  imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
  tabfocus_elements: ':prev,:next',
  emoticons_database_url: '/static/tinymce/emoticons/js/emojis.js',
  images_upload_url: 'http://127.0.0.1:3000/qiniu/uploadImg',
  paste_data_images: true,
  min_height: 420,
  max_height: 420
};

export default {
  name: 'Editor',
  components: {TopSnackbar, TinyEditor},

  validations: {
    blogTitle: {required}
  },
  created(){
    this.getAccessToken();

    if (this.$route.query.blogId) {
      this.blogId = this.$route.query.blogId;
      this.getBlogByID(this.blogId);
    }
  },
  data () {
    return {
      blogContent: '',
      blogTitle: '',
      blogTag: [],
      blogId: null,
      snackbar: false,
      snackbarText: '',
      snackbarTimeout: 6000,
      options: timyMceOptions
    }
  },
  methods: {
    /*
    * 获取access_token
    * */
    getAccessToken: function(callback){
      const that = this;
      let access_token = localStorage.getItem('access_token');
      let access_token_expires_in = localStorage.getItem('access_token_expires_in');
      let access_token_get_time_stamp = localStorage.getItem('access_token_get_time_stamp');

      if (!access_token || (new Date().getTime() - Number(access_token_get_time_stamp) > Number(access_token_expires_in))) {
        //获取百度智能云access_token
        aip.getToken(function (response) {
          const rpData = response.data.data;
          localStorage.setItem('access_token_get_time_stamp', new Date().getTime());
          localStorage.setItem('access_token_expires_in', rpData.expires_in);
          localStorage.setItem('access_token', rpData.access_token);
          if (callback){
            callback.call(that, []);
          }
        }, function (error) {
          that.showMsg('获取百度智能云token失败！');
        });
      }else {
        if (callback) {
          callback.call(that, []);
        }
      }
    },
    /*
    * 提交博客
    * */
    postBlog: function (ev) {
      const that = this;
      this.$v.blogTitle.$touch();

      if (this.blogTitle.trim() === '' || this.blogContent.trim() === '') {
        this.showMsg('标题和内容都要写哦~');
      } else {
        //获取百度智能云access_token
        this.getAccessToken(function () {
          //获取文章标签
          aip.getTags({
            access_token: localStorage.getItem('access_token'),
            title: that.blogTitle,
            content: that.delHtmlTag(that.blogContent)
          }, function (res) {
            const tagItems = res.data.data.items;
            that.blogTag = [];
            tagItems.forEach(function (item) {
              //只保存大于0.8的标签
              if (item.score > 0.8) {
                that.blogTag.push(item.tag);
              }
            });
            //保存新增的博客
            if (that.blogId) {
              that.updateBlog();
            }else {
              that.saveBlog();
            }
          }, function (err) {
            that.showMsg('获取文章标签失败！');
          });
        });
      }
    },
    /*
    * 新增博客保存
    * */
    saveBlog: function (){
      const that = this;
      this.$rpserver.post('/blog/save', {
        title: that.blogTitle,
        content: that.blogContent,
        tag: that.blogTag,
        date: Date.now()
      }).then(function (response) {
        that.showMsg(response.data.message);
        const res = response.data;
        if (res.code === 0) {
          that.$router.replace('/admin/dashboard/editor?blogId='+res.data._id);
          that.blogTitle = res.data.title;
          that.blogContent = res.data.content;
          that.blogId = res.data._id;
        }
      }).catch(function (err) {
        that.showMsg('博客保存接口调用失败！');
      })
    },
    /*
    * 博客内容修改保存
    * */
    updateBlog: function(){
      const that = this;
      this.$rpserver.post('/blog/update', {
        title: that.blogTitle,
        content: that.blogContent,
        tag: that.blogTag,
        date: Date.now(),
        id: that.blogId
      }).then(function (response) {
        that.showMsg(response.data.message);
      }).catch(function (err) {
        that.showMsg('博客更新接口调用失败！');
      })
    },
    /*
    * 根据博客ID查找博客
    * */
    getBlogByID: function(blogId){
      const that = this;
      if (!blogId || blogId === '') {
        this.showMsg('缺少获取数据的相应参数！');
      }else {
        this.$rpserver.get('/blog/'+blogId).then(function (response) {
          if (response.data.code === -1) {
            that.showMsg(response.data.message);
          }else {
            that.blogContent = response.data.data.content;
            that.blogTitle = response.data.data.title;
          }
        }).catch(function (err) {
          that.showMsg('获取博客失败！');
        })
      }
    },
    /*
    * 新建博客
    * */
    newBlog: function (){
      this.$router.replace('/admin/dashboard/editor');
      this.blogTitle = '';
      this.blogContent = '';
      this.blogId = null;
    },
    /*
    * 消息提示
    * */
    showMsg: function (msg){
      this.snackbarText = msg;
      this.$store.commit('showTopSnackbar');
    },
    /*
    * 去除博客内容中的HTML标签
    * */
    delHtmlTag (str){
      return str.replace(/<[^>]+>/g,""); // 正则去掉所有的html标记
    }
  },

  computed: {
    /*
    * 博客标题的错误提示
    * */
    setErrMsg: function () {
      const errors = []
      if (this.blogTitle === '' && this.$v.blogTitle.$dirty) {
        errors.push('请输入文章标题！')
      }
      return errors
    }
  },
  mounted () {
    //初始化富文本编辑器
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
    margin-top: 0!important;
  }
</style>
