import './assets/main.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)


import { createRouter, createWebHistory } from 'vue-router'

import HomePage from './pages/HomePage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/favorites', name: 'favorites', component: () => import('./pages/FavoritesPage.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')
