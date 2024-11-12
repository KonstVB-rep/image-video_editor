<script setup lang="ts">
import Header from './components/HeaderComponent.vue'
import Drawer from './components/DrawerComponent.vue'
import { computed, onMounted, provide, ref, watch } from 'vue'
import { axiosInstanse } from './api'

const drawerOpen = ref(false)
const cart = ref<SneakerType[]>([])
// const isCreatingOrder = ref(false)

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

// const createOrder = async () => {
//   try {
//     isCreatingOrder.value = true
//     const response = await axiosInstanse.post('/orders', {
//       items: cart.value,
//       totalPrice: totalCartPrice.value,
//     })
//     const { data } = response

//     cart.value = []
//     console.log(cart.value)
//     return data
//   } catch (error) {
//     console.log(error)
//   }finally {
//     isCreatingOrder.value = false
//   }
// }

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

onMounted(() => {
  cart.value = JSON.parse(localStorage.getItem('cart') || '[]')
})

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true },
)

provide('cart', {
  cart,
  addToCart,
  removeFromCart,
  toggleAddCart,
  totalCartPrice,
})
</script>

<template>
  <Drawer v-if="drawerOpen" @close-drawer="closeDrawer" :total-price="totalCartPrice" />
  <div
    class="shadow-grey-200 m-auto flex h-full w-full max-w-7xl flex-col rounded-xl bg-white pt-20 shadow-xl"
  >
    <Header @open-drawer="openDrawer" :totalCartPrice="totalCartPrice" />

    <div class="grow p-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
