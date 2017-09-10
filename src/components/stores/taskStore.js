import Vue from 'vue'
import { apiUrl } from '../../../env'
import notificationSound from '../../assets/notification.mp3'

const state = {
  tasks: [],
  isCreatingNewTask: false,
};
const getters = {
  getTasks: (state) => {
    return state.tasks;
  },
  isCreatingNewTask: (state) => {
    return state.isCreatingNewTask;
  }
};
const mutations = {
  SET_TASKS(state, tasks) {
    // if host is on Linux with old mysql driver
    let arrayLength = tasks.length;
    if (arrayLength > 0) {
      if (typeof tasks[0].done === 'string') {
        for (let i = 0; i < arrayLength; i++) {
          tasks[i].done = parseInt(tasks[i].done)
          tasks[i].id = parseInt(tasks[i].id)
        }
      }
    }
    state.tasks = tasks;
  },
  SET_TASK_DONE(state, id) {
    state.tasks[id].done = !state.tasks[id].done;
  },
  ADD_ROW(state) {
    state.isCreatingNewTask = true;
  },
  ADD_TASK(state, data) {
    if (data.isSound) {
      let audio = new Audio(notificationSound)
      audio.play()
    }
    state.tasks.push({ id: data.taskId, name: data.taskName, description: ' ', author: data.fullName, type: 'normal', done: false })
    state.isCreatingNewTask = false
  },
  REMOVE_TASK(state, data) {
    let removeData = {
      task_id: data.id
    }
    Vue.http.post(apiUrl + 'removeTask', removeData).then(response => { })
    state.tasks.splice(data.index, 1)
  }
};
const actions = {
  setTasks: ({ commit }, tasks) => {
    commit('SET_TASKS', tasks)
  },
  setTaskDone: ({ commit }, id) => {
    commit('SET_TASK_DONE', id)
  },
  addRow: ({ commit }) => {
    commit('ADD_ROW')
  },
  addTask: ({ commit }, data) => {
    const self = this
    let addData = {
      name: data.taskName,
      description: 'none',
      author: data.USER_ID,
      type: 'normal',
      done: false
    }
    Vue.http.post(apiUrl + 'addtask', addData).then(response => {
      // wait for id from mysql
      data.taskId = parseInt(response.body)
      console.log(data)
      commit('ADD_TASK', data)

    }, response => {
      console.log('error')
    })

  },
  removeTask: ({ commit }, data) => {
    commit('REMOVE_TASK', data)
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
