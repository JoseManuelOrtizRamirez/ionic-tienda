import { createRouter, createWebHistory } from '@ionic/vue-router';
import HomePage from '../views/HomePage.vue'
import Search from '../views/Search.vue'
import Create from '../views/CreatePage.vue'
import Update from '../views/UpdatePage.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/update',
    name: 'Update',
    component: Update
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
