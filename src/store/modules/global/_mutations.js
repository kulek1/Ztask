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
    }
};

export default mutations;