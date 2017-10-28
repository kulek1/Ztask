const authActions = {
    setAuthUser: ({ commit }, userObj) => {
        commit("setAuthUser", userObj);
    },
    clearAuthUser: ({ commit }) => {
        commit("clearAuthUser");
    }
};

export default authActions;