import { defineStore } from 'pinia';
import { defaultProvider } from '../utils/ethereum';

export const useWalletStore = defineStore('wallet', {
  state: () => ({
    wallet: null,
  }),
  getters: {
    walletIsConnected: (state) => !!state.wallet,
    provider: (state) => (!state.wallet ? defaultProvider : defaultProvider.getSigner()),
  },
  actions: {
    setWallet(newWallet) {
      this.wallet = newWallet;
    },
  },
});
