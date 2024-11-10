<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue'
import CardListDrawer from './CardListDrawer.vue'

const emit = defineEmits(['close-drawer'])

onMounted(() => {
  document.body.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
      emit('close-drawer')
    }
  })
})
const { totalCartPrice } = inject('cart') as Cart

const k = ref(0.05)

const vatPrice = computed(() => Math.ceil(totalCartPrice.value * k.value))

const totalPriceWithVat = computed(() => Math.ceil(totalCartPrice.value + vatPrice.value || 0))

</script>

<template>
  <div
    class="fixed top-0 z-10 h-full w-full bg-black opacity-70"
    @click="() => emit('close-drawer')"
  />
  <div
    class="fixed right-0 top-0 z-10 flex h-full w-96 flex-col justify-between bg-white px-5 py-7"
  >
    <div class="relative h-full max-h-[100vh]">
      <h2 class="mb-10 flex items-center gap-5 text-2xl font-bold">
        <button @click="() => emit('close-drawer')">
          <svg
            class="rotate-180 cursor-pointer opacity-30 transition hover:-translate-x-1 hover:opacity-100"
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 7H14.7143"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.71436 1L14.7144 7L8.71436 13"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        Корзина
      </h2>

      <div class="flex max-h-[84vh] flex-col gap-5 overflow-y-auto px-2">
        <CardListDrawer />
      </div>

      <div class="absolute bottom-0 left-0 right-0 z-10 bg-white px-5 py-3">
        <div class="flex flex-col gap-5">
          <div class="flex items-end gap-2">
            <span>Итого:</span>
            <div class="flex-1 border-b border-dashed" />
            <span class="font-bold"
              >{{ totalPriceWithVat }} руб.</span
            >
          </div>

          <div class="flex items-end gap-2">
            <span>Налог 5%:</span>
            <div class="flex-1 border-b border-dashed" />
            <span class="font-bold">{{ vatPrice }} руб.</span>
          </div>
        </div>

        <button
          :disabled="totalCartPrice.value <= 0"
          class="mt-10 flex w-full items-center justify-center gap-3 rounded-xl bg-lime-500 py-3 text-white transition hover:bg-lime-600 active:bg-lime-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Оформить заказ
          <img src="/arrow-next.svg" alt="Arrow" />
        </button>
      </div>
    </div>
  </div>
</template>
