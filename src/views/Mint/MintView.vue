<template>
  <div class="p-5 flex flex-col items-center">
    <q-card class="flex flex-col gap-5 p-10 bg-[#2b2d2e] outline-1">
      <div class="flex flex-row">
        <div class="flex-none">Your balance:</div>
        <span class="flex-1" />
        <div class="flex-none">
          <q-format-number class="inline-block" :value="walletBalance" :max-fraction-digits="1" :min-fraction-digits="1" locale="en-US" />
          <span class="text-white" v-text="' ST'" />
        </div>
      </div>
      <div class="flex flex-row">
        <q-input v-model="state.amountInput" background-color="#242526" placeholder="Your amount" class="w-full"></q-input>
      </div>
      <connect-button>
        <q-button :loading="state.mintIsLoading" @click="mint">Mint</q-button>
      </connect-button>
    </q-card>
  </div>
  <q-snackbar :is-open="state.showSuccessSnackBar" size="medium" position="bottom" color="rgb(56 74 56)" class="border-2 border-green-700 flex flex-row">
    <p class="mr-0.5">You have successfully minted {{ state.amountInput }} ST!</p>
  </q-snackbar>
</template>

<script setup>
import { computed, reactive, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useWalletStore } from '../../stores/wallet.store';
import ConnectButton from '../../components/ConnectButton.vue';
import { SampleTokenContract } from '../../utils/contracts';
import { fromWei, toWei } from '../../utils/ethers';

const { fetchBalance } = useWalletStore();
const { wallet, walletIsConnected, provider } = storeToRefs(useWalletStore());
const sampleTokenContract = computed(() => SampleTokenContract(provider.value));

const state = reactive({
  walletBalance: 0,
  mintIsLoading: false,
  amountInput: '',
});

const walletBalance = computed(() => Number(fromWei(state.walletBalance)));

const fetchData = async () => {
  if (!walletIsConnected.value) {
    state.walletBalance = 0;

    return;
  }
  state.walletBalance = await sampleTokenContract.value.balanceOf(wallet.value);
  await fetchBalance();
};

const mint = async () => {
  state.mintIsLoading = true;
  const tx = await sampleTokenContract.value.mint(wallet.value, toWei(state.amountInput));
  await tx.wait();
  await fetchData();
  state.mintIsLoading = false;
  state.amountInput = '';
};

onMounted(() => {
  fetchData();
});

watch(provider, () => {
  fetchData();
});
</script>
