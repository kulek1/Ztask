const mutations = {
    setFullname(state, fullname) {
        state.user.fullName = fullname;
    },
    setProfession(state, profession) {
        state.user.profession = profession;
    },
    toggleSound(state, profession) {
        state.isSound = !state.isSound;
    },
    settingsWindow(state, action) {
        action === "open" ? state.isSettings = true : state.isSettings = false;
    },
    setLoading(state, isTurn) {
        state.isLoading = isTurn;
    },
    setError(state, data) {
        if (data.isError && data.code !== 'undefined') {
            function codeHelper() {
                switch (data.code) {
                    case 500: return state.errorTypes.serverError;
                    case 404: return state.errorTypes.connectionError;
                    case 401: return state.errorTypes.loginError;
                    case 0: return state.errorTypes.connectionError;
                    default: return 'unknown'
                }
            }
            state.errorFeedback = codeHelper();
        }
        state.isError = data.isError;
    }
};

export default mutations;