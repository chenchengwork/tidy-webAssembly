const path = require('path');

const devServerConf = {
    port: 9000,
    publicPath: "/public/",

    // 指定服务器内容指定目录
    contentBase: path.resolve(__dirname, 'public'),

    // 监听指定服务器内容指定目录
    watchContentBase: true,

    // 对于某些系统，监听大量文件系统会导致大量的 CPU 或内存占用,这个选项可以排除一些巨大的文件夹
    watchOptions: {
        ignored: /node_modules/
    },

    // 开启服务器的模块热替换(HMR)
    hot: false,

    // 当请求不存在的路由时，直接返回首页
    historyApiFallback: {
        index: '/public/',
        disableDotRule: true,
    },

    stats: {
        colors: true,
    },
};


module.exports = {
    entry: {
        // app: [path.resolve(__dirname, 'src/index.js')]
        app: ["./src"]
    },

    // 用于生成源代码的mapping
    optimization: {
        // 代码分割策略配置
        splitChunks: {
            cacheGroups: {}
        },
    },

    // 指定模块目录名称
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules'],
        // alias: {}
    },

    node: {
        net: "empty",
        fs: "empty",
    },

    output: {
        // 公网发布的目录
        publicPath: "/public/",
        // 编译的目录
        path: path.resolve(__dirname, "public/build"),
        filename: '[name].js',
        chunkFilename: '[name].[chunkhash:8].bundle.js',
    },

    module: {
        rules: [],
    },

    plugins: [],

    // webpack-dev-server
    devServer: devServerConf
}


