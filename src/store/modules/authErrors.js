export default {
  namespaced: true,
  state () {
    return {
      message: null
    }
  },
  mutations: {
    setMessage (state, message) {
      state.message = message
    },
    deleteMessage (state) {
      state.message = null
    }
  },
  actions: {
    setMessage ({ commit }, message) {
      commit('setMessage', message)
      setTimeout(() => {
        commit('deleteMessage')
      }, 50000)
    }
  },
  getters: {}
}
