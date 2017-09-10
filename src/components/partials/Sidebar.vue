<template>
  <div class="sidebar">
    <div class="sidebar__action-buttons">
      <a href="" @click.prevent="toggleSound()">
        <i ref="volumeIcon" class="material-icons">volume_up</i>
      </a>
      <router-link to="settings">
        <i class="material-icons float-right">settings</i>
      </router-link>
    </div>
    <div class="sidebar__user-info">
      <div class="sidebar__user-profile" ref="toggleDropdown" data-toggle="dropdown">
        <img src="../../assets/noavatar.png">
        <ul class="dropdown-menu">
          <li>
            <a href="#">Change Avatar</a>
          </li>
          <li>
            <a href="#" @click="logout()">Logout</a>
          </li>
        </ul>
      </div>
      <div class="sidebar__fullname">
        {{ this.getFullname }}
      </div>
      <div class="sidebar__status">
        {{ this.getProfession }}
      </div>
    </div>
    <div class="sidebar__searchbox">
      <div class="searchbox__container mx-auto">
        <input type="text" id="search" placeholder="Search task" v-model="search">
      </div>
    </div>
    <div class="sidebar__filterbox">
      <div class="filterbox__header">Filter by status:</div>
      <ul ref="filterStatus">
        <li class="danger">Important</li>
        <li class="warning">Expiring</li>
        <li class="info">Normal</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { bus } from '../../eventbus'

export default {
  data () {
    return {
      search: ''
    }
  },
  methods: {
    toggleSound () {
      if (this.$refs.volumeIcon.innerText === 'volume_up') {
        this.$refs.volumeIcon.innerText = 'volume_off'
      } else {
        this.$refs.volumeIcon.innerText = 'volume_up'
      }
      this.$store.dispatch('toggleSound')
    },
    openSettings () {
      this.$store.dispatch('settingsWindow', 'open')
    },
    logout () {
      this.$store.dispatch('clearAuthUser')
      window.localStorage.removeItem('authUser')
      this.$router.push({
        name: 'Login'
      })
    }
  },
  watch: {
    search: function () {
      bus.$emit('searchInput', this.search)
    }
  },
  created: function () {
    bus.$on('resetSearchInput', () => {
      this.search = ''
    })
  },
  mounted: function () {
    let self = this

    // filter status
    this.$refs.filterStatus.addEventListener('click', function (e) {
      e.target.classList.toggle('active')
    })

    // Dropdown menu
    this.$refs.toggleDropdown.addEventListener('click', function (e) {
      self.$refs.toggleDropdown.getElementsByTagName('ul').item(0).classList.toggle('show')
    })
  },
  computed: {
    ...mapGetters([
      'getFullname',
      'getProfession'
    ])
  }
}
</script>
