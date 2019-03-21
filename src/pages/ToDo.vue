<template>
    <v-container style="height: 100%; max-height: 100%">
      <div class="ruphi-todo-list-wrap">
        <v-list
          v-for="item in tasks"
          :key="item.id"
        >
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title v-bind:class="{complete: item.complete}">{{item.content}}</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action class="ruphi-list-title-action-min-width">
              <div class="text-xs-center">
                <v-btn flat icon small @click="complete(item.id, item.content)" v-show="!item.complete" color="blue" class="ruphi-todo-btns">
                  <v-icon dark>done</v-icon>
                </v-btn>
                <v-btn flat icon small @click="undo(item.id, item.content)" v-show="item.complete" class="ruphi-todo-btns">
                  <v-icon dark>undo</v-icon>
                </v-btn>
                <v-btn flat icon small @click="del(item.id)" color="red" class="ruphi-todo-btns">
                  <v-icon dark>delete</v-icon>
                </v-btn>
              </div>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider></v-divider>
        </v-list>
      </div>
      <v-card style="position: fixed;top: 70px;width: 60%;">
        <v-text-field
          class="pa-3"
          label="新建任务"
          placeholder="任务描述"
          append-icon="add"
          @click:append="addTask"
          v-model="task"
          required
          :error-messages="setErrMsg"
          @blur="$v.task.$reset()"
          v-on:keyup.enter="addTask"
        ></v-text-field>
      </v-card>

      <v-snackbar
        v-model="snackbar"
        :bottom="y === 'bottom'"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :right="x === 'right'"
        :timeout="timeout"
        :top="y === 'top'"
        :vertical="mode === 'vertical'"
      >
        {{ text }}
        <v-btn
          color="pink"
          flat
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
    </v-container>
</template>

<script>
    import {required} from 'vuelidate/lib/validators'
    export default {
      name: "ToDo",
      validations: {
        task: {required}
      },
      data: ()=>({
        task: '',
        tasks: [],
        db: null,
        taskObjectStore: null,
        snackbar: false,
        y: 'top',
        x: null,
        mode: '',
        timeout: 6000,
        text: '已存在要添加的任务！'
      }),
      created(){
        let that = this;
        let request = window.indexedDB.open('localTasks');
        request.onerror = function(){
          console.log('本地代办事项数据库打开失败！');
        };
        request.onsuccess = function (ev){
          that.db = request.result;
          let objectStore = that.db.transaction('task').objectStore('task');
          that.tasks = [];
          objectStore.openCursor().onsuccess = function (event) {
            let cursor = event.target.result;
            if (cursor) {
              let temp = {id: cursor.key, content: cursor.value.content, complete: cursor.value.complete};
              that.tasks.push(temp);
              cursor.continue();
            }
          };
        };
        request.onupgradeneeded = function (event) {
          that.db = event.target.result;
          if (!that.db.objectStoreNames.contains('task')) {
            that.taskObjectStore = that.db.createObjectStore('task', { keyPath: 'content' });
            that.taskObjectStore.createIndex('content', 'content', { unique: true });
            that.taskObjectStore.createIndex('complete', 'complete', { unique: false });
          }
        };
      },
      computed: {
        setErrMsg: function () {
          const errors = [];
          if (this.task === '' && this.$v.task.$dirty) {
            errors.push('请输入任务信息！');
          }
          return errors;
        }
      },
      methods: {
        addTask: function (ev) {
          this.$v.task.$touch();
          if (this.task !== '') {
            let that = this;
            let request = that.db.transaction(['task'], 'readwrite')
              .objectStore('task')
              .add({ content: that.task, complete: false});

            request.onsuccess = function (event) {
              that.task = '';
              that.$v.task.$reset();
              let objectStore = that.db.transaction('task').objectStore('task');
              that.tasks = [];
              objectStore.openCursor().onsuccess = function (event) {
                let cursor = event.target.result;
                if (cursor) {
                  let temp = {id: cursor.key, content: cursor.value.content, complete: cursor.value.complete};
                  that.tasks.push(temp);
                  cursor.continue();
                }
              };
            };

            request.onerror = function (event) {
              that.snackbar = true;
            }
          }
        },
        complete: function (id, content) {
          let that = this;
          let request = this.db.transaction(['task'], 'readwrite')
            .objectStore('task')
            .put({content:content, complete: true});


          request.onsuccess = function (event) {
            let objectStore = that.db.transaction('task').objectStore('task');
            that.tasks = [];
            objectStore.openCursor().onsuccess = function (event) {
              let cursor = event.target.result;
              if (cursor) {
                let temp = {id: cursor.key, content: cursor.value.content, complete: cursor.value.complete};
                that.tasks.push(temp);
                cursor.continue();
              }
            };
          };

          request.onerror = function (event) {

          }
        },
        undo: function (id, content) {
          let that = this;
          let request = this.db.transaction(['task'], 'readwrite')
            .objectStore('task')
            .put({content: content, complete: false});

          request.onsuccess = function (event) {
            let objectStore = that.db.transaction('task').objectStore('task');
            that.tasks = [];
            objectStore.openCursor().onsuccess = function (event) {
              let cursor = event.target.result;
              if (cursor) {
                let temp = {id: cursor.key, content: cursor.value.content, complete: cursor.value.complete};
                that.tasks.push(temp);
                cursor.continue();
              }
            };
          };

          request.onerror = function (event) {
            console.log('数据更新失败');
          }
        },
        del: function (id) {
          let that = this;

          let request = this.db.transaction(['task'], 'readwrite')
            .objectStore('task')
            .delete(id);

          request.onsuccess = function (event) {
            let objectStore = that.db.transaction('task').objectStore('task');
            that.tasks = [];
            objectStore.openCursor().onsuccess = function (event) {
              let cursor = event.target.result;
              if (cursor) {
                let temp = {id: cursor.key, content: cursor.value.content, complete: cursor.value.complete};
                that.tasks.push(temp);
                cursor.continue();
              }
            };
          };
        }
      },
    }
</script>

<style scoped>
 .complete{
   color: #ccc;
   text-decoration: line-through;
 }

 .ruphi-list-title-action-min-width{
   min-width: 105px;
 }

 @media screen and ( min-width: 960px){
   .ruphi-todo-list-wrap{
     margin-top: 85px;
   }
 }

 @media screen and ( max-width: 960px){
   .ruphi-todo-list-wrap{
     margin-top: 100px;
   }
 }

  .ruphi-todo-btns{
    margin: 0 5px;
  }

</style>
