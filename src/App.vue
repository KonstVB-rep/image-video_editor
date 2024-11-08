<script setup lang="ts">
import HomePage from './pages/HomePage.vue'
import Drawer from './components/DrawerComponent.vue'
import { ref } from 'vue';


const drawerOpen = ref(false);

</script>

<template>

  <HomePage />
</template>

<style scoped></style>
