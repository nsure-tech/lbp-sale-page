import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';
import Web3 from 'web3';

import {Erc20} from '@/store/erc20/erc20';
// declare global {
//     interface Window {
//         ethereum: any;
//     }
// }

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {
        version: '1.0.0',
    },
    modules: {
        Erc20,
    }
};
export default new Vuex.Store(store);


export  interface RootState {
    version: string;

}

// export default new Vuex.Store({
//     state: {
//         web3,
//         ethereum,
//         dialogVisible: false,
//         account: '',
//         balance: 0,
//     },
//     mutations: {
//         'UPDATE_DIALOG_VISBLE'(state, flag) {
//             state.dialogVisible = flag;
//         },
//         'SET_ACCOUNT'(state, value) {
//             state.account = value;
//         },
//         'SET_BALANCE'(state, value) {
//             state.balance = value;
//         }
//     },
//     actions: {
//         test(){
//             console.log('test');
//         }
//
//         // // 获取账户和余额
//         // async getAccounts({state, commit}) {
//         //     try {
//         //         const {web3} = state;
//         //         let account = '';
//         //         let balance = 0;
//         //
//         //
//         //         const accounts = await web3.eth.getAccounts();
//         //         if (accounts.length > 0) {
//         //             account = accounts[0];
//         //             const balanceBigNumner = await web3.eth.getBalance(account);
//         //             balance = web3.utils.fromWei(balanceBigNumner)
//         //         }
//         //         console.log(account, balance);
//         //         commit('SET_BALANCE', balance);
//         //         commit('SET_ACCOUNT', account)
//         //     } catch (e) {
//         //         throw Error(e)
//         //     }
//         // },
//
//     },
// });

