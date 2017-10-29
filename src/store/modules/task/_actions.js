import api from '@/helpers/apiConnection'

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
    async addTask({ commit }, data) {
        const addData = {
            name: data.taskName,
            description: 'none',
            author: data.USER_ID,
            type: 'normal',
            done: false
        }
        try {
            const request = await api.post('/addtask/', addData);
            const response = request.data
            // wait for id from mysql
            data.taskId = parseInt(response.body)
            commit('addTask', data)
        } catch (error) {
            console.log(error.response.status)
        }
    },
    async removeTask({ commit }, data) {
        const removeData = {
            task_id: data.id
        }
        try {
            const request = await api.post('/removeTask/', removeData);
            commit('removeTask', data)
        } catch (error) {
            console.log(error.response.status)
        }
    },
    async getUserTasks({ commit }, userId) {
        try {
            const request = await api.get(`/getUserTasks/${userId}`, {});
            const data = request.data;
            commit('setTasks', data)
        } catch (error) {
            console.log(error.response.status)
        }
    }
};

export default taskActions;