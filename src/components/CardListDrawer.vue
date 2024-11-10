<script setup lang="ts">
import { inject } from 'vue'
import CardItemDrawer from './CardItemDrawer.vue'

const { removeFromCart, cart } = inject('cart') as Cart
</script>

<template>
  <CardItemDrawer
    v-for="item in cart"
    :key="item.id"
    :id="item.id"
    :title="`Мужские Кроссовки ${item.title}`"
    :img="item.imageUrl"
    :price="item.price"
    @on-click-remove="() => removeFromCart(item)"
  />
</template>
