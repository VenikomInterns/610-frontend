import Vue from 'vue'
import VueRouter from 'vue-router'
import Categories from '../views/Categories.vue'
import ShoppingCart from '../views/ShoppingCart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'categories',
    component: Categories
  },
  {
    path: '/shopping-cart',
    name: 'shopping-cart',
    component: ShoppingCart
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
