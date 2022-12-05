import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from '../src/axios'

createApp(App).use(store).use(router).mount('#app')
axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('access_token')
