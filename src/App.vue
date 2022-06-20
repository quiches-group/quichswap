<template>
  <app-menu @open-wallet-details-modal="state.walletDetailModalIsOpen = true" />
  <wallet-details-modal :is-open="state.walletDetailModalIsOpen" @modal-state-change="state.walletDetailModalIsOpen = $event" />
  <router-view class="mt-10" />

  <q-snackbar :is-open="isWrongNetwork" size="medium" position="bottom" color="rgb(220 38 38)" class="border-2 border-red-900 flex flex-row">
    <p class="mr-0.5">You are not connected to the right network,</p>

    <button class="underline" @click="switchNetwork">please switch network</button>
  </q-snackbar>
</template>

<script setup>
import { onMounted, reactive, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { ethereum, defaultProvider, switchNetwork } from './utils/ethereum';
import { useWalletStore } from './stores/wallet.store';
import AppMenu from './components/AppMenu.vue';
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
  background-color: #18191a;
  color: white;
}
</style>
