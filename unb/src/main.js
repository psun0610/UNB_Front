import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from '../src/axios'
// import BootstrapVue3 from 'bootstrap-vue-3'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

createApp(App).use(store).use(router).mount('#app')

if (localStorage.getItem('access_token')) {
  axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('access_token')
}
