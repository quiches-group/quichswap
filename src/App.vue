<template>
  <navbar @open-wallet-details-modal="state.walletDetailModalIsOpen = true" />
  <wallet-details-modal :is-open="state.walletDetailModalIsOpen" @modal-state-change="state.walletDetailModalIsOpen = $event" />

  <router-view />

  <q-snackbar v-model="isWrongNetwork" color="error">
    <p class="inline mr-0.5">You are not connected to the right network,</p>
    <button class="inline underline" @click="switchNetwork">please switch network</button>
  </q-snackbar>
</template>

<script setup>
import { onMounted, reactive, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { ethereum, defaultProvider, switchNetwork } from './utils/ethereum';
import { useWalletStore } from './stores/wallet.store';
import Navbar from './components/Navbar.vue';
import WalletDetailsModal from './components/WalletDetailsModal.vue';
import { usePriceStore } from './stores/prices.store';

const { setWallet, setNetworkId, fetchBalance } = useWalletStore();
const { fetchTokenPrices, fetchTokenPrices24h } = usePriceStore();
const { isWrongNetwork, provider, wallet } = storeToRefs(useWalletStore());

const state = reactive({
  walletDetailModalIsOpen: false,
});

const getNetwork = async () => {
  const { chainId } = await defaultProvider.getNetwork();
  setNetworkId(`0x${chainId.toString(16)}`);
};

onMounted(async () => {
  fetchTokenPrices();
  fetchTokenPrices24h();

  ethereum.on('accountsChanged', (accounts) => {
    setWallet(accounts[0]);
  });

  const accounts = await ethereum.request({ method: 'eth_accounts' });
  setWallet(accounts[0]);

  await getNetwork();
});

ethereum.on('chainChanged', setNetworkId);

watch([provider, wallet, isWrongNetwork], () => {
  fetchBalance();
});
</script>

<style>
body {
  @apply bg-zinc-900 text-white;
}
</style>
