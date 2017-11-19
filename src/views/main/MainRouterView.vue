<template>
  <div>
    <Main-sidebar/>
    <div class="page">
      <Main-header/>
      <router-view/>
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
    ...mapActions('task', ['getUserTasks']),
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


