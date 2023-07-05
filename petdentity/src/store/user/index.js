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
    },

    setProfilePhoto(url) {
      this.user.profile.photoUrl = url
    },

    parseAuth(authUser) {
      this.user.email = authUser.email
      this.user.emailVerified = authUser.emailVerified
      this.user.isAnonymous = authUser.false
    }
  },
  getters: {
    getRoles: (state) => {
      return state.user?.roles
    }
  }
})
