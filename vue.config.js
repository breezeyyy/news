module.exports = {
	devServer: {
		// 设置代理
		proxy: {
			'/api': { // 访问当前域名的api地址，代理为指定target+/api..，由于不经过浏览器，所以不存在跨域
				target: 'http://localhost:3000',
				changeOrigin: true, // 创建虚拟服务器
				ws: true, // websocket代理
				pathRewrite: {
					// 可进行路径替换 '^/api: ""'
				}
			},
		},
	},
	css: {
		loaderOptions: {
			less: {
				modifyVars: {
					// 直接覆盖变量
					'tabs-line-height': '0.44rem',
					'tab-font-size': '17px',
					'nav-bar-text-color': '#5477B2',
				},
			},
		},
	},
};