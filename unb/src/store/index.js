import { createStore } from 'vuex'
import loginStore from './modules/loginStore'
import refreshtoken from './modules/refreshtoken'
import articles_pk_list from './modules/article_pk_list'
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
    loginStore, refreshtoken, articles_pk_list
  },
  plugins: [
    createPersistedState({
      paths: ['loginStore', 'articles_pk_list']
    })
  ]
})
