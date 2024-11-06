<script setup lang="ts">
import CartItem from './CartItem.vue'
</script>

<template>
  <div class="fixed top-0 z-10 h-full w-full bg-black opacity-70" />
  <div
    class="fixed right-0 top-0 z-10 flex h-full w-96 flex-col justify-between bg-white px-10 py-7"
  >
    <h2 class="mb-10 flex items-center gap-5 text-2xl font-bold">
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
      Корзина
    </h2>
    <div class="flex flex-1 flex-col justify-between">
      <div class="flex flex-col gap-5">
        <CartItem
          title="Мужские Кроссовки Nike Blazer Mid Suede"
          price="1000"
          img="/sneakers/sneakers-1.jpg"
        />
      </div>

      <div>
        <div class="flex flex-col gap-5">
          <div class="flex items-end gap-2">
            <span>Итого:</span>
            <div class="flex-1 border-b border-dashed" />
            <span class="font-bold">1000 руб.</span>
          </div>

          <div class="flex items-end gap-2">
            <span>Налог 5%:</span>
            <div class="flex-1 border-b border-dashed" />
            <span class="font-bold">50 руб.</span>
          </div>
        </div>

        <button
          class="mt-10 flex w-full items-center justify-center gap-3 rounded-xl bg-lime-500 py-3 text-white transition hover:bg-lime-600 active:bg-lime-700"
        >
          Оформить заказ
          <img src="/arrow-next.svg" alt="Arrow" />
        </button>
      </div>
    </div>
  </div>
</template>
