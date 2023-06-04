import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: null
    }
  },
  actions: {
    set(user) {
      this.user = user
    }
  },
  getters: {
    getRoles: (state) => {
      return state.user?.roles
    }
  }
})
