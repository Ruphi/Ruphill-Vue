<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex
        v-for="(blog, index) in blogs"
        :key="index"
        sm12
        md6
      >
        <v-card flat tile>
          <v-card-text>
            <div class="article-title" :data-blog-id="blog._id" @click="goToBlog(blog._id)">{{blog.title}}</div>
            <div class="subheading article-sub-title">{{new Date(blog.date).toLocaleDateString() + ' ' + new Date(blog.date).toLocaleTimeString()}}</div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'BlogList',
    data(){
      return {
        blogs: []
      }
    },
    created(){
      this.getBlogList();
    },
    methods: {
      getBlogList: function (){
        const that = this;
        this.$rpserver.get('/api/blog/list').then(function (res) {
          console.log(res);
          if (res && res.data && res.data.code === 0) {
            that.blogs = res.data.data;
          }
        }).catch(function (err) {

        });
      },
      goToBlog: function (id) {
        console.log(id);
        this.$router.push('/blogs/blog/' + id)
      }
    }
  }
</script>

<style scoped>
  .v-card__text{
    text-align: left;
  }
  .article-title{
    font-size: 18px;
    cursor: pointer;
    width: 100%;
  }
  .article-sub-title{
    color: #cccccc;
  }
</style>
