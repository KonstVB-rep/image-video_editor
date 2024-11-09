<script setup lang="ts">
import Card from './CardComponent.vue'

const props = defineProps({
  items: Array<SneakerType>,
})

const onClickAdd = (): void => {
  console.log('Add')
 }

 const emit = defineEmits(['addToFavorites'])


</script>

<template>
  <div class="grid grid-cols-auto-fit-200 gap-5">
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
      :onClickAdd="onClickAdd"
      :onClickFavorite="() => emit('addToFavorites', item)"
    />
  </div>
</template>
