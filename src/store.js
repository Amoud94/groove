import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);


const state = {
    token: {},
}

const actions = {
    setToken(context, payload) {
        localStorage.setItem('Token', payload);
        context.commit("SET_TOKEN", payload)
    },
}
const mutations = {
    SET_TOKEN(state, payload) {
        state.token = payload
    }
}
const getters = {
    getToken: state => state.token
}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store