import { createStore } from 'vuex'
import loginStore from './modules/loginStore'
import refreshtoken from './modules/refreshtoken'
import createPersistedState from 'vuex-persistedstate'
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    loginStore, refreshtoken
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      paths: ['loginStore']
    })
  ]
})
