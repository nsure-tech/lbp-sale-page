// token配置
const token = {
    BPool: '0x9403d141047422Fbf43724FcB985b1e96196c84f',
};

export const Config = {
    bPoolTokenIn: process.env.BPOOL_TOKENIN || '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    bPoolTokenOut: process.env.BPOOL_TOKENOUT || '0x20945cA1df56D237fD40036d47E866C7DcCD2114',
};

export const bpoolTOken = token.BPool;
