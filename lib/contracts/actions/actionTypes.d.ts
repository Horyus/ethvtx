import { Action } from 'redux';
import { NewContractInfos, TxInfos } from '../../state/txs';
export declare const ContractsActions: {
    ContractsAddSpec: string;
    ContractsRemoveSpec: string;
    ContractsReset: string;
    ContractsNew: string;
    ContractsSetWeb3Instance: string;
    ContractsRemove: string;
    ContractsSetSigner: string;
    ContractsSend: string;
    ContractsDeploy: string;
    ContractsInstanceSetValidity: string;
};
export interface IContractsSetWeb3Instance extends Action<string> {
    contract_name: string;
    contract_address: string;
    clear: boolean;
}
export interface IContractsInstanceSetValidity extends Action<string> {
    contract_name: string;
    contract_address: string;
    validity: boolean;
}
export interface IContractsDeploy extends Action<string> {
    id: number;
    contract: NewContractInfos;
    args: any[];
    tx_infos: Partial<TxInfos>;
}
export interface IContractsSend extends Action<string> {
    call: () => Promise<string>;
    id: number;
    method: string;
    args: any[];
    contract: string;
    address: string;
}
export interface IContractsAddSpec extends Action<string> {
    name: string;
    abi: any;
    bin?: string;
    constructor_bin?: string;
    permanent?: boolean;
}
export interface IContractsRemoveSpec extends Action<string> {
    name: string;
}
export interface IContractsNew extends Action<string> {
    contract: string;
    address: string;
    alias?: string;
    permanent?: boolean;
    balance?: boolean;
}
export interface IContractsRemove extends Action<string> {
    contract: string;
    address_or_alias: string;
}
export interface IContractsReset extends Action<string> {
}
export declare type ContractsActionTypes = IContractsAddSpec | IContractsRemoveSpec | IContractsNew | IContractsRemove | IContractsInstanceSetValidity | IContractsSetWeb3Instance;
