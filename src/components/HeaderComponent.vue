<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  totalCartPrice: Number,
})
const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header
    class="flex flex-col items-center gap-5 border-b border-slate-200 px-10 py-8 md:flex-row md:justify-between"
  >
    <RouterLink to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-400">Магазин лучших кроссовок</p>
        </div>
      </div>
    </RouterLink>

    <ul class="flex items-center gap-10">
      <li class="flex cursor-pointer items-center gap-3">
        <button @click="() => emit('openDrawer')" class="btn-std">
          <img src="/cart.svg" alt="Cart" />
          <b>{{ totalCartPrice }} руб.</b>
        </button>
      </li>
      <li class="flex cursor-pointer items-center gap-3">
        <RouterLink to="/favorites" class="btn-std">
          <img src="/heart.svg" alt="Favorite" />
          <span>Закладки</span>
        </RouterLink>
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
