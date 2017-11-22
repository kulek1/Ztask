import notificationSound from '@/assets/notification.mp3'
const taskMutations = {
  setTasks (state, tasks) {
    // if host is on Linux with old mysql driver
    let arrayLength = tasks.length
    if (arrayLength > 0) {
      if (typeof tasks[0].done === 'string') {
        for (let i = 0; i < arrayLength; i++) {
          tasks[i].done = parseInt(tasks[i].done)
          tasks[i].uuid = parseInt(tasks[i].uuid)
        }
      }
    }
    state.tasks = tasks
  },
  setComments (state, data) {
    state.comments = data;
  },
  addComment (state, data) {
    state.comments.push(data)
  },
  removeComment (state, data) {
    const index = state.comments.findIndex(x => x.uuid === data.uuid)
    state.comments.splice(index, 1)
  },
  setTaskDone (state, uuid) {
    const index = state.tasks.findIndex(item => item.uuid === uuid)
    state.tasks[index].done = !state.tasks[index].done
  },
  addRow (state) {
    state.isCreatingNewTask = true
  },
  addTask (state, data) {
    if (data.isSound) {
      let audio = new Audio(notificationSound)
      audio.play()
    }
    state.tasks.push({
      uuid: data.uuid,
      name: data.taskName,
      description: ' ',
      author: data.fullName,
      assigned_to: data.fullName,
      created_at: data.created_at,
      type: 'normal',
      done: false
    })
    state.isCreatingNewTask = false
  },
  removeTask (state, data) {
    state.tasks.splice(data.index, 1)
  }
}

export default taskMutations
