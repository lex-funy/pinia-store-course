import { defineStore } from "pinia"
import { computed, ref } from "vue"

// use[storeId]Store
// Setup store always returns an object
export const useCartStore = defineStore('cart', () => {
    const cart = ref([])

    // Because this is a computed property, it will be updated when the cart changes
    const cartTotal = computed(() => cart.value.reduce((prev, cur) => prev += cur.price, 0))

    return { 
        cart, 
        cartTotal,
    }
})