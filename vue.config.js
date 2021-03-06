const path = require('path');


module.exports = {
	publicPath: './',
	pluginOptions: {
		quasar: {
			importStrategy: 'kebab',
			rtlSupport: false
		}
	},
	transpileDependencies: [
		'quasar'
	],
	chainWebpack: (config) => {
		config.resolve.alias
			.set('util', path.join(__dirname, './src/util/'))
			.set('@', path.join(__dirname, './src/'))
			.set('components', path.join(__dirname, './src/components/'))
	},
	devServer: {
		proxy: {  //配置跨域
			'/api': {
				target: 'https://api.51tracking.com',
				changOrigin: true,  //允许跨域
				pathRewrite: {
					'^/api': ''
				}
			},

		}
	},
	css: {
		loaderOptions: {
			stylus: {
				import: '~@/assets/style/theme.styl'
			}
		}
	}
}
