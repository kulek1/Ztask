<template>
    <div id="app">
        <sidebar-vue :fullName="fullName" :profession="profession" @toggleSound="toggleSound()" @searchInput="searchArray($event)"></sidebar-vue>
        <div class="page">
            <header-vue @addRow="fireAddRow($event)"></header-vue>
            <tasklist v-if="!isSettings" :tasks="tasks" :isCreating="isCreating" @addTask="fireAddTask($event)"></tasklist>
            <router-view @isOpen="openSettings()" :fullName="fullName" :profession="profession" @changeName="changeFullname($event)" @changeProfession="changeProfession($event)"></router-view>
        </div>
    </div>
</template>

<script>
  import Header from './partials/Header.vue'
  import Sidebar from './partials/Sidebar.vue'
  import TaskList from './partials/TaskList.vue'
  import Settings from './partials/Settings.vue'

  import noAvatar from '../assets/noavatar.png'
  import notificationSound from '../assets/notification.mp3'

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
        fullName: 'Mateusz Kuliński',
        profession: 'Programmer',
        tasks: [
          {
            name: 'Landing page for Secret Project',
            author: 'Mateusz Kuliński',
            avatarUrl: noAvatar,
            isDone: false,
            isDeleted: false
          },
          {name: 'Fix js script', author: 'Mateusz Kuliński', avatarUrl: noAvatar, isDone: false, isDeleted: false},
          {
            name: 'Update navbar layout',
            author: 'Mateusz Kuliński',
            avatarUrl: noAvatar,
            isDone: false,
            isDeleted: false
          }
        ],
        isCreating: false,
        isSettings: false,
        enableSound: true
      }
    },
    methods: {
      fireAddRow (taskName) {
        this.isCreating = true
      },
      fireAddTask (taskName) {
        this.isCreating = false
        this.tasks.push({name: taskName, author: this.fullName, avatarUrl: noAvatar, isDone: false, isDeleted: false})
        if (this.enableSound) {
          this.playSound()
        }
      },
      toggleSound () {
        this.enableSound = !this.enableSound
      },
      playSound () {
        let audio = new Audio(notificationSound)
        audio.play()
      },
      openSettings () {
        this.isSettings = true
      },
      changeFullname (event) {
        this.fullName = event
      },
      changeProfession (event) {
        this.profession = event
      }
    },
    watch: {
      '$route' (from, to) {
        if (from.path === '/settings') {
          this.isSettings = true
        } else if (from.path === '/') {
          this.isSettings = false
        }
      }
    }
  }
</script>


