import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: null
    }
  },
  actions: {
    on() {
      this.status = true
    },
    off() {
      const timeout = setTimeout(() => {
        this.status = false
        clearTimeout(timeout)
      }, this.timeout)
    }
  },
  getters: {}
})
