import { defineStore } from 'pinia'

export const useProgressLineStore = defineStore('progress-line', {
  state: () => {
    return {
      status: false,
      timeout: 250
    }
  },
  actions: {
    start() {
      this.status = true
    },
    stop() {
      const timeout = setTimeout(() => {
        this.status = false
        clearTimeout(timeout)
      }, this.timeout)
    }
  },
  getters: {
    getStatus(state) {
      return state.status
    }
  }
})
