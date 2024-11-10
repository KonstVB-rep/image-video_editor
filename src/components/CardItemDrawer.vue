<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  id: Number,
  title: String,
  img: String,
  price: Number,
  onClickRemove: {
    type: Function as PropType<() => void>,
  },
})

const emit = defineEmits(['onClickRemove'])

</script>

<template>
  <div class="grid grid-cols-[1fr_1.5fr] items-center gap-4 rounded-xl border border-slate-200 p-4">
    <img class="h-full w-full cover" :src="img" :alt="title" />

    <div class="flex flex-1 flex-col">
      <p>{{ title }}</p>

      <div class="mt-2 flex justify-between">
        <b class="flex-1">{{ price }} руб.</b>
        <button class="btn-std self-center rounded-md" @click="emit('onClickRemove')">
          <img class="cursor-pointer opacity-40 transition hover:opacity-100" src="/close.svg" />
        </button>
      </div>
    </div>
  </div>
</template>
