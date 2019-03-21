<template>
    <v-container style="height: 100%; max-height: 100%">
      <div class="ruphi-todo-list-wrap">
        <v-list
          v-for="(item, index) in tasks"
          :key="item.id"
        >
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title v-bind:class="{complete: item.complete}" v-show="!editable[index]">{{item.content}}</v-list-tile-title>
              <v-list-tile-sub-title v-show="editable[index]">
                <v-text-field
                  v-model="newTask"
                  label="编辑任务"
                  placeholder="任务描述"
                  append-icon="cancel"
                  append-outer-icon="send"
                  @click:append="cancelUpdate(index)"
                  @click:append-outer="sendChange(index, item)"
                  v-on:keyup.enter="sendChange(index, item)"
                ></v-text-field>
              </v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action class="ruphi-list-title-action-min-width" v-show="!editable[index]">
              <div class="text-xs-center">
                <v-btn flat icon small @click="complete(item.id, item.content)" v-show="!item.complete" color="blue" class="ruphi-todo-btns">
                  <v-icon dark>done</v-icon>
                </v-btn>
                <v-btn flat icon small @click="undo(item.id, item.content)" v-show="item.complete" class="ruphi-todo-btns">
                  <v-icon dark>undo</v-icon>
                </v-btn>
                <v-btn flat icon small color="blue" class="ruphi-todo-btns" @click="edit(index, item.id, item.content)">
                  <v-icon dark>edit</v-icon>
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
        :bottom="snackbarY === 'bottom'"
        :left="snackbarX === 'left'"
        :multi-line="snackbarMode === 'multi-line'"
        :right="snackbarX === 'right'"
        :timeout="snackbarTimeout"
        :top="snackbarY === 'top'"
        :vertical="snackbarMode === 'vertical'"
      >
        {{ snackbarText }}
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
    import {required} from 'vuelidate/lib/validators';

    const onUpdateSuccessFn = function (event, that) {
      let objectStore = that.db.transaction('task').objectStore('task');
      that.tasks = [];
      that.editable = [];
      objectStore.openCursor().onsuccess = function (event) {
        let cursor = event.target.result;
        if (cursor) {
          let temp = {id: cursor.key, content: cursor.value.content, complete: cursor.value.complete};
          that.tasks.push(temp);
          that.editable.push(false);
          cursor.continue();
        }
      };
    };

    export default {
      name: "ToDo",
      validations: {
        task: {required}
      },

      data: ()=>({
        task: '',
        newTask: '',
        tasks: [],
        db: null,
        taskObjectStore: null,
        editable: [],
        snackbar: false,
        snackbarY: 'top',
        snackbarX: null,
        snackbarMode: '',
        snackbarTimeout: 6000,
        snackbarText: '已存在要添加的任务！'
      }),

      created(){
        let that = this;
        let request = window.indexedDB.open('localTasks');
        request.onsuccess = function (ev){
          that.db = request.result;
          onUpdateSuccessFn(ev, that);
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
              onUpdateSuccessFn(event, that);
            };

            request.onerror = function (event) {
              that.snackbarText = '已存在要添加的任务！'
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
            onUpdateSuccessFn(event, that);
          };
        },
        undo: function (id, content) {
          let that = this;
          let request = this.db.transaction(['task'], 'readwrite')
            .objectStore('task')
            .put({content: content, complete: false});

          request.onsuccess = function (event) {
            onUpdateSuccessFn(event, that);
          };
        },
        del: function (id) {
          let that = this;
          let request = this.db.transaction(['task'], 'readwrite')
            .objectStore('task')
            .delete(id);

          request.onsuccess = function (event) {
            onUpdateSuccessFn(event, that);
          };
        },
        edit: function (index, id, content) {
          this.newTask = content;
          for (let i = 0; i < this.editable.length; i++) {
            this.editable[i] = false;
          }
          this.editable[index] = true;
          this.$forceUpdate();
        },
        sendChange: function (index, item) {
          if (this.newTask === item.content) {//未修改
            this.editable[index] = false;
            this.$forceUpdate();
          }else if (this.newTask.trim() !== '') {//修改了
            let that = this;
            let request = this.db.transaction(['task'], 'readwrite')
              .objectStore('task')
              .add({content:that.newTask, complete: item.complete});

            request.onsuccess = function (event) {
              let request = that.db.transaction(['task'], 'readwrite')
                .objectStore('task')
                .delete(item.id);

              request.onsuccess = function (event) {
                onUpdateSuccessFn(event, that);
              };
            };
            request.onerror = function () {
              that.snackbarText = '存在相同的任务！';
              that.snackbar = true;
            }
          }
        },
        cancelUpdate: function (index) {
          this.editable[index] = false;
          this.$forceUpdate();
        }
      },
    }
</script>

<style scoped>
 .complete{
   color: #9E9E9E;
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
    margin: 0 0!important;
  }

</style>
