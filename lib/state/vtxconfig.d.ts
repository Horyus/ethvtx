import Web3 = require('web3');
export declare const VtxStatus: {
    [key: string]: string;
};
export interface VtxResetStatus {
    txs: boolean;
    blocks: boolean;
    vtxcache: boolean;
    contracts: boolean;
    vtxconfig: boolean;
    accounts: boolean;
}
export interface VtxconfigAllowedNetworks {
    [key: number]: string;
}
export interface VtxconfigSection {
    web3: Web3;
    last_error: Error;
    status: string;
    reset_status: VtxResetStatus;
    poll_timer: number;
    confirmation_threshold: number;
    coinbase: string;
    net_id: number;
    allowed_nets: VtxconfigAllowedNetworks;
}
