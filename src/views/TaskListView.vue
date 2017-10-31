<template>
  <div class="tasklist">
    <ul>
      <li v-for="(task, index) in filteredTasks" :class="{ 'item--completed' : task.done }">
        <div class="tasklist__avatar">
          <a href="" v-on:click.prevent="fireTaskDone(index, task.uuid, task.done)">
            <img :src="imgPlaceholder">
            <div class="complete-task" :class="{ 'complete-task--completed' : task.done }">
              <i class="material-icons">done</i>
            </div>
          </a>
        </div>
        <div class="tasklist__name">
          <h4>{{ task.name }}</h4>
          <p class="tasklist__author">by {{ task.author }}</p>
        </div>
        <div class="tasklist__delete">
          <button v-on:click="editRow(index, task.uuid)" class="icon icon--edit">
            <i class="material-icons">edit</i>
          </button>
          <button v-on:click="removeRow(index, task.uuid)" class="icon icon--delete">
            <i class="material-icons">delete</i>
          </button>
        </div>
      </li>
      <li v-if="this.isCreatingNewTask">
        <div class="tasklist__avatar">
          <img src="../assets/noavatar.png">
        </div>
        <div class="tasklist__name">
          <h4>
            <input class="material-input" type="text" v-on:keyup.enter="submitForm()" v-model="newTaskName" placeholder="Your task name" ref="dynamicSize" v-on:keyup="resizeInput()">
          </h4>
          <p class="tasklist__author">by me</p>
        </div>
        <div class="tasklist__checkbox"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { bus } from '@/eventbus';
import noAvatar from '@/assets/noavatar.png';

export default {
  name: 'TaskListView',
  data () {
    return {
      newTaskName: '',
      newAuthor: '',
      inputSize: 0,
      phraseSearch: '',
      imgPlaceholder: noAvatar
    };
  },
  methods: {
    ...mapActions('task', ['addTask', 'removeTask', 'setTaskDone']),
    submitForm () {
      const USER_ID = this.authUser.id;
      const fullName = this.fullName;
      const taskName = this.newTaskName;
      const isSound = this.isSound;
      this.addTask({ taskName, fullName, USER_ID, isSound });

      this.newTaskName = '';
    },
    editRow (index, uuid) {
      this.$router.push({ name: 'TaskView', params: { uuid: uuid } });
    },
    removeRow (index, uuid) {
      this.removeTask({ index, uuid });
    },
    fireTaskDone (index, uuid, isDone) {
      const task = {
        localIndex: index,
        uuid: uuid,
        done: isDone
      };
      this.setTaskDone(task);
    },
    resizeInput () {
      let element = this.$refs.dynamicSize;
      let length = element.value.length;
      if (length > 20) {
        element.size = length;
      } else {
        element.size = 20;
      }
    }
  },
  computed: {
    ...mapState(['fullName', 'isSound']),
    ...mapState('auth', ['authUser']),
    ...mapState('task', ['tasks', 'isCreatingNewTask']),

    filteredTasks () {
      const sortedTasks = this.tasks.sort((a, b) => {
        return a.created_at.localeCompare(b.created_at);
      });
      return sortedTasks.filter(task =>
        task.name.toLowerCase().includes(this.phraseSearch.toLowerCase())
      );
    }
  },
  created () {
    bus.$on('searchInput', data => {
      this.phraseSearch = data;
    });
  }
};
</script>
