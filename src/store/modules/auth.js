import axios from 'axios'
import { error } from '../../utils/errors'
const TOKEN_KEY = 'jwt-token'

export default {
  namespaced: true,
  state () {
    return {
      token: localStorage.getItem(TOKEN_KEY)
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },
    logOut (state) {
      state.token = null
      localStorage.removeItem(TOKEN_KEY)
    }
  },
  actions: {
    async login ({ commit, dispatch }, user) {
      try {
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=API-KEY'

        const { data } = await axios.post(url, { ...user, returnSecureToken: true })
        commit('setToken', data.idToken)
        commit('authErrors/deleteMessage', null, { root: true })
      } catch (e) {
        dispatch('authErrors/setMessage', {
          value: error(e.response.data.error.message),
          type: 'error'

        }, { root: true })
        throw new Error(e)
      }
    }
  },
  getters: {
    token (state) {
      return state.token
    },
    isAuth (_, getters) {
      return !!getters.token
    }
  }
}
