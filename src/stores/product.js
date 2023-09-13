import { acceptHMRUpdate, defineStore } from "pinia"
import { ref } from "vue"


export const useProductStore = defineStore('products', () => {
    const products = ref([])
    const productsLoading = ref(false)

    const getProductsAsync = async () => {
        const res = await fetch('/api/products')
        products.value = await res.json()
    }

    return {
        products,
        getProductsAsync,
        productsLoading,
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot))
}

