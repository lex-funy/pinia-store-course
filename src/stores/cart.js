import { defineStore } from "pinia"
import { ref } from "vue"

// use[storeId]Store
// Setup store always returns an object
export const useCartStore = defineStore('cart', () => {
    const cart = ref([])

    return { cart }
})