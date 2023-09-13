export default function localStoragePlugin({ store }) {
    store.$subscribe((mutation, state) => {
        for (const propertyName in state) {
            const key = `${store.cacheKeyPrefix}-${mutation.storeId}-${propertyName}`
            const value = JSON.stringify(state[propertyName])
    
            localStorage.setItem(key, value)
        }
    })
    
    store.$onAcion((name, store, _args, after, onError) => {
        if (name !== 'getProductsAsync') return
    
        store.productsLoading = true
    
        after(() => { store.productsLoading = false })
        onError(() => { store.productsLoading = false })
    })

    return {
        cacheKeyPrefix: 'robot-shop',
    }
}