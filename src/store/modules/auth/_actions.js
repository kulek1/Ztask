import api from '@/helpers/apiConnection'
import { loginUrl, userUrl, getHeader } from '@/auth/config';
import router from '@/router';

const authActions = {
    async getAuthUser({ commit }, postData) {
        let authUser;
        try {
            // get tokens
            const request = await api.post(loginUrl, postData);
            const response = request.data
            authUser = {
                access_token: response.access_token,
                refresh_token: response.refresh_token,
            }
            window.localStorage.setItem('authUser', JSON.stringify(authUser));
            // pass tokens 
            try {
                const request = await api.get(userUrl, { headers: getHeader() });
                const response = request.data;
                Object.assign(authUser, {
                    id: response.id,
                    email: response.email,
                    name: response.name,
                    profession: response.profession,
                })
                window.localStorage.setItem('authUser', JSON.stringify(authUser));
                await commit("setAuthUser", authUser);
                router.push({ name: 'Dashboard' });
            } catch (error) {
                commit("setError", {
                    isError: true,
                    code: error.response.status
                }, { root: true })
            }
        } catch (error) {
            commit("setError", {
                isError: true,
                code: error.response.status
            }, { root: true })
        }
        commit("setLoading", false, { root: true });
    },
    setAuthUser({ commit }, user) {
        commit('setAuthUser', user);
    },
    clearAuthUser({ commit }) {
        commit("clearAuthUser");
    }
};

export default authActions;