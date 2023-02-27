import { createRouter, createWebHashHistory } from 'vue-router'
import BBSSearchEngine from '../views/BBSSearchEngine.vue'
import BBSMixModule from '../views/BBSMixModule.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
    }
  ]
})

export default router
