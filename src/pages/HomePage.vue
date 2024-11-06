<script setup lang="ts">
import Card from '../components/CardComponent.vue'
import Header from '../components/HeaderComponent.vue'
</script>

<template>
  <div class="shadow-grey-200 m-auto mt-20 w-full max-w-7xl  rounded-xl bg-white shadow-xl">
    <Header />

    <div class="p-10">
      <div class="mb-10 flex items-center justify-between">
        <h1 class="text-3xl font-bold">Все кроссовки</h1>
        <div class="flex items-center gap-4">
          <select
            class="rounded-md border border-gray-200 px-3 py-2 focus:border-gray-400 focus:outline-none"
          >
            <option value="name">По названию</option>
            <option value="price">По цене (дешевые)</option>
            <option value="price">По цене (дорогие)</option>
          </select>
          <div class="relative">
            <input
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

      <div class="grid grid-cols-4 gap-10">
        <Card
          title="Мужские Кроссовки Nike Blazer Mid Suede"
          price="1000"
          img="/sneakers/sneakers-1.jpg"
        />
      </div>
    </div>
  </div>
</template>
