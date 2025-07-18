import { defineStore } from 'pinia'

export const useChecklist = defineStore('checklist', {
  state: () => ({
    items: [] as any[] 
  }),
  actions: {
    putData(data: any[]) {
      this.items = data
    }
  }
})


