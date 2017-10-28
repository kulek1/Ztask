import taskState from './_state';
import taskMutations from './_mutations';
import taskActions from './_actions';
import taskGetters from './_getters';

const taskModule = {
    namespaced: true,
    state: taskState,
    mutations: taskMutations,
    actions: taskActions,
    getters: taskGetters,
};

export default taskModule;
