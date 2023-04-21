import { defineStore } from 'pinia'

export const useSnackbarStore = defineStore('snackbar', {
  state: () => {
    return {
      visible: false,
      color: null,
      message: null,
      timeout: 3000
    }
  },
  actions: {
    show(color, message) {
      this.visible = true
      this.color = color
      this.message = message
    }
  },
  getters: {}
})
