const state = {
	isSettings: false,
	isSound: true,
	user: {
		fullName: '',
		profession: '',
	}
};

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

const mutations = {
	SET_FULLNAME(state, fullname) {
		state.user.fullName = fullname;
	},
	SET_PROFESSION(state, profession) {
		state.user.profession = profession;
	},
	TOGGLE_SOUND(state, profession) {
		state.isSound = !state.isSound;
	},
	TOGGLE_NEW_TASK_INPUT(state) {
		state.isCreating = !state.isCreating;
	},
	SETTINGS_WINDOW(state, action) {
		action === "open" ? state.isSettings = true : state.isSettings = false;
	}
};
const actions = {
	setFullname: ({ commit }, fullname) => {
		commit("SET_FULLNAME", fullname)
	},
	setProfession: ({ commit }, profession) => {
		commit("SET_PROFESSION", profession)
	},
	toggleSound: ({ commit }) => {
		commit("TOGGLE_SOUND")
	},
	settingsWindow: ({ commit }, actionObj) => {
		commit("SETTINGS_WINDOW", actionObj);
	}
};

export default {
	state,
	getters,
	mutations,
	actions
};
