import Vue from 'vue'
import Router from 'vue-router'
import myfilter from '../components/myfilter'
import detail from '../components/detail'
import chuku from '../components/chuku'
import ruku from '../components/ruku'
import order from '../components/order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'chuku',
      component: chuku,
      meta:{
        index:0
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/chuku',
      name: 'chuku',
      component: chuku,
      meta:{
        index:0
      }
    },
    {
      path: '/ruku',
      name: 'ruku',
      component: ruku,
      meta:{
        index:1
      }
    },
    {
      path: '/order',
      name: 'order',
      component: order,
      meta:{
        index:2
      }
    },
  ]
})
