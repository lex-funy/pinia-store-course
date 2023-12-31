import { acceptHMRUpdate, defineStore, storeToRefs } from "pinia"
import { computed, ref } from "vue"
import { useProductStore } from "./product"

// This should ALWAYS be called inside of de defineStore function. 
// Otherwise Pinia may not be loaded yet.
// `const { products } = storeToRefs(useProductStore())`

// use[storeId]Store
// Setup store always returns an object
export const useCartStore = defineStore('cart', () => {
    // Use the product store to manage the products
    // Only save the product ids in the cart
    // See :5
    const { products } = storeToRefs(useProductStore())
    const productIds = ref([])

    const cart = computed(() => productIds.value.map(id => products.value.find(p => p.id === id)))

    // Because this is a computed property, it will be updated when the cart changes
    const cartTotal = computed(() => cart.value.reduce((prev, cur) => prev += cur.price, 0))

    const addToCart = (product) => productIds.value.push(product.id)

    const removeFromCart = (product) => {
        const itemIndex = productIds.value.findIndex(id => id === product.id)
        productIds.value.splice(itemIndex, 1)
    }

    return {
        cart,
        cartTotal,
        addToCart,
        removeFromCart,
    }
})

// Use this to enable hot module replacement
// This is only supported by Vite
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
