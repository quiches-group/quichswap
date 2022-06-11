<template>
  <app-menu />
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { ethereum } from './utils/ethereum';
import { useWalletStore } from './stores/wallet.store';
import AppMenu from './components/AppMenu.vue';

const { setWallet } = useWalletStore();

onMounted(async () => {
  ethereum.on('accountsChanged', (accounts) => {
    setWallet(accounts[0]);
  });

  const accounts = await ethereum.request({ method: 'eth_accounts' });
  setWallet(accounts[0]);
});
</script>

<style>
body {
  background-color: #18191a;
  color: white;
}
</style>
