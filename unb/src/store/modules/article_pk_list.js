const articles_pk_list = {
  state: {
    pklist:null
  },
  mutations: {
    pk_list_mut: function (state, payload) {
      state.pklist = payload
    },  },
  actions: {

    pk_list (dispatch, data) { 
      commit('pk_list_mut', data)
    },

  }
}
export default articles_pk_list
