<script setup lang="ts">
import { axiosInstanse } from '@/api'
import { inject, onMounted, ref, watch } from 'vue'
import CardList from '../components/CardList.vue'
import EmptyBlock from '@/components/EmptyBlock.vue';

const favorites = ref<SneakerType[]>([])

const { toggleAddCart } = inject('cart') as Cart

const fetchFavorites = async () => {
  try {
    const { data } = await axiosInstanse.get(`/favorites?_relations=items`)

    favorites.value = data.map((obj: {id: number; item: SneakerTypeShort }) => ({...obj.item, isFavorite: true, favoriteId: obj.id}))

  } catch (err) {
    console.log(err)
  }
}

const deleteFromFavorites = async (item: SneakerType) => {
  try {

      item.isFavorite = false

      await axiosInstanse.delete(`/favorites/${item.favoriteId}`)

      favorites.value = favorites.value.filter((favorite) => favorite.id !== item.id)

      item.favoriteId = null
  } catch (error) {
    console.log(error)
  }
}


onMounted(async () => {
  fetchFavorites()
})



</script>

<template>
  <main class="flex flex-col gap-5">
    <h1 class="text-3xl font-bold">Избранное</h1>

    <CardList :items="favorites" @addToFavorites="deleteFromFavorites" @addToCart="toggleAddCart"/>
    <EmptyBlock v-if="!favorites.length" imgUrl="/package-icon.png" title="В избранном пусто" text="Добавьте кроссовки в избранное"/>
  </main>
</template>
