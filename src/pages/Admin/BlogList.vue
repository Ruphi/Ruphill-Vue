<template>
    <v-app id="blog-list">
      <v-layout row>
        <v-flex sm12 xs12>
          <v-data-table
            :headers="headers"
            :items="blogs"
            :loading="loading"
            :pagination.sync="pagination"
            class="elevation-4 mt-1"
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
                  @click="deleteBlog(props.item)"
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
        getBlogList: function (){
          const that = this;
          this.$rpserver.get('/blog/list').then(function (res) {
            if (res.data.status === 0) {
              that.blogs = [];
              const temp = res.data.data;
              temp.forEach(function (item) {
                item.date = that.$moment(item.date).format('YYYY-MM-DD HH:mm:ss');
                that.blogs.push(item);
              });
              console.log(that.blogs);
              that.loading = false;
              that.$forceUpdate();
            }else {
              that.showMsg('获取博客列表失败！');
            }
          }).catch(function (err) {
            that.showMsg('获取博客列表失败！');
          });
        },
        editBlog: function(blogItem){
          console.log(blogItem)
          console.log(this.$moment().format('YYYY-MM-DD'));
        },
        deleteBlog: function(blogItem){
          console.log(blogItem);
        },
        showMsg: function (msg){
          this.snackbarText = msg;
          this.$store.commit('showTopSnackbar');
        }
      }
    }
</script>

<style scoped>

</style>
