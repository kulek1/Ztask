<template>
  <div class="tasklist">
    <ul>
      <li v-for="(task, index) in filteredTasks" :class="{ 'item--completed' : task.done }">
        <div class="tasklist__avatar">
          <a href="" v-on:click.prevent="markDone(index, task.id)">
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
          <button v-on:click="removeRow(index, task.id)" class="icon delete-icon">
            <i class="material-icons">delete</i>
          </button>
        </div>
      </li>
      <li v-if="this.isCreatingNewTask">
        <div class="tasklist__avatar">
          <img src="../../assets/noavatar.png">
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
import { mapState, mapGetters } from 'vuex'
import { bus } from '../../eventbus'
import noAvatar from '../../assets/noavatar.png'

export default {
  data () {
    return {
      newTaskName: '',
      newAuthor: '',
      inputSize: 0,
      phraseSearch: '',
      imgPlaceholder: noAvatar
    }
  },
  methods: {
    console (demo) {
      console.log(demo)
    },
    submitForm () {
      const USER_ID = this.authStore.authUser.id
      let fullName = this.getFullname
      let taskName = this.newTaskName
      let isSound = this.isSound
      this.$store.dispatch('addTask', { taskName, fullName, USER_ID, isSound })

      this.newTaskName = ''
    },
    removeRow (index, id) {
      this.$store.dispatch('removeTask', { index, id })
    },
    markDone (index, id) {
      this.$store.dispatch('setTaskDone', index)
    },
    resizeInput () {
      let element = this.$refs.dynamicSize
      let length = element.value.length
      if (length > 20) {
        element.size = length
      } else {
        element.size = 20
      }
    }
  },
  computed: {
    filteredTasks: function () {
      console.log(this.getTasks)
      return this.getTasks.filter(task => task.name.toLowerCase().includes(this.phraseSearch.toLowerCase()))
    },
    ...mapState({
      authStore: state => state.authStore
    }),
    ...mapGetters([
      'isCreatingNewTask',
      'getTasks',
      'getFullname',
      'isSound'
    ])
  },
  created: function () {
    bus.$on('searchInput', (data) => {
      this.phraseSearch = data
    })
  }
}
</script>
