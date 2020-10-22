// token配置
const token = {
    BPool: '0xd7e18D95B38C5d24B5c53263f56E81B20f050BEC',
};

export const Config = {
    bPoolTokenIn: process.env.BPOOL_TOKENIN || '0xC8f9c6df37df937Fe009DA0c254c06Aa8fAe4999',
    bPoolTokenOut: process.env.BPOOL_TOKENOUT || '0x225185C30e51824DA6DB04a22be44e7e89dD18D6',
};

export const bpoolTOken = token.BPool;
