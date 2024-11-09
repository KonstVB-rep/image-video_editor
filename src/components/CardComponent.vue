<script setup lang="ts">
import { inject, ref, type PropType } from 'vue'

const props = defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  isAdded: Boolean,
  favoriteId: Number as PropType<number | null>,
  isFavorite: Boolean,

  onClickAdd: {
    type: Function,
    default: () => {},
  },
  onClickFavorite: {
    type: Function as PropType<() => void>,
  },
})

// const addToFavorites = inject('addToFavorites') as (item: SneakerType) => void

// const onClickFavorite = () => {
//   const item = {
//     ...props,
//     parentId: props.id,
//   }

//   addToFavorites?.(item as SneakerType)
// }
</script>

<template>
  <div
    class="cursor-pointerrounded-xl relative grid w-full max-w-[280px] grid-rows-[60%_20%_20%] border border-slate-100 p-8 transition hover:-translate-y-2 hover:transform hover:shadow-xl"
  >
    <div class="absolute left-8 top-8">
      <button @click="onClickFavorite">
        <img :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'" alt="Favorite" />
      </button>
    </div>
    <img :src="imageUrl" class="h-full w-full" :alt="title" />
    <p>{{ title }}</p>
    <div class="mt-5 flex justify-between">
      <div class="flex flex-col gap-2">
        <span class="text-slate-700">Цена:</span>
        <span class="font-bold">{{ price }} руб.</span>
      </div>
      <button>
        <img :src="!isAdded ? '/plus.svg' : '/checked.svg'" :alt="!isAdded ? 'Plus' : 'Checked'" />
      </button>
    </div>
  </div>
</template>
