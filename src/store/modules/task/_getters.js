const taskGetters = {
    getTasks: (state) => {
        return state.tasks;
    },
    isCreatingNewTask: (state) => {
        return state.isCreatingNewTask;
    }
};

export default taskGetters;