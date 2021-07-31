import Vue from 'vue'

import './styles/quasar.styl'
import '@quasar/extras/material-icons/material-icons.css'
import {
	Quasar,
	Dialog,
	LocalStorage
} from 'quasar'

Vue.use(Quasar, {
	config: {},
	plugins: {
		Dialog,
		LocalStorage
	},
	extras: [
		'material-icons'
	]
})
