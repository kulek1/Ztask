<template>
  <div id="app">
    <sidebar-vue @searchInput="searchArray($event)"></sidebar-vue>
    <div class="page">
      <header-vue @addRow="fireAddRow($event)"></header-vue>
      <tasklist v-if="!this.isSettingsWindow" :tasks="tasks" @addTask="fireAddTask($event)"></tasklist>
      <router-view @changeName="changeFullname($event) " @changeProfession="changeProfession($event) "></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { apiUrl } from '../../env'
import Header from './partials/Header.vue'
import Sidebar from './partials/Sidebar.vue'
import TaskList from './partials/TaskList.vue'
import Settings from './partials/Settings.vue'

export default {
  name: 'app',
  components: {
    'header-vue': Header,
    'sidebar-vue': Sidebar,
    'tasklist': TaskList,
    'settings': Settings
  },
  data () {
    return {
      tasks: []
    }
  },
  methods: {
    fireAddTask (taskName) {
      const USER_ID = this.authStore.authUser.id
      const self = this

      if (this.isSound) {
        this.playSound()
      }
      let addData = {
        name: taskName,
        description: 'none',
        author: USER_ID,
        type: 'normal',
        done: '0'
      }
      this.$http.post(apiUrl + 'addtask', addData).then(response => {
        // wait for id from mysql
        self.newNameOfTask = ''
        self.isCreating = false
        this.tasks.push({ id: parseInt(response.body), name: taskName, description: ' ', author: this.fullName, type: 'normal', done: 0 })
      }, response => {
        console.log('error')
      })
    },
    getAccountData () {
      this.$store.dispatch('setFullname', this.authStore.authUser.name)
      this.$store.dispatch('setProfession', this.authStore.authUser.profession)
    },
    getUserTaskList () {
      this.$http.get(apiUrl + 'getUserTasks/' + this.authStore.authUser.id).then(response => {
        this.$store.dispatch('setTasks', response.body)
      })
    }
  },
  watch: {
    '$route' (from, to) {
      if (from.path === '/settings') {
        this.$store.dispatch('settingsWindow', 'open')
      } else if (from.path === '/') {
        this.$store.dispatch('settingsWindow', 'close')
      }
    }
  },
  computed: {
    ...mapState({
      authStore: state => state.authStore,
      mainStore: state => state.mainStore
    }),
    ...mapGetters([
      'isSettingsWindow'
    ])
  },
  created () {
    const userObj = JSON.parse(window.localStorage.getItem('authUser'))
    this.$store.dispatch('setUserObject', userObj)

    this.getAccountData()
    this.getUserTaskList()
  }
}
</script>


