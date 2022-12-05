import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/balance-game/:slug',
    name: 'balance-game',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "balance-game" */ '../views/BalanceGameView.vue'),
    props: true,
  },
  {
    path: '/all-list',
    name: 'all-list',
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "all-list" */ '../views/AllListView.vue')
  },
  {
    path: '/create-game',
    name: 'create-game',
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "all-list" */ '../views/CreatGameView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
