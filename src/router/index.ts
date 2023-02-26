import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BBSCommands from '../views/BBSCommands.vue'
import BBSSearchEngine from '../views/BBSSearchEngine.vue'
import BBSMixModule from '../views/BBSMixModule.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'bbs-mix-module',
      component: BBSMixModule
    },
    {
      path: '/bbs-search-engine',
      name: 'bbs-search-engine',
      component: BBSSearchEngine
    },
    {
      path: '/bbs-commands',
      name: 'bbs-commands',
      component: BBSCommands
    },
    {
      path: '/doc',
      name: 'doc',
      component: HomeView
    }
  ]
})

export default router
