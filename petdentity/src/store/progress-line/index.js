import { defineStore } from "pinia";

export const useProgressLineStore = defineStore("progress-line", {
  state: () => {
    return {
      status: false,
      timeout: 150,
    };
  },
  actions: {
    start() {
      this.status = true;
    },
    stop() {
      const timeout = setTimeout(() => {
        this.status = false;
        clearTimeout(timeout);
      }, this.timeout);
    },
  },
});
