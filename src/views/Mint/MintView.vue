<template>
  <div class="p-5 flex flex-col items-center">
    <q-card class="p-10 bg-[#2b2d2e] outline-1">
      <div class="flex flex-row">
        <div class="flex-none">Your balance:</div>
        <span class="flex-1" />
        <div class="flex-none">{{ walletBalance }} QCH</div>
      </div>
      <div class="mt-5 flex flex-row">
        <q-input v-model="state.amountInput" background-color="white" placeholder="Your amount" class="text-black w-full"></q-input>
      </div>
      <connect-button class="mt-5">
        <q-button class="mt-5" @click="mint">Mint</q-button>
      </connect-button>
    </q-card>
  </div>
</template>

<script setup>
import { computed, reactive, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useWalletStore } from '../../stores/wallet.store';
import ConnectButton from '../../components/ConnectButton.vue';
import { QCHTokenContract } from '../../utils/contracts';
import { fromWei, toWei } from '../../utils/ethers';

const { wallet, walletIsConnected, provider } = storeToRefs(useWalletStore());
const mintingContract = computed(() => QCHTokenContract(provider.value));

const state = reactive({
  walletBalance: 0,
  amountInput: null,
});

const walletBalance = computed(() => Number(fromWei(state.walletBalance)));
const tokenContract = computed(() => mintingContract.value.tokenContract(provider.value));

const fetchData = async () => {
  if (!walletIsConnected.value) {
    state.walletBalance = 0;

    return;
  }
  state.walletBalance = await tokenContract.value.balanceOf(wallet.value);
};

const mint = async () => {
  await mintingContract.value.mint(wallet.value, toWei(state.amountInput.toString()));
  await fetchData();
};

onMounted(() => {
  fetchData();
});

watch(provider, () => {
  fetchData();
});
</script>
