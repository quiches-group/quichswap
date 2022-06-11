<template>
  <q-button v-if="!walletIsConnected" @click="connectMetamask">Connect</q-button>
  <slot v-else />
</template>

<script setup>
import 'vue';
import { storeToRefs } from 'pinia';
import { useWalletStore } from '../stores/wallet.store';
import { ethereum, isEthereumInjected } from '../utils/ethereum';

const { walletIsConnected } = storeToRefs(useWalletStore());
const { setWallet } = useWalletStore();

const connectMetamask = async () => {
  if (!isEthereumInjected) return;
  if (walletIsConnected.value) return;

  const [newWallet] = await ethereum.request({ method: 'eth_requestAccounts' });
  setWallet(newWallet);
};
</script>
