// import store from './index'

const state = {
    currentLocale: "ar",
    loggedUser:{},
    token:'',
    isAuthenticated:false,
    homeLink:"",
    themeConfig:{},
    theOrder:[]
};

const getters = {
    getCurrentLocale (state) {
        return state.currentLocale
    }
};

const actions = {

};

const mutations = {

    setCurrentLocale(state, payload) {
        state.currentLocale = payload;
    },
    setToken(state, payload){
        state.token = `Bearer ${payload}`;
    },
    setLoggedUser(state, payload) {
        state.loggedUser = payload
        state.isAuthenticated = true
    },
    setHomeLink(state, payload){
        state.homeLink = payload;
    },
    setThemeConfig(state, payload){
        state.themeConfig = payload;
    },
    setOrder(state, payload){
        state.theOrder.push( payload );
    },
    deleteOrder(state, payload){
        state.theOrder.splice( payload, 1 );
    },
    deleteAllOrder(state){
        state.theOrder = [];
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
