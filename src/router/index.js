import Vue from 'vue'
import Router from 'vue-router'
import myfilter from '../components/myfilter'
import chukudetail from '../components/chukudetail'
import rukudetail from '../components/rukudetail'
// import detail from '../components/chukudetail'
// import detail from '../components/chukudetail'

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
      path: '/chukudetail',
      name: 'chukudetail',
      component: chukudetail,
      meta:{
        index:1
      }
    },
    {
      path: '/rukudetail',
      name: 'rukudetail',
      component: rukudetail,
      meta:{
        index:11
      }
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
        index:10
      }
    },
    {
      path: '/order',
      name: 'order',
      component: order,
      meta:{
        index:20
      }
    },
  ]
})
