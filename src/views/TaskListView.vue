<template>
  <div class="tasklist__container">
    <ul>
      <li
        v-for="(task, index) in filteredTasks"
        :class="{ 'item--completed' : task.done }"
      >
        <div class="task__avatar">
          <a
            href=""
            v-on:click.prevent="fireTaskDone(index, task.uuid, task.done)"
          >
            <img :src="imgPlaceholder">
            <div
              class="complete-task"
              :class="{ 'complete-task--completed' : task.done }"
            >
              <i class="material-icons">done</i>
            </div>
          </a>
        </div>
        <div class="task__content">
          <router-link
            class="task__name"
            :to="{ name: 'TaskView', params: { uuid: task.uuid } }"
          >{{ task.name }}
          </router-link>
          <p class="task__author">{{ timeAgo(task.created_at) }}</p>
        </div>
        <div class="task__action">
          <button
            type="button"
            @click="editRow(task.uuid)"
            class="icon icon--edit"
          >
            <i class="material-icons">edit</i>
          </button>
          <button
            type="button"
            @click="removeRow(index, task.uuid)"
            class="icon icon--delete"
          >
            <i
              class="material-icons"
              v-if="loadingId !== index"
            >delete</i>
            <img
              src="../assets/preloader.svg"
              class="preloader--button"
              v-else
            >
          </button>
        </div>
      </li>
      <li v-if="this.isCreatingNewTask">
        <div class="task__avatar">
          <img src="../assets/noavatar.png">
        </div>
        <div class="task__content">
          <h4>
            <input
              class="material-input"
              type="text"
              v-on:keyup.enter="submitForm()"
              v-model="newTaskName"
              placeholder="Your task name"
              ref="dynamicSize"
              v-on:keyup="resizeInput()"
            >
          </h4>
          <p class="task__author">by me</p>
        </div>
        <div class="task__checkbox"></div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { bus } from '@/eventbus'
  import noAvatar from '@/assets/noavatar.png'
  import timeago from 'timeago.js'

  export default {
    name: 'TaskListView',
    data () {
      return {
        loadingId: null,
        newTaskName: '',
        newAuthor: '',
        inputSize: 0,
        phraseSearch: '',
        imgPlaceholder: noAvatar
      }
    },
    methods: {
      ...mapActions('task', ['addTask', 'removeTask', 'setTaskDone']),
      submitForm () {
        if (this.newTaskName !== '') {
          const USER_ID = this.authUser.id
          const fullName = this.user.fullName
          const taskName = this.newTaskName
          const isSound = this.isSound
          this.addTask({taskName, fullName, USER_ID, isSound})
        }

        this.newTaskName = ''
      },
      editRow (uuid) {
        this.$router.push({ name: 'TaskView', params: {uuid: uuid} })
      },
      async removeRow (index, uuid) {
        this.loadingId = index
        await this.removeTask({index, uuid})
        this.loadingId = null
      },
      fireTaskDone (index, uuid, isDone) {
        const task = {
          localIndex: index,
          uuid: uuid,
          done: isDone
        }
        this.setTaskDone(task)
      },
      resizeInput () {
        let element = this.$refs.dynamicSize
        let length = element.value.length
        if (length > 20) {
          element.size = length
        } else {
          element.size = 20
        }
      },
      timeAgo (date) {
        return timeago().format(date)
      }
    },
    computed: {
      ...mapState(['user', 'isSound']),
      ...mapState('auth', ['authUser']),
      ...mapState('task', ['tasks', 'isCreatingNewTask']),

      filteredTasks () {
        const sortedTasks = this.tasks.sort((a, b) => {
          return a.created_at.localeCompare(b.created_at)
        })
        return sortedTasks.filter(task =>
          task.name.toLowerCase().includes(this.phraseSearch.toLowerCase())
        )
      }
    },
    created () {
      bus.$on('searchInput', data => {
        this.phraseSearch = data
      })
    }
  }
</script>
