import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Login from '@/views/backend/Login.vue'
import Dashboard from '@/views/backend/Dashboard'
import Products from '@/views/backend/Products'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '*',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: 'products',
        name: 'ProductManage',
        component: Products,
        meta: { requiresAuth: true }
      }
    //   {
    //     path: 'coupons',
    //     name: 'Coupons',
    //     component: Coupons,
    //     meta: { requiresAuth: true }
    //   },
    //   {
    //     path: 'orders',
    //     name: 'Orders',
    //     component: Orders,
    //     meta: { requiresAuth: true }
    //   },
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
