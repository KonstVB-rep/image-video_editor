<script setup lang="ts">
import { computed, onMounted, provide, reactive, watch } from 'vue'
import axios from 'axios'
import { ref } from 'vue'

import Header from '../components/HeaderComponent.vue'
import CardList from '../components/CardList.vue'
import Drawer from '@/components/DrawerComponent.vue'
import CardItemDrawer from '@/components/CardItemDrawer.vue'

const items = ref<SneakerType[] | SneakerTypeShort[]>([])

const drawerOpen = ref(false)
const cart = ref<SneakerType[]>([])

const closeDrawer = () => {
  console.log('clicked')
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
})

const axiosInstanse = axios.create({
  baseURL: 'https://34c9a347072a4183.mokky.dev',
})

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://34c9a347072a4183.mokky.dev/favorites`)

    items.value = items.value.map((item) => {
      const favorite = favorites.find(
        (favorite: { parentId: number; id: number }) => favorite.parentId === item.id,
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

    const { data, status } = await axiosInstanse.get('/sneakers-list', { params })

    if (status !== 200) {
      throw new Error('Something went wrong!')
    }

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

const onChangeSearch = (event: Event) => {
  filters.searchQuery = (event.target as HTMLSelectElement).value
}

onMounted(async () => {
  await fetchItems()
  await fetchFavorites()
})

watch(filters, fetchItems)

const addToFavorites = async (item: SneakerType) => {
  try {
    if (!item.isFavorite) {
      item.isFavorite = true

      const { data } = await axios.post('https://34c9a347072a4183.mokky.dev/favorites', {
        parentId: item.id,
      })

      item.favoriteId = data.id
    } else {
      item.isFavorite = false

      await axios.delete(`https://34c9a347072a4183.mokky.dev/favorites/${item.favoriteId}`)

      item.favoriteId = null
    }
  } catch (error) {
    console.log(error)
  }
}

const addToCart = async (item: SneakerType) => {
  item.isAdded = true
  cart.value.push(item)
}

const removeFromCart = (item: SneakerType) => {
  item.isAdded = false
  cart.value.splice(cart.value.indexOf(item), 1)
}

const toggleAddCart = async (item: SneakerType) => {
  if (item.isAdded) {
    removeFromCart(item)
  } else {
    addToCart(item)
  }
}

const totalCartPrice = computed(() => cart.value?.reduce((acc, item) => acc + item.price, 0))

const createOrder = async () => {
  try {
    const response = await axios.post('https://34c9a347072a4183.mokky.dev/orders', {
      items: cart,
      totalPrice: totalCartPrice,
    })
    const { data } = response
    if (data.status !== 200) {
      throw new Error('Something went wrong!Try again')
    }
    cart.value = []
  } catch (error) {
    console.log(error)
  }
}

provide('cart', {
  cart,
  addToCart,
  removeFromCart,
  toggleAddCart,
  totalCartPrice,
})
</script>

<template>
  <Drawer v-if="drawerOpen" @close-drawer="closeDrawer" />
  <div class="shadow-grey-200 m-auto w-full max-w-7xl rounded-xl bg-white pt-20 shadow-xl">
    <Header @open-drawer="openDrawer" :totalCartPrice="totalCartPrice" />

    <div class="p-10">
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

      <CardList :items="items as SneakerType[]" @add-to-favorites="addToFavorites" />
    </div>
  </div>
</template>
