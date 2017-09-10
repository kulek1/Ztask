import Vue from "vue";
import Vuex from "vuex";
import mainStore from "./components/stores/mainStore";
import authStore from "./components/stores/authStore";
import taskStore from "./components/stores/taskStore";

Vue.use(Vuex);

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    mainStore,
    authStore,
    taskStore
  },
  strict: debug
});
