<template>
  <div>
    <v-stepper vertical>
      <v-stepper-step step="3">
        待确认中
      </v-stepper-step>

      <v-stepper-content step="3">
        <v-card>
          <v-card-title></v-card-title>
        </v-card>
      </v-stepper-content>
      <v-stepper-step step="2" complete>
        2019-03-21 开发基于indexedDB的简单ToDo应用
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
