import { defineStore } from 'pinia';
import { defaultProvider, network } from '../utils/ethereum';

export const useWalletStore = defineStore('wallet', {
  state: () => ({
    wallet: null,
    networkId: null,
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
  },
});
