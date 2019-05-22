<template>
    <v-app id="blog-list">
      <v-layout row>
        <v-flex sm12 xs12>
          <v-toolbar color="white" class="mt-1" flat dense>
            <v-toolbar-title>博客列表</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark @click="getBlogList">
              刷新
            </v-btn>
          </v-toolbar>
          <v-data-table
            :headers="headers"
            :items="blogs"
            :loading="loading"
            :pagination.sync="pagination"
            class="elevation-1"
            :rows-per-page-items="[8, 16, 32]"
          >
            <template v-slot:items="props">
              <td class="text-xs-left text-sm-left">{{ props.item.title }}</td>
              <td class="text-xs-left text-sm-left">{{ props.item.date }}</td>
              <td class="justify-center layout px-0">
                <v-icon
                  small
                  class="mr-3"
                  color="primary"
                  style="line-height: 3"
                  @click="editBlog(props.item)"
                >
                  edit
                </v-icon>
                <v-icon
                  small
                  color="red"
                  style="line-height: 3"
                  @click="showDeleteConfirmDialog(props.item)"
                >
                  delete
                </v-icon>
              </td>
            </template>
            <template v-slot:no-data>
              <!--<v-btn color="primary" @click="initialize">Reset</v-btn>-->
              <span>暂无记录！</span>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
      <v-dialog
        v-model="dialog"
        max-width="290"
      >
        <v-card>
          <v-card-title class="headline">操作确认</v-card-title>

          <v-card-text class="text-xs-left text-sm-left">
            操作不可逆！确定要把这篇文章删了吗？要不要再考虑考虑？
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              flat="flat"
              @click="dialog = false"
            >
              嗯，不删了
            </v-btn>
            <v-btn
              color="green darken-1"
              flat="flat"
              @click="deleteBlog"
            >
              是的，决心已定
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <TopSnackbar :snackbar-text="snackbarText" :snackbar-timeout="snackbarTimeout"></TopSnackbar>
    </v-app>
</template>

<script>
    import TopSnackbar from "../../components/TopSnackbar";
    export default {
      name: "BlogList",
      components: {TopSnackbar},
      data(){
        return {
          dialog: false,
          blogItem: null,
          snackbarText: '',
          snackbarTimeout: 6000,
          loading: true,
          pagination: {
            sortBy: 'date',
            descending: true
          },
          blogs: [],
          headers: [
            { text: '标题', value: 'title', align: 'left' },
            { text: '时间', value: 'date', align: 'left' },
            { text: '操作', value: 'date', align: 'left', sortable: false}
          ]
        }
      },
      created(){
        this.getBlogList();
      },
      methods: {
        /*
        * 获取所有博客文章
        * */
        getBlogList: function (){
          const that = this;
          this.$rpserver.get('/blog/list').then(function (res) {
            that.loading = false;
            if (res.data.code === 0) {
              that.blogs = [];
              const temp = res.data.data;
              temp.forEach(function (item) {
                item.date = that.$moment(item.date).format('YYYY-MM-DD HH:mm:ss');
                that.blogs.push(item);
              });
              that.$forceUpdate();
            }else {
              that.showMsg('获取博客列表失败！');
            }
          }).catch(function (err) {
            that.showMsg('获取博客列表失败！');
          });
        },

        /*
        * 打开文章编辑页面 编辑文章
        * */
        editBlog: function(blogItem){
          const {href} = this.$router.resolve({
            path: '/admin/dashboard/editor',
            query: {
              blogId: blogItem._id,
            }
          });
          // 在新页面打开
          window.open(href, '_blank');
        },

        /*
        * 删除操作弹窗确认
        * */
        showDeleteConfirmDialog: function (blogItem){
          this.dialog = true;
          this.blogItem = blogItem;
        },

        /*
        * 执行文章删除操作
        *  */
        deleteBlog: function(){
          const that = this;
          const blogItem = this.blogItem;
          this.dialog = true;
          this.$rpserver.delete('/blog/delete/'+blogItem._id).then(function (res) {
            that.dialog = false;
            that.showMsg(res.data.message);
            if (res.data.code === 0) {
              that.getBlogList();
            }
          }).catch(function (err) {
            that.showMsg('请求博客删除接口失败！')
          });
        },

        /*
        * 显示提示信息
        * */
        showMsg: function (msg){
          this.snackbarText = msg;
          this.$store.commit('showTopSnackbar');
        }
      }
    }
</script>

<style scoped>

</style>
