import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/app2',
    name: 'app2',
    // lazy-loading
    component: () => import(/* webpackChunkName: "about" */ '../views/App2.vue')
  },
  {
    path: '/app3',
    name: 'app3',
    // lazy-loading
    component: () => import(/* webpackChunkName: "about" */ '../views/App3.vue')
  },
  {
    path: '/json',
    name: 'json',
    // lazy-loading
    component: () => import(/* webpackChunkName: "about" */ '../views/json.vue')
  },
  {
    path: '/json2',
    name: 'json2',
    // lazy-loading
    component: () => import(/* webpackChunkName: "about" */ '../views/json2.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
