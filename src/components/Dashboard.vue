<template>
  <div id="app">
    <main-sidebar @searchInput="searchArray($event)"/>
    <div class="page">
      <main-header @addRow="fireAddRow($event)"/>
      <task-list v-if="!this.isSettingsWindow" :tasks="tasks"/>
      <router-view @changeName="changeFullname($event) " @changeProfession="changeProfession($event) "/>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
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
    ...mapActions([
      'setFullname',
      'setProfession',
      'settingsWindow',
      'setError'
    ]),
    ...mapActions('auth', ['setAuthUser']),
    ...mapActions('task', ['setTasks', 'getUserTasks']),
    getAccountData () {
      this.setFullname(this.authUser.name);
      this.setProfession(this.authUser.profession);
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
    this.setError(false);
    this.setAuthUser(userObj);
    this.getAccountData();
    this.getUserTasks(this.authUser.id);
  },
  mounted () {
    console.log(this.authUser);
  }
};
</script>


