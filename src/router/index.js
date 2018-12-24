import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login'
import index from '@/page/index'
import register from '@/page/register'
import article from '@/page/article'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/article',
      name: 'article',
      component: article
    }
  ]
})
