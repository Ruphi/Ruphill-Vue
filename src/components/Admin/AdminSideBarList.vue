<template>
  <v-card>
    <v-list>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>

        <v-list-tile
          v-for="subItem in item.items"
          :key="subItem.title"
          @click=""
        >
          <v-list-tile-content @click="goto(subItem.to)">
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
    export default {
      name: "AdminSideBarList",
      data(){
        return {
          items: [
            {
              action: 'dashboard',
              title: '管理面板',
              items: [
                { title: 'To Do' , to: '/admin/todo'},
                { title: '图片上传', to: '/admin/imgUpload'}
              ]
            }
          ]
        }
      },
      methods: {
        goto: function (page) {
          this.$router.push(page);
        }
      }
    }
</script>

<style scoped>

</style>
