import { defineStore } from 'pinia'
import { getUser } from '@/utils/session'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: getUser()
    }
  }
})
