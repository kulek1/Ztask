import api from '@/helpers/apiConnection'

const taskActions = {
  setTasks ({ commit }, tasks) {
    commit('setTasks', tasks)
  },
  addRow: ({ commit }) => {
    commit('addRow')
  },
  async setTaskDone ({ commit }, taskData) {
    commit('setTaskDone', taskData.uuid)
    try {
      await api.post('/editTask/', taskData)
    } catch (error) {
      console.log(error.response.status)
    }
  },
  async addTask ({ commit }, data) {
    const addData = {
      name: data.taskName,
      description: 'none',
      author: data.USER_ID,
      type: 'normal',
      done: false
    }
    try {
      const request = await api.post('/addtask/', addData)
      const response = request.data

      // wait for id and timestamp from mysql
      data.uuid = response[0]
      data.created_at = response[1]
      commit('addTask', data)
    } catch (error) {
      console.log(error.response.status)
    }
  },
  async removeTask ({ commit }, data) {
    const removeData = {
      uuid: data.uuid
    }
    try {
      await api.post('/removeTask/', removeData)
      commit('removeTask', data)
    } catch (error) {
      console.log(error.response.status)
    }
  },
  async getUserTasks ({ commit }, userId) {
    try {
      const request = await api.get(`/getUserTasks/${userId}`, {})
      const data = request.data
      commit('setTasks', data)
    } catch (error) {
      console.log(error.response.status)
    }
  },
  async getComments ({ commit }, taskUuid) {
    try {
      const request = await api.get(`/comments/${taskUuid}`, {})
      const data = request.data
      commit('setComments', data)
    } catch (error) {
      console.log(error.response.status)
    }
  },
  async addComment ({ commit }, data) {
    try {
      const request = await api.post('/add-comment', data)
      const response = request.data
      data.uuid = response[0]
      data.created_at = response[1]
      commit('addComment', data)
    } catch (error) {
      console.log(error.response.status)
    }
  },
  async deleteComment ({ commit }, data) {
    try {
      await api.post('/delete-comment', {
        uuid: data.uuid,
        task_uuid: data.task_uuid
      })
      commit('removeComment', data)
    } catch (error) {
      console.log(error.response.status)
    }
  }
}

export default taskActions
