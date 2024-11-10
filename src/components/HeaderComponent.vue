<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  totalCartPrice: Number,
})
const emit = defineEmits(['openDrawer'])

</script>

<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">
    <div class="flex items-center gap-4">
      <img src="/logo.png" alt="Logo" class="w-11" />
      <div>
        <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
        <p class="text-slate-400">Магазин лучших кроссовок</p>
      </div>
    </div>

    <ul class="flex items-center gap-10">
      <li class="flex cursor-pointer items-center gap-3">
        <button @click="() => emit('openDrawer')" class="btn-std">
          <img src="/cart.svg" alt="Cart" />
          <b>{{ totalCartPrice }} руб.</b>
        </button>
      </li>
      <li class="flex cursor-pointer items-center gap-3">
        <button class="btn-std">
          <img src="/heart.svg" alt="Favorite" />
          <span>Закладки</span>
        </button>
      </li>
      <li class="flex cursor-pointer items-center gap-3">
        <button class="btn-std">
          <img src="/profile.svg" alt="Favorite" />
          <span>Профиль</span>
        </button>
      </li>
    </ul>
  </header>
</template>
