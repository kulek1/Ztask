import Vue from 'Vue';
import notificationSound from '@/assets/notification.mp3'
const taskMutations = {
    setTasks(state, tasks) {
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
    setTaskDone(state, id) {
        state.tasks[id].done = !state.tasks[id].done;
    },
    addRow(state) {
        state.isCreatingNewTask = true;
    },
    addTask(state, data) {
        if (data.isSound) {
            let audio = new Audio(notificationSound)
            audio.play()
        }
        state.tasks.push({ id: data.taskId, name: data.taskName, description: ' ', author: data.fullName, type: 'normal', done: false })
        state.isCreatingNewTask = false
    },
    removeTask(state, data) {
        state.tasks.splice(data.index, 1)
    }
};

export default taskMutations;