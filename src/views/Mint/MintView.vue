<template>
  <connect-button>
    <button @click="mint">Mint</button>
  </connect-button>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useWalletStore } from '../../stores/wallet.store';
import ConnectButton from '../../components/ConnectButton.vue';
import { SampleTokenContract } from '../../utils/contracts';
import { toWei } from '../../utils/ethers';

const { provider, wallet } = storeToRefs(useWalletStore());
const stackingContract = computed(() => SampleTokenContract(provider.value));

const mint = async () => {
  await stackingContract.value.mint(wallet.value, toWei('500'));
};
</script>
