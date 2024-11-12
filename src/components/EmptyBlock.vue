<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  imgUrl: String,
  title: String,
  text: String,
})
</script>

<template>
  <div class="flex flex-col gap-4 items-center justify-center grow">
    <img :src="imgUrl" alt="Empty image" height="80" width="80" />
    <h3 class="fonr-medium text-2xl">{{ title }}</h3>
    <p class="text-center">{{ text }}</p>
  </div>
</template>
