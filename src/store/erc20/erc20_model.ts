import Web3 from 'web3';

export interface Erc20Model {

    web3: Web3;
    price: number;
    dWG?:DenormalizedWeightAndGetbalance

}


export interface DenormalizedWeightAndGetbalance {
    balanceA: string;
    balanceB: string;
    weightA: string;
    weightB: string;
}





