import Vue from 'vue'

import './styles/quasar.styl'
import '@quasar/extras/material-icons/material-icons.css'
import {
	Quasar,
	Dialog,
	LocalStorage,
	Notify
} from 'quasar'

Vue.use(Quasar, {
	config: {},
	plugins: {
		Dialog,
		LocalStorage,
		Notify

	},
	extras: [
		'material-icons'
	]
})
