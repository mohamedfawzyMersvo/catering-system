import axios from 'axios';
import store from './main';
import { ElLoading } from 'element-plus'
import { useCookies } from "vue3-cookies";

function getHeaders() {
    // const authUser = store.store.state.main.loggedUser
    const token = store.store.state.main.token
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Content-Language': store.getters['main/currentLocale']
    }
    const { cookies } = useCookies();
    
    if (cookies.get("token")) {
        console.log('cookies.get("token")', cookies.get("token"))
        headers['Authorization'] = `${cookies.get("token") || token}`;
    }
    else{
        headers['Authorization'] = token;
    }

    return headers;
}

export default function setupAxiosConfig() {
    // axios.defaults.baseURL = 'https://internalevents.mersvo.com/cateringapis/api/'
    // axios.defaults.baseURL = 'http://api.catering.hminvent.net/api/'
    // axios.defaults.baseURL = 'https://psuite.mersvo.com/catering/api/api/'
    // axios.defaults.baseURL = 'https://psuite.mersvo.com/cateringSTC/api/api/'
    axios.defaults.baseURL = 'https://psuite.mersvo.com/catering/albilad/api/api/'      
    

    

    axios.interceptors.request.use((config) => {
            // set Headers
            config.headers = getHeaders();
            // console.log('header', axios.getUri(config))
            window.loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
              })

            return config;
        },
        (error) => {
            // store.commit('main/addErr', error.toString());
            window.loading.close()
            return Promise.reject(error);
        });

    axios.interceptors.response.use(
        (response) => {
            // NProgress.done()
            window.loading.close()
            return response.data
        },
        (error) => {
            // let data = error.response.data;
            // if (data.statusCode > 403) {
            //     // store.commit('main/addErr', data.error.message)
            // }
            window.loading.close()
            return Promise.reject(error);
        });
}