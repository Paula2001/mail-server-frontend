import { createRouter, createWebHistory } from 'vue-router'
import DomainView from '@/views/DomainView.vue'
import DomainDetailsView from '@/views/DomainDetailsView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DomainView,
    },
    {
      path: "/domain-details",
      component: DomainDetailsView
    }
  ],
})

export default router
