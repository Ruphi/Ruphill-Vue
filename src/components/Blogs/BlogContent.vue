<template>
  <v-container>
    <article>
      <header class="article-header">
        <div class="article-title">{{blogTitle}}</div>
        <div class="subheading article-sub-title">{{new Date(blogDate).toLocaleDateString() + ' ' + new Date(blogDate).toLocaleTimeString()}}</div>
      </header>
      <section v-html="blogContent"></section>
    </article>
  </v-container>
</template>

<script>
  export default {
    name: 'BlogContent',
    data () {
      return {
        blogId: '',
        blogContent: '',
        blogDate: '',
        blogTitle: ''
      }
    },
    created () {
      this.blogId = this.$route.params.id;
      this.getBlog();
    },
    methods: {
      getBlog(){
        const that = this;
        this.$rpserver.get('/api/blog/' + this.blogId).then(function (response) {
          if (response.data.code === -1) {

          }else {
            that.blogContent = response.data.data.content;
            that.blogTitle = response.data.data.title;
            that.blogDate = response.data.data.date;
          }
        }).catch(function (err) {

        })
      }
    }
  }
</script>

<style scoped>
  .article-header{
    margin-bottom: 25px;
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
