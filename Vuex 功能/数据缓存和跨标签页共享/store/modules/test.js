export default {
  namespaced: true,

  state: {
    value: 0
  },

  getters: {
    value: state => {
      return state.value
    }
  },

  mutations: {
    setValue (state, payload) {
      state.value = payload
    }
  },

  actions: {
    getValue ({ state, commit }) {
      commit('setValue', state.value + 1)
    }
  }
}