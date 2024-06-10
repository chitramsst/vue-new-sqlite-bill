import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'

const router = createRouter({
  history: window.envVars.isDev == true ? createWebHistory(import.meta.env.BASE_URL) : createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      //@ts-ignore
      component: () => import('../views/HomeView.vue')
    },
    ,
    {
      path: '/category',
      name: 'category',
      //@ts-ignore
      component: () => import('../views/product/CategoryView.vue')
    },
    {
      path: '/brand',
      name: 'brand',
      //@ts-ignore
      component: () => import('../views/product/brand/BrandView.vue')
    },
    ,
    {
      path: '/unit',
      name: 'unit',
      //@ts-ignore
      component: () => import('../views/settings/UnitView.vue')
    },
    {
      path: '/product',
      name: 'product',
      //@ts-ignore
      component: () => import('../views/product/ProductView.vue')
    },
    {
      path: '/customer',
      name: 'customer',
      //@ts-ignore
      component: () => import('../views/CustomerView.vue')
    },
    {
      path: '/product/create',
      name: 'create-product',
      //@ts-ignore
      component: () => import('../views/product/CreateProductView.vue')
    },
    {
      path: '/supplier',
      name: 'supplier',
      //@ts-ignore
      component: () => import('../views/purchase/supplier/SupplierView.vue')
    },
    {
      path: '/supplier/create',
      name: 'create-supplier',
      //@ts-ignore
      component: () => import('../views/purchase/supplier/CreateSupplierView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
