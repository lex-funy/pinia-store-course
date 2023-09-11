<template>
  <div>
    <ul class="products">
      <li class="product-item" v-for="(product, index) in productStore.products" :key="index">
        <ProductInfo :product="product">
          <button class="cta" @click="addToCart(product)">Buy</button>
        </ProductInfo>
      </li>
    </ul>
  </div>
</template>

<script setup>
import ProductInfo from './product-info/ProductInfo.vue'
import { useCartStore } from '../stores/cart'
import { useProductStore } from '../stores/product'

const cartStore = useCartStore()
const productStore = useProductStore()

productStore.getProductsAsync()

function addToCart(product) {
  // you can use patch to update multiple properties at once
  // this only updates the values you pass in
  cartStore.$patch((state) => {
    state.cart.push({ ...product })
  })
}
</script>

<style scoped>
.products {
  margin: 0 100px;
}

.product-item {
  border-bottom: 2px solid #999;
}
</style>