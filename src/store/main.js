// import store from './index'

const state = {
    currentLocale: "ar",
    loggedUser:{},
    token:'',
    isAuthenticated:false,
    homeLink:""
};

const getters = {

};

const actions = {

};

const mutations = {

    setCurrentLocale(state, payload) {
        state.currentLocale = payload;
    },
    setToken(state, payload){
        state.token = `bearer ${payload}`;
    },
    setLoggedUser(state, payload) {
        state.loggedUser = payload
        state.isAuthenticated = true
    },
    setHomeLink(state, payload){
        state.homeLink = payload;
    },
    logout(state) {
        state.loggedUser = null
        state.isAuthenticated = false
    },
    
};


export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
}
