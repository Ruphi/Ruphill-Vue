<template>
  <v-app>
    <Header></Header>
    <div class="blog-body">
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
  import Header from '../../components/Header'
  import BlogList from '../../components/Blogs/BlogList'
  import BlogContent from '../../components/Blogs/BlogContent'
  export default {
    name: 'Blog',
    components: {BlogContent, BlogList, Header}
  }
</script>

<style scoped>
  .blog-body{
    display: flex;
    flex-direction: row;
    text-align: left;
  }
  .blog-list{
    flex: 0 0 400px;
    margin: 0 20px;
  }
  .blog-content{
    flex: auto;
    margin-right: 20px;
  }
  @media screen and ( min-width: 960px){
    .blog-body {
      margin-top: 70px !important;
      /*max-height: calc(100% - 64px) !important;*/
    }
  }

  @media screen and ( max-width: 960px){
    .blog-body {
      /*padding-left: 0 !important;*/
      margin-top: 48px !important;
      /*max-height: calc(100% - 48px) !important;*/
    }
  }
</style>
