<template>
    <div class="tasklist">
        <ul>
            <li v-for="(task, index) in filteredTasks" :class="{ 'item--completed' : task.isDone }">
                <div class="tasklist__avatar">
                    <a href="" v-on:click.prevent="markDone(index)">
                        <img :src="task.avatarUrl">
                        <div class="complete-task" :class="{ 'complete-task--completed' : task.isDone }">
                            <i class="material-icons">done</i>
                        </div>
                    </a>
                </div>
                <div class="tasklist__name">
                    <h4>{{ task.name }}</h4>
                    <p class="tasklist__author">by {{ task.author }}</p>
                </div>
                <div class="tasklist__delete">
                    <button v-on:click="removeRow(index)" class="icon delete-icon"><i class="material-icons">delete</i>
                    </button>
                </div>
            </li>
            <li v-if="isCreating">
                <div class="tasklist__avatar">
                    <img src="../../assets/noavatar.png">
                </div>
                <div class="tasklist__name">
                    <h4>
                        <input class="material-input" type="text" v-on:keyup.enter="submitForm(this.value)" v-model="newName" placeholder="Your task name" ref="dynamicSize" v-on:keyup="resizeInput()">
                    </h4>
                    <p class="tasklist__author">by me</p>
                </div>
                <div class="tasklist__checkbox"></div>
            </li>
        </ul>
    </div>
</template>

<script>
  import { bus } from '../../eventbus'

  export default {
    props: {
      tasks: {
        type: Array,
        required: true
      },
      isCreating: {
        required: true
      }
    },
    data () {
      return {
        newName: '',
        newAuthor: '',
        inputSize: 0,
        phraseSearch: ''
      }
    },
    methods: {
      submitForm () {
        this.$emit('addTask', this.newName)
        this.newName = ''
      },
      removeRow (index) {
        this.tasks.splice(index, 1)
      },
      markDone (index) {
        let status = this.tasks[index].isDone
        this.tasks[index].isDone = !status
      },
      searchArray (word) {
        return this.tasks.filter(task => task.name.toLowerCase().includes(word))
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
        return this.tasks.filter(task => task.name.toLowerCase().includes(this.phraseSearch.toLowerCase()))
      }
    },
    created: function () {
      bus.$on('searchInput', (data) => {
        this.phraseSearch = data
      })
    }
  }

</script>
