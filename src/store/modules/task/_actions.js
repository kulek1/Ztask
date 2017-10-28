import Vue from 'vue'
import { apiUrl } from '@/../env'

const taskActions = {
    setTasks: ({ commit }, tasks) => {
        commit('setTasks', tasks)
    },
    setTaskDone: ({ commit }, id) => {
        commit('setTaskDone', id)
    },
    addRow: ({ commit }) => {
        commit('addRow')
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
            commit('addTask', data)

        }, response => {
            console.log('error')
        })

    },
    removeTask: ({ commit }, data) => {
        commit('removeTask', data)
    }
};

export default taskActions;