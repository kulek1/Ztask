<template>
  <div class="sidebar">
    <div class="sidebar__action-buttons">
      <router-link :to="{ name: 'Settings' }">
        <i class="material-icons">settings</i>
      </router-link>
      <a
        href=""
        @click.prevent="openListing()"
      >
        <i class="material-icons list">list</i>
      </a>
    </div>
    <div class="sidebar__user-info">
      <div
        class="sidebar__user-profile"
        ref="toggleDropdown"
        data-toggle="dropdown"
      >
        <img src="../../assets/noavatar.png">
        <ul class="dropdown-menu">
          <li>
            <a href="#">Change Avatar</a>
          </li>
          <li>
            <a
              href="#"
              @click.stop="logout()"
            >Logout</a>
          </li>
        </ul>
      </div>
      <div class="sidebar__fullname">
        {{ user.fullName }}
      </div>
      <div class="sidebar__status">
        {{ user.profession }}
      </div>
    </div>
    <div class="sidebar__searchbox">
      <div class="searchbox__container mx-auto">
        <input
          type="text"
          id="search"
          placeholder="Search task"
          v-model="search"
        >
      </div>
    </div>
    <div class="sidebar__filterbox">
      <div class="filterbox__header">
         Filter:
      </div>
      <ul ref="filterStatus">
        <li class="danger">Important</li>
        <li class="warning">Expiring</li>
        <li class="info">Normal</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { bus } from '@/eventbus'

  export default {
    name: 'MainSidebar',
    data () {
      return {
        search: ''
      }
    },
    methods: {
      ...mapActions(['toggleSound', 'settingsWindow']),
      ...mapActions('auth', ['clearAuthUser']),
      openListing () {
        this.$router.push({ name: 'TaskListView' })
      },
      openSettings () {
        this.settingsWindow('open')
      },
      logout () {
        this.clearAuthUser()
        window.localStorage.removeItem('authUser')
        this.$router.push({
          name: 'Login'
        })
      }
    },
    watch: {
      search () {
        bus.$emit('searchInput', this.search)
      }
    },
    created () {
      bus.$on('resetSearchInput', () => {
        this.search = ''
      })
    },
    mounted () {
      let self = this

      // filter status
      this.$refs.filterStatus.addEventListener('click', function (e) {
        e.target.classList.toggle('active')
      })

      // Dropdown menu
      this.$refs.toggleDropdown.addEventListener('click', function (e) {
        self.$refs.toggleDropdown
          .getElementsByTagName('ul')
          .item(0)
          .classList.toggle('show')
      })
    },
    computed: {
      ...mapState(['user'])
    }
  }
</script>
