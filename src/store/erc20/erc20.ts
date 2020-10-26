import {Module, ActionTree, MutationTree, GetterTree, Mutation} from 'vuex';
import {DenormalizedWeightAndGetbalance, Erc20Model} from '@/store/erc20/erc20_model';
import Web3 from 'web3';
import {Message} from 'element-ui';
import {RootState} from '@/store';
import {bpoolTOken, Config} from '@/config';
import bPOOL from '@/config/abi/bpool';

const web3: Web3 = new Web3(Web3.givenProvider);
const ethereum = window['ethereum'] || undefined;

const RINKEBY_NETWORK_ID = 1;
const RINKEBY_NETWORK_TIPS = 'please use mainnet to use lbp page!';
// @ts-ignore
const bPOOLContract = new web3.eth.Contract(bPOOL, bpoolTOken);
if (ethereum) {
    web3.eth.net.getId().then((chainId) => {
        if (chainId !== RINKEBY_NETWORK_ID) {
            Message.warning(RINKEBY_NETWORK_TIPS);
        }
        ethereum.on('chainChanged', (_chainId) => {
            window.location.reload();
        });
    });
} else {
    Message.error('Please install Metamask!');
}


export const state: Erc20Model = {
    web3: web3,
    price: 0,
    dWG: undefined,
};


//getters
export const getters: GetterTree<Erc20Model, RootState> = {
    web3(s: Erc20Model): Web3 {
        return s.web3;
    },
    getPrice(state: Erc20Model): number {
        return state.price;
    },
    getDWG(state: Erc20Model): DenormalizedWeightAndGetbalance | undefined {
        return state.dWG;
    },
};

// Mutation
export const mutation: MutationTree<Erc20Model> = {
    setPrice(state: Erc20Model, price: number) {
        state.price = price;
    },
    setDWG(state: Erc20Model, dWG: DenormalizedWeightAndGetbalance) {
        if (dWG != null) {
            state.dWG = dWG;
        }
    },
};


export const actions: ActionTree<Erc20Model, RootState> = {
    async getSpotPrice({commit}) {
        let bb = await bPOOLContract.methods.getSpotPrice(Config.bPoolTokenIn, Config.bPoolTokenOut).call();
        commit('setPrice', bb / 1e6);
    },
    async getDenormalizedWeightAndGetbalance({commit}) {

        let dWG: DenormalizedWeightAndGetbalance = {
            weightA: await bPOOLContract.methods.getDenormalizedWeight(Config.bPoolTokenIn).call(),
            weightB: await bPOOLContract.methods.getDenormalizedWeight(Config.bPoolTokenOut).call(),
            balanceA: await bPOOLContract.methods.getBalance(Config.bPoolTokenIn).call(),
            balanceB: await bPOOLContract.methods.getBalance(Config.bPoolTokenOut).call()
        };

        commit('setDWG',dWG);
    },
};


export const Erc20: Module<Erc20Model, RootState> = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations: mutation,
};
