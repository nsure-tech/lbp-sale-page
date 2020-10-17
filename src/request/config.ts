const DOMAIN_CONFIG = {
    // 开发
    dev: {
        // common: 'https://napi.nsure.network/lbp',
        common: 'http://192.168.0.101:8080',
    },
    // 测试
    test: {
        common: 'https://napi.nsure.network/lbp',
    },
    // 正式
    prod: {
        common: 'https://napi.nsure.network/lbp',
    }
};

let domain = DOMAIN_CONFIG.dev;

if (process.env.VUE_APP_CURRENTMODE === 'test') {
    domain = DOMAIN_CONFIG.test;
}

if (process.env.VUE_APP_CURRENTMODE === 'prod') {
    domain = DOMAIN_CONFIG.prod;
}

export const baseURL = domain.common;
