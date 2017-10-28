import authState from './_state';
import authMutations from './_mutations';
import authActions from './_actions';
import authGetters from './_getters';

const authModule = {
    namespaced: true,
    state: authState,
    mutations: authMutations,
    actions: authActions,
    getters: authGetters,
};

export default authModule;
