import { defineStore } from "pinia"
import { ref } from "vue"


export const useProductStore = defineStore('products', () => {
    const products = ref([])

    const getProductsAsync = async () => {
        const res = await fetch('/api/products')
        products.value = await res.json()
    }

    return {
        products,
        getProductsAsync,
    }
})