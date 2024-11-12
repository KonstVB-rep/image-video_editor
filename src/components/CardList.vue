<script setup lang="ts">
import Card from './CardComponent.vue'

defineProps({
  items: Array<SneakerType>,
})

const emit = defineEmits(['addToFavorites', 'addToCart'])



</script>

<template>
  <div class="grid grid-cols-auto-fit-200 gap-5 justify-center" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :title="item.title"
      :price="item.price"
      :imageUrl="item.imageUrl"
      :isAdded="item.isAdded"
      :favoriteId="item.favoriteId"
      :isFavorite="item.isFavorite"
      :onClickAdd="() => emit('addToCart', item)"
      :onClickFavorite="() => emit('addToFavorites', item)"
    />
  </div>
</template>
