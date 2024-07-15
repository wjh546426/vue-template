'use strict'
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

// detail: https://cli.vuejs.org/zh/config/#vue-config-js
module.exports = {
    // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径（默认'/'）。
    // publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
    // 在npm run build 或 yarn build 时，生成文件的目录名称（默认dist）
    // outputDir: 'dist',
    // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
    // assetsDir: 'static',
    // 指定生成的index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。（默认index.html）
    // indexPath: "index.html",
    // 是否开启eslint保存检测，有效值：boolean | 'warning' | 'default' | 'error'
    lintOnSave: process.env.NODE_ENV === 'development',
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,

    chainWebpack(config) {
        config.module
            .rule('svg')
            .exclude.add(resolve('src/assets/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/assets/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    },

    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "~@/assets/styles/mixin.scss";`,
            },
        }
    },

    // devServer: {
    //     proxy: {
    //         [process.env.VUE_APP_BASE_API]: {
    //             target: `http://localhost:8080`,
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 ['^' + process.env.VUE_APP_BASE_API]: ''
    //             }
    //         }
    //     },
    // },
}
