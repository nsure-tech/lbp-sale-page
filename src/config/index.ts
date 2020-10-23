// token配置
const token = {
    BPool: '0x27fdccd1a9ee46b46b3d4547cbf4c57bc10c0508',
};

export const Config = {
    bPoolTokenIn: process.env.BPOOL_TOKENIN || '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    bPoolTokenOut: process.env.BPOOL_TOKENOUT || '0xe22e5Acede7391E41bcbb2af7b2D12787537470b',
};

export const bpoolTOken = token.BPool;
