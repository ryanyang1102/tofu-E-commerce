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
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/frontend/Cart.vue')
      },
      {
        path: 'cart_order',
        name: 'CartOrder',
        component: () => import('@/views/frontend/CartOrder.vue')
      },
      {
        path: 'cart_checkout/:orderId',
        name: 'CartCheckout',
        component: () => import('@/views/frontend/CartCheckout.vue')
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
        path: 'products_manage',
        name: 'ProductsManage',
        component: () => import('@/views/backend/ProductsManage.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: () => import('@/views/backend/Coupons.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('@/views/backend/Orders.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
