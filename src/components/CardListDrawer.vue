<script setup lang="ts">
import CardItemDrawer from './CardItemDrawer.vue';

</script>

<template>
  <CardItemDrawer
    v-for="i in 4"
    :key="i"
    :id="i"
    :title="`Мужские Кроссовки ${i}`"
    :img="`/sneakers/sneakers-${i}.jpg`"
    :price="i * 1000"
  />
</template>
