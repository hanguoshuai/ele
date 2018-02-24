import Vue from 'vue'
import Router from 'vue-router'
import Content1 from '@/components/content'
import Bbb from '@/components/sellers'
import Aaa from '@/components/aaa'
import ccc from '@/components/ccc'
import goods from '@/components/goods/goods'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			component: Content1,
			redirect:'/goods',
			children: [{
				path: '/goods',
				component: goods,
			},
			{
				path:'/bbb',
				component:Bbb
			},
			{
				path:'/ccc',
				component:ccc
			}
			]
	}
	]
})