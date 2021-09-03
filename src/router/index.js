import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        name: 'Index',
        component: () => import('@/views/frontend/Index.vue'),
        meta: {
          title: '日作 - 豆腐工房'
        }
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/frontend/Products.vue')
      },
      {
        path: 'product/:productId',
        name: 'Product',
        component: () => import('@/views/frontend/Product.vue')
      }
    ]
  },
  {
    path: '*',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/backend/Login.vue')
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('@/views/backend/Dashboard.vue'),
    children: [
      {
        path: 'productsManage',
        name: 'ProductsManage',
        component: () => import('@/views/backend/ProductsManage.vue'),
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
  }
]

const router = new VueRouter({
  routes
})

export default router
