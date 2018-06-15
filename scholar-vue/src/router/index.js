import Vue from 'vue'
import Router from 'vue-router'

import Home from './../components/Home.vue'
import HomePage from './../components/views/ContentShow.vue'
import Introduction from './../components/views/Introduction.vue'

import Admin from './../components/Admin.vue'
import Canvas from './../components/admin/Canvas.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'homepage',
          component: HomePage
        },
        {
          path: 'html',
          name: 'html',
          component: Introduction
        },
        {
          path: 'javascript',
          name: 'javascript',
          component: Introduction
        },
        {
          path: 'nodejs',
          name: 'nodejs',
          component: Introduction
        },
        {
          path: 'react-native',
          name: 'react-native',
          component: Introduction
        },
        {
          path: 'about',
          name: 'about',
          component: Introduction
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/canvas',
      name: 'canvas',
      component: Canvas
    }
  ]
})
