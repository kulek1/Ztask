const getters = {
    getFullname: (state) => {
        return state.user.fullName;
    },
    getProfession: (state) => {
        return state.user.profession;
    },
    isSettingsWindow: (state) => {
        return state.isSettings;
    },
    isSound: (state) => {
        return state.isSound;
    }
};

export default getters;