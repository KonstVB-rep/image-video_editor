<script setup lang="ts">
import { inject, onMounted, reactive, watch } from 'vue'
import { ref } from 'vue'
import debounce from 'lodash.debounce'
import CardList from '../components/CardList.vue'
import { axiosInstanse } from '@/api'

const items = ref<SneakerType[] | SneakerTypeShort[]>([])

const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
})

const { cart, toggleAddCart } = inject('cart') as { cart:{value: SneakerType[]}; toggleAddCart: (item: SneakerType) => void }


const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axiosInstanse.get(`/favorites`)

    items.value = items.value.map((item) => {
      const favorite = favorites.find(
        (favorite: { item_id: number; id: number }) => favorite.item_id === item.id,
      )

      if (!favorite) {
        return { ...item, isFavorite: false, favoriteId: null }
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id,
      }
    })
  } catch (err) {
    console.log(err)
  }
}
const fetchItems = async () => {
  try {
    const params: { sortBy: string; title?: string } = {
      sortBy: filters.sortBy,
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axiosInstanse.get('/items', { params })

    items.value = data.map((item: SneakerTypeShort) => ({
      ...item,
      isFavorite: false,
      favoriteId: null,
      isAdded: false,
    }))
  } catch (error) {
    console.log(error)
  }
}

const onChangeSelect = (event: Event) => {
  filters.sortBy = (event.target as HTMLSelectElement).value
}

const onChangeSearch = debounce((event: Event) => {
  filters.searchQuery = (event.target as HTMLSelectElement).value
},300)

const addToFavorites = async (item: SneakerType) => {
  try {
    if (!item.isFavorite) {
      item.isFavorite = true

      const { data } = await axiosInstanse.post('/favorites', {
        item_id: item.id,
      })

      item.favoriteId = data.id
    } else {
      item.isFavorite = false

      await axiosInstanse.delete(`/favorites/${item.favoriteId}`)

      item.favoriteId = null
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem: SneakerType) => cartItem.id === item.id),
  }))
})

watch(() =>cart, () => {
  items.value.forEach((item) => {
    ;(item as SneakerType).isAdded = true
  })
})

watch(filters, fetchItems)
</script>

<template>
  <div class="mb-10 flex items-center justify-between">
    <h1 class="text-3xl font-bold">Все кроссовки</h1>
    <div class="flex items-center gap-4">
      <select
        @change="onChangeSelect"
        class="rounded-md border border-gray-200 px-3 py-2 focus:border-gray-400 focus:outline-none"
      >
        <option value="name">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>
      <div class="relative">
        <input
          @input="onChangeSearch"
          type="text"
          class="rounded-md border border-gray-200 py-2 pl-10 pr-4 focus:border-gray-400 focus:outline-none"
          placeholder="Поиск..."
        />
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <img src="/search.svg" />
        </div>
      </div>
    </div>
  </div>

  <CardList :items="items as SneakerType[]" @add-to-favorites="addToFavorites" @add-to-cart="toggleAddCart" />
</template>
