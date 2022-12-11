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
    props: true
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
    component: () => import(/* webpackChunkName: "create-game" */ '../views/CreatGameView.vue')
  },
  {
    path: '/login',
    name: 'LoginView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Login" */ '../views/LoginView.vue')
  },
  {
    path: '/logincheck',
    name: 'LoginCheckView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "LoginCheck" */ '../views/LoginCheckView.vue')
  },
  {
    path: '/signup',
    name: 'SignupView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "signup" */ '../views/SignupView.vue')
  },
  {
    path: '/Detail/:pk',
    name: 'DetailTestView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "DetailTestView" */ '../views/DetailTestView.vue'),
    props: true
  },
  {
    path: '/userprofile/:pk',
    name: 'UserDetailView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "UserDetailView" */ '../views/UserDetailView.vue')
  },
  {
    path: '/edit-game/:slug',
    name: 'GameEditView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "signup" */ '../views/GameEditView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
