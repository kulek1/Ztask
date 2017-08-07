<template>
    <div class="sidebar">
        <div class="sidebar__action-buttons">
            <a href="" @click.prevent="toggleSound()"><i ref="volumeIcon" class="material-icons">volume_up</i></a>
            <router-link to="settings"><i class="material-icons float-right">settings</i></router-link>
        </div>
        <div class="sidebar__user-info">
            <div class="sidebar__user-profile">
                <img src="../../assets/noavatar.png">
            </div>
            <div class="sidebar__fullname">
                {{ fullName }}
            </div>
            <div class="sidebar__status">
                {{ profession }}
            </div>
        </div>
        <div class="sidebar__searchbox">
            <div class="searchbox__container mx-auto">
                <input type="text" id="search" placeholder="Search task" v-model="search">
            </div>
        </div>
    </div>
</template>

<script>
  import { bus } from '../../eventbus'

  export default {
    props: ['fullName', 'profession', 'enableSound'],
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
        this.$emit('toggleSound')
      },
      openSettings () {
        this.$emit('isOpen')
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
    }
  }
</script>
