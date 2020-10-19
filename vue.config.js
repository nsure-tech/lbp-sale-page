const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({ // 把px单位换算成rem单位
                        rootValue: 192, // 换算的基数(设计图750的根字体为32)
                        selectorBlackList: ['weui', 'mu','.am-'], // 忽略转换正则匹配项
                        propList: ['*']
                    })
                ]
            }
        }
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : './'
};
