import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import Web3 from 'web3';


import {Erc20} from '@/store/erc20/erc20';


Vue.use(Vuex);
const store: StoreOptions<RootState> = {
    state: {
        version: '1.0.0',
    },
    modules: {
        Erc20,
    },
};
export default new Vuex.Store(store);


export interface RootState {
    version: string;

}



