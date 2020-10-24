// token配置
const token = {
    BPool: '0x4C709bE5dfcE030a7719Af9eC8e472D57803e569',
};

export const Config = {
    bPoolTokenIn: process.env.BPOOL_TOKENIN || '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    bPoolTokenOut: process.env.BPOOL_TOKENOUT || '0xDaDDf3D778b9188e731d14F8F2207FF6eA03FBE0',
};

export const bpoolTOken = token.BPool;
