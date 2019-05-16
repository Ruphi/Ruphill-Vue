<template>
  <div>
    <v-stepper vertical>
      <v-stepper-step step="7">
        开启博客相关任务
      </v-stepper-step>

      <v-stepper-content step="7">
        <v-card>
          <v-card-title>首先实现博客的编辑和存储</v-card-title>
        </v-card>
      </v-stepper-content>

      <v-stepper-step step="6" complete>
        至2019-05-16<br/>
        完成导航组件的重构，根据动态路由区分Index模块和Admin模块从而实现drawer组件的复用<br/>
        新增百度IFE任务模块，可查看各个任务的完成效果<br/>
        实现了v-list的激活状态<br/>
      </v-stepper-step>
      <v-stepper-content step="6">
        <v-card>
          <v-card-title></v-card-title>
        </v-card>
      </v-stepper-content>

      <v-stepper-step step="5" complete>
        2019-03-24 实现图片的加载，并且能够查看大图
      </v-stepper-step>
      <v-stepper-content step="5">
        <v-card>
          <v-card-title></v-card-title>
        </v-card>
      </v-stepper-content>


      <v-stepper-step step="4" complete>
        2019-03-23 实现图片上传功能
      </v-stepper-step>
      <v-stepper-content step="4">
        <v-card>
          <v-card-title>实现图片上传功能</v-card-title>
        </v-card>
      </v-stepper-content>

      <v-stepper-step step="3" complete>
        2019-03-22 完成todo中 任务的修改
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-card>
          <v-card-title>实现任务信息的修改</v-card-title>
        </v-card>
      </v-stepper-content>

      <v-stepper-step step="2" complete>
        2019-03-21 完成todo应用的基本开发，能够新增、删除、完成、撤销完成任务。
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-card>
          <v-card-title>实现任务的增删改查</v-card-title>
        </v-card>
      </v-stepper-content>
      <v-stepper-step step="1" complete>
        2019-03-17 完成基本布局
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-card>
          <v-card-title>实现上中左右的基本布局</v-card-title>
        </v-card>
      </v-stepper-content>
    </v-stepper>
  </div>

</template>

<script>
    export default {
      name: "IndexContent",
      data(){
        return {
          e13: 2
        }
      }
    }
</script>

<style scoped>

</style>
