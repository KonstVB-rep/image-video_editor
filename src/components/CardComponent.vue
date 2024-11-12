<script setup lang="ts">
import { type PropType } from 'vue'

const props = defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  isAdded: Boolean,
  favoriteId: Number as PropType<number | null>,
  isFavorite: Boolean,

  onClickAdd: {
    type: Function as PropType<() => void>,
  },
  onClickFavorite: {
    type: Function as PropType<() => void>,
  },
})

</script>

<template>
  <div
    class="cursor-pointerrounded-xl relative grid w-full max-w-[280px] grid-rows-[60%_20%_20%] border border-slate-100 p-8 transition hover:-translate-y-2 hover:transform hover:shadow-xl"
  >
    <div class="absolute left-8 top-8" v-if="onClickFavorite">
      <button @click="onClickFavorite" class="btn-std rounded-md">
        <img :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'" alt="Favorite" />
      </button>
    </div>
    <img :src="imageUrl" class="h-full w-full" :alt="title" />
    <p>{{ title }}</p>
    <div class="align-center mt-5 flex justify-between">
      <div class="flex flex-col gap-2">
        <span class="text-slate-700">Цена:</span>
        <span class="font-bold">{{ price }} руб.</span>
      </div>
      <button class="btn-std self-center rounded-md" @click="onClickAdd">
        <img :src="!isAdded ? '/plus.svg' : '/checked.svg'" :alt="!isAdded ? 'Plus' : 'Checked'" />
      </button>
    </div>
  </div>
</template>
