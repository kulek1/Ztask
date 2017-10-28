<template>
  <div id="app">
    <main-sidebar @searchInput="searchArray($event)"/>
    <div class="page">
      <main-header @addRow="fireAddRow($event)"/>
      <task-list v-if="!this.isSettingsWindow" :tasks="tasks" @addTask="fireAddTask($event)"/>
      <router-view @changeName="changeFullname($event) " @changeProfession="changeProfession($event) "/>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { apiUrl } from '@/../env';
import MainHeader from './partials/MainHeader.vue';
import MainSidebar from './partials/MainSidebar.vue';
import TaskList from './partials/TaskList.vue';
import Settings from './partials/Settings.vue';

export default {
  name: 'app',
  components: {
    MainHeader,
    MainSidebar,
    TaskList,
    Settings
  },
  data () {
    return {
      tasks: []
    };
  },
  methods: {
    ...mapActions(['setFullname', 'setProfession', 'settingsWindow']),
    ...mapActions('auth', ['setAuthUser']),
    ...mapActions('task', ['setTasks']),
    fireAddTask (taskName) {
      const USER_ID = this.authStore.authUser.id;
      const self = this;

      if (this.isSound) {
        this.playSound();
      }
      let addData = {
        name: taskName,
        description: 'none',
        author: USER_ID,
        type: 'normal',
        done: '0'
      };
      this.$http.post(apiUrl + 'addtask', addData).then(
        response => {
          // wait for id from mysql
          self.newNameOfTask = '';
          self.isCreating = false;
          this.tasks.push({
            id: parseInt(response.body),
            name: taskName,
            description: ' ',
            author: this.fullName,
            type: 'normal',
            done: 0
          });
        },
        response => {
          console.log('error');
        }
      );
    },
    getAccountData () {
      this.setFullname(this.authUser.name);
      this.setProfession(this.authUser.profession);
    },
    getUserTaskList () {
      this.$http
        .get(apiUrl + 'getUserTasks/' + this.authUser.id)
        .then(response => {
          this.setTasks(response.body);
        });
    }
  },
  watch: {
    $route (from, to) {
      if (from.path === '/settings') {
        this.settingsWindow('open');
      } else if (from.path === '/') {
        this.settingsWindow('close');
      }
    }
  },
  computed: {
    ...mapState('auth', ['authUser']),
    ...mapGetters(['isSettingsWindow'])
  },
  created () {
    const userObj = JSON.parse(window.localStorage.getItem('authUser'));
    this.setAuthUser(userObj);

    this.getAccountData();
    this.getUserTaskList();
  }
};
</script>


