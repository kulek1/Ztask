const actions = {
    setFullname({ commit }, fullname) {
        commit("setFullname", fullname)
    },
    setProfession({ commit }, profession) {
        commit("setProfession", profession)
    },
    toggleSound({ commit }) {
        commit("toggleSound")
    },
    settingsWindow({ commit }, actionObj) {
        commit("settingsWindow", actionObj);
    },
    setLoading({ commit }, isTurn) {
        commit("setLoading", isTurn)
    },
    setError({ commit }, data) {
        commit("setError", data)
    }
};

export default actions;