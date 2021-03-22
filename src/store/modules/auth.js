import api from '../../api/imgur'
import { router } from '../../main'

const state = {
    token: window.localStorage.getItem('imgur_token'),
};

const getters = {
    isLoggedIn: state => !!state.token // true if token set
};

const actions = {
    login: () => {
        api.login();
    },
    finalizeLogin({ commit }, hash) {
        const args = hash.substring(1); // skip initial '#'/hash character
        const token = api.getToken(args);
        commit('setToken', token);
        router.push('/');
    },
    logout: ({ commit }) => {
        commit('setToken', null);
    },
};

const mutations = {
    setToken: (state, token) => {
        console.log("setting token to " + token);
        state.token = token;
        if (token !== null)
            window.localStorage.setItem('imgur_token', token);
        else
            window.localStorage.removeItem('imgur_token');
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};