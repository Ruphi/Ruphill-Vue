<template>
  <v-card>
    <v-list dense expand>
      <v-list-group
        v-for="item in items"
        :key="item.component"
        :prepend-icon="item.action"
        :group="item.component"
        no-action
      >
        <template>
          <v-list-tile slot="activator" ripple="ripple">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>

        <v-list-tile
          v-for="subItem in item.items"
          :key="subItem.title"
          :href="'#'+subItem.to"
          ripple="ripple"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-icon>{{ subItem.action }}</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
  const moduleItems = {
    admin: [
      {
        action: 'dashboard',
        title: '管理面板',
        component: 'admin/dashboard',
        items: [
          { title: 'To Do', to: '/admin/dashboard/todo', component: 'todo'},
          { title: '图片上传', to: '/admin/dashboard/imgUpload', component: 'imgUpload'},
          { title: '写文章', to: '/admin/dashboard/editor', component: 'editor'}
        ]
      }
    ],
    index: [
      {
        action: 'all_inbox',
        title: '百度IFE',
        component: 'index/ife',
        items: [
          {title: '颜色选择器', to: '/index/ife/color-picker', component: 'color-picker'},
          {title: '标签云', to: '/index/ife/tag-cloud', component: 'tag-cloud'}
        ]
      }
    ]
  };
  export default {
    name: "SideBarList",
    data(){
      return {
        items: []
      };
    },
    created(){
      const paths = this.$route.path.split('/');
      const path = paths[1];
      this.items = moduleItems[path];
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
