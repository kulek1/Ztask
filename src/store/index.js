import Vue from 'vue';
import Vuex from 'vuex';
import globalModule from './modules/global/index';
import authModule from './modules/auth/index';
import taskModule from './modules/task/index';

Vue.use(Vuex);

export default new Vuex.Store({
    ...globalModule,
    modules: {
        auth: authModule,
        task: taskModule,
    },
});
