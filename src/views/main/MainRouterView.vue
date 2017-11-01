<template>
  <div>
    <main-sidebar @searchInput="searchArray($event)"/>
    <div class="page">
      <main-header @addRow="fireAddRow($event)"/>
     <!-- <task-list v-if="!this.isSettingsWindow" :tasks="tasks"/> -->
      <router-view @changeName="changeFullname($event) " @changeProfession="changeProfession($event) "/>
  <loader></loader>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MainHeader from '@/components/layout/MainHeader'
import MainSidebar from '@/components/layout/MainSidebar'
import Loader from '@/components/partials/Loader'

export default {
  name: 'app',
  components: {
    MainHeader,
    MainSidebar,
    Loader
  },
  data () {
    return {
      tasks: []
    }
  },
  methods: {
    ...mapActions(['setFullname', 'setProfession', 'setError']),
    ...mapActions('auth', ['setAuthUser']),
    ...mapActions('task', ['setTasks', 'getUserTasks']),
    getAccountData () {
      this.setFullname(this.authUser.name)
      this.setProfession(this.authUser.profession)
    }
  },
  computed: {
    ...mapState('auth', ['authUser'])
  },
  created () {
    const userObj = JSON.parse(window.localStorage.getItem('authUser'))
    this.setError(false)
    this.setAuthUser(userObj)
    this.getAccountData()
    this.getUserTasks(this.authUser.id)
  }
}
</script>


