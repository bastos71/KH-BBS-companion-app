import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BirthBySleepCompanion from '../views/BirthBySleepCompanion.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BirthBySleepCompanion
    },
    {
      path: '/doc',
      name: 'doc',
      component: HomeView
    }
  ]
})

export default router
