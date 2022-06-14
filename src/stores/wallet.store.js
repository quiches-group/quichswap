/* eslint-disable camelcase */
import { defineStore } from 'pinia';
import { defaultProvider, network } from '../utils/ethereum';
import {
  QCH_StackingContract,
  QCHTokenContract,
  SampleTokenContract,
  ST_StackingContract,
  STQCH_LiquidityProvidingContract,
  STQCH_LPTokenContract,
  STQCHLP_StackingContract,
} from '../utils/contracts';

export const useWalletStore = defineStore('wallet', {
  state: () => ({
    wallet: null,
    networkId: null,
    qchBalance: 0,
    stBalance: 0,
    stqchlpBalance: 0,
  }),
  getters: {
    walletIsConnected: (state) => !!state.wallet,
    provider: (state) => (!state.wallet ? defaultProvider : defaultProvider.getSigner()),
    isWrongNetwork: (state) => (!state.networkId ? false : state.networkId !== network.chainId),
    SampleTokenContract() {
      return !this.provider ? undefined : SampleTokenContract(this.provider);
    },
    QCHTokenContract() {
      return !this.provider ? undefined : QCHTokenContract(this.provider);
    },
    STQCH_LPTokenContract() {
      return !this.provider ? undefined : STQCH_LPTokenContract(this.provider);
    },
    QCH_StackingContract() {
      return !this.provider ? undefined : QCH_StackingContract(this.provider);
    },
    ST_StackingContract() {
      return !this.provider ? undefined : ST_StackingContract(this.provider);
    },
    STQCH_LiquidityProvidingContract() {
      return !this.provider ? undefined : STQCH_LiquidityProvidingContract(this.provider);
    },
    STQCHLP_StackingContract() {
      return !this.provider ? undefined : STQCHLP_StackingContract(this.provider);
    },
  },
  actions: {
    setWallet(newWallet) {
      this.wallet = newWallet;
    },
    setNetworkId(newNetworkId) {
      this.networkId = newNetworkId;
    },
    async fetchBalance() {
      if (!this.walletIsConnected) {
        this.qchBalance = 0;
        this.stBalance = 0;
        this.stqchlpBalance = 0;

        return;
      }

      this.qchBalance = await this.QCHTokenContract.balanceOf(this.wallet);
      this.stBalance = await this.SampleTokenContract.balanceOf(this.wallet);
      this.stqchlpBalance = await this.STQCH_LPTokenContract.balanceOf(this.wallet);
    },
  },
});
