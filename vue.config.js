const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    css: {
        loaderOptions: {

            // postcss: {
            //     plugins: [
            //         require('postcss-pxtorem')({
            //             rootValue: 192,
            //             selectorBlackList: ['weui', 'mu','.am-'],
            //             propList: ['*']
            //         })
            //     ]
            // },
            scss: {
                data: `@import "@/assets/styles/mixnis.scss";`
            },
        }
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/'
        : '/'
};
