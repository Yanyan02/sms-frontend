import { defineStore } from 'pinia'

export const usePurchaseOrder = defineStore('purchasing', {
  state: () => ({
    items: [] as any[] 
  }),
  actions: {
    putData(data: any[]) {
      this.items = data
    }
  }
})

export const supplierEvaluations = defineStore('evaluations', {
  state: () => ({
    items: [] as any[] 
  }),
  actions: {
    putData(data: any[]) {
      this.items = data
    }
  }
})
