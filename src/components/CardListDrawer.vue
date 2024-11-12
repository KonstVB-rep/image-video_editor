<script setup lang="ts">
import { inject } from 'vue'
import CardItemDrawer from './CardItemDrawer.vue'

const { removeFromCart, cart } = inject('cart') as Cart
</script>

<template>
  <div v-auto-animate class="flex h-full flex-col gap-5 overflow-y-auto px-2">
    <CardItemDrawer
      v-for="item in cart.value"
      :key="item.id"
      :id="item.id"
      :title="`Мужские Кроссовки ${item.title}`"
      :img="item.imageUrl"
      :price="item.price"
      @on-click-remove="() => removeFromCart(item)"
    />
  </div>
</template>
