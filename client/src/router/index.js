/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Categorie from '@/components/Categorie'
import Ville from '@/components/Ville'
import Endroit from '@/components/Endroit'
import endroitAdd from '@/components/endroitAdd'

Vue.use(Router)

export default new Router({
  routes: [
   {
      path: '/',
      name: 'Categorie',
      component: Categorie
    },
    {
      path: '/ville',
      name: 'Ville',
      component: Ville,
      props: true
    },
    {
      path: '/endroit',
      name: 'Endroit',
      component: Endroit,
      props: true
    },
    {
      path: '/endroitAdd',
      name: 'endroitAdd',
      component: endroitAdd,
      props: true
    },
  ]
})
/* eslint-disable */
