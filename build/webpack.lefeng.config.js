// 配置文件
const IS_PRD_MODE = (process.env.NODE_ENV === 'prd' ? true : false);

const path = require('path'),
	webpack = require('webpack'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	Clean = require('clean-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	// 静态资源命名空间
	pathNamespace = IS_PRD_MODE ? 'http://h5rsc.vipstatic.com/lefeng/' : '/',
	pathNamespaceHTTPS = IS_PRD_MODE ? 'https://h5rsc-ssl.vipstatic.com/lefeng/' : '/';

const chunkName = IS_PRD_MODE ? 'chunk.[chunkhash].js' : 'chunk.[id].[hash].js';

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: {
		react: Object.keys(require('./package.json').dependencies).filter((item) => item.indexOf('react') === 0 && item.indexOf('react-ui') === -1),
		redux: Object.keys(require('./package.json').dependencies).filter((item) => item.indexOf('redux') === 0),
		other: ['animation-frame', 'classnames', 'countdown', 'history', 'reqwest-without-xhr2', 'swipe-js-iso', 'velocity-animate'],
		app: [path.join(__dirname, '/app/app.jsx')],
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		alias: {
			vender: path.join(__dirname, 'ender'),
			zepto: path.join(__dirname, 'ender/zepto.js'),
			page: path.join(__dirname, '/app/src/page'),
			component: path.join(__dirname, '/app/src/component'),
			lib: path.join(__dirname, '/app/srcb'),
			constant: path.join(__dirname, '/app/src/constant'),
			store: path.join(__dirname, '/app/src/store'),
			action: path.join(__dirname, '/app/src/action'),
			'react-sdk': path.join(__dirname, '/react-sdk'),
			style: path.join(__dirname, '/app/src/style'),
			img: path.join(__dirname, '/img'),
			reqwest: path.join(__dirname, '/app/srcb/reqwest'),
		},
	},
	output: {
		path: path.join(__dirname, 'build'),
		chunkFilename: chunkName,
		publicPath: pathNamespace + 'build/',
		filename: chunkName, // 打包后的名字
	},
	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			exclude: /(node_modules)/,
			loader: 'babel',
			query: {
				stage: 0,
				optional: ['runtime'],
			},
		}, {
			test: /\.styl$/,
			loader: ExtractTextPlugin.extract('style-loader', 'css' +
				(IS_PRD_MODE ? '' : '?localIdentName=[path][name]---[local]---[hash:base64:5]') +
				'!stylus'),
		}, {
			test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
			loader: 'url?limit=10000',
		}],
	},
	stylus: {
		import: [path.join(__dirname, '.de_modules/nib/index'), path.join(__dirname, '/app/src/style/util')],
		define: {
			'$assetPath': pathNamespace,
		},
	},
	plugins: (function() {
		// 由于插件太多，所以通过IIFE方式返回
		const r = [];

		// 生成环境清空冗余文件
		if (IS_PRD_MODE) {
			// 清除上一版本带md5更名的文件
			r.push(new Clean(['build']));

			// 开启压缩
			r.push(new webpack.optimize.UglifyJsPlugin({
				minimize: true,
			}));
		}

		r.push(new webpack.optimize.CommonsChunkPlugin(chunkName, ['react', 'redux', 'other']));

		r.push(new ExtractTextPlugin('chunk.[chunkhash].css'));

		// 引入全局变量
		r.push(new webpack.DefinePlugin({
			__PATH__: JSON.stringify({
				cdn: pathNamespace,
				cdnHTTPS: pathNamespaceHTTPS,
				download: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.yek.lafaso',
			}),
		}));

		r.push(new HtmlWebpackPlugin({
			title: '乐蜂网',
			IS_PRD_MODE: IS_PRD_MODE,
			timestamp: 'Build at ' + new Date(),
			cdnPath: pathNamespace,
			minify: {
				removeComments: IS_PRD_MODE, // 生产环境开启删除注释
				collapseWhitespace: IS_PRD_MODE, // 生产环境开启压缩
			},
			filename: 'index.html',
			inject: 'body',
			hash: !IS_PRD_MODE, // 开发环境添加query hash
			template: 'app/index.template.html',
		}));
		return r;
	})(),
};
