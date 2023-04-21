import { defineStore } from 'pinia'

export const useProgressLineStore = defineStore('progress-line', {
  state: () => {
    return {
      status: false,
      timeout: 400
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
