import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/home"


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    neme: Login,
    component: () => import('@/views/login')
  },
  {
    path: '/',
    name: Home,
    component: Home
}

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
