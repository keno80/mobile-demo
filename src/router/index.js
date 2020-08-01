import Vue from 'vue'
import VueRouter from 'vue-router'

import Overlay from "../overlay";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Overlay,
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/Home/index'),
        meta: {title: '首页'}
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
