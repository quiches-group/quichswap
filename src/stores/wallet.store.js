/* eslint-disable camelcase */
import { defineStore } from 'pinia';
import { defaultProvider, network } from '../utils/ethereum';
import { QCHTokenContract, SampleTokenContract, STQCH_LPTokenContract } from '../utils/contracts';

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

      const { provider } = this;
      const qchContract = QCHTokenContract(provider);
      const stqchlpContract = STQCH_LPTokenContract(provider);
      const stContract = SampleTokenContract(provider);

      this.qchBalance = await qchContract.balanceOf(this.wallet);
      this.stBalance = await stContract.balanceOf(this.wallet);
      this.stqchlpBalance = await stqchlpContract.balanceOf(this.wallet);
    },
  },
});
