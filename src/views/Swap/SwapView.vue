<template>
  <div class="p-5 flex flex-col items-center">
    <q-card class="flex flex-col gap-3 p-10 bg-[#2b2d2e]">
      <div class="text-gray-500 text-base">Swap from:</div>
      <div class="flex flex-1 items-center p-2 rounded-lg" :style="{ backgroundColor: '#242526' }">
        <q-input v-model="state.amountInput" :disabled="state.swapIsLoading" :error="state.error" background-color="#242526" placeholder="Your amount" class="w-full"></q-input>
        <div class="bg-clip-padding rounded-lg bg-gray-100 flex-none"><q-dropdown placeholder="Token" :options="tokens" accent-color="darkGray" @select="selectFromToken"></q-dropdown></div>
      </div>
      <div class="flex flex-row text-xs mb-20">
        <span class="flex-1" />
        <div class="mr-2 text-gray-500">Balance:</div>
        <div class="flex-none">
          <q-format-number class="inline-block" :value="state.fromTokenBalance[0]" :max-fraction-digits="1" :min-fraction-digits="1" locale="en-US" />
          <span class="text-white ml-1" v-text="state.fromTokenBalance[1]" />
        </div>
      </div>
      <div class="flex flex-col items-center mt-3">
        <swap-button />
      </div>
      <div class="text-gray-500">Swap to:</div>
      <div class="flex flex-1 items-center p-2 rounded-lg" :style="{ backgroundColor: '#242526' }">
        <q-input v-model="state.amountInput" :disabled="state.swapIsLoading" :error="state.error" background-color="#242526" placeholder="Your amount" class="w-full"></q-input>
        <div class="bg-clip-padding rounded-lg bg-gray-100 flex-none"><q-dropdown placeholder="Token" :options="tokens" accent-color="darkGray" @select="selectToToken"></q-dropdown></div>
      </div>
      <div class="flex flex-row text-xs mb-20">
        <span class="flex-1" />
        <div class="mr-2 text-gray-500">Balance:</div>
        <div class="flex-none">
          <q-format-number class="inline-block" :value="state.toTokenBalance[0]" :max-fraction-digits="1" :min-fraction-digits="1" locale="en-US" />
          <span class="text-white ml-1" v-text="state.toTokenBalance[1]" />
        </div>
      </div>

      <connect-button>
        <q-button :disabled="emptyInput" :loading="state.swapIsLoading" @click="swap">Swap</q-button>
      </connect-button>
    </q-card>
  </div>

  <q-snackbar :is-open="state.showSuccessSnackBar" size="medium" position="bottom" color="#40b883" class="border-0 flex flex-row">
    <p class="mr-0.5"></p>
  </q-snackbar>
</template>

<script setup>
/* eslint-disable camelcase */
import { reactive, computed } from 'vue';
import { storeToRefs } from 'pinia';
import ConnectButton from '../../components/ConnectButton.vue';
import SwapButton from './SwapButton.vue';
import { useWalletStore } from '../../stores/wallet.store';
import { fromWei } from '../../utils/ethers';

const { fetchBalance } = useWalletStore();
const { stBalance, qchBalance, stqchlpBalance, QCHTokenContract, SampleTokenContract, STQCH_LPTokenContract } = storeToRefs(useWalletStore());

const tokens = ['QCH', 'ST', 'STQCH-LP'];

const tokensContracts = computed(() => [
  {
    name: 'QCH',
    contract: QCHTokenContract.value,
    balance: qchBalance.value,
  },
  {
    name: 'ST',
    contract: SampleTokenContract.value,
    balance: stBalance.value,
  },
  {
    name: 'STQCH-LP',
    contract: STQCH_LPTokenContract.value,
    balance: stqchlpBalance.value,
  },
]);

const state = reactive({
  swapIsLoading: false,
  amountInput: '',
  error: '',
  showSuccessSnackBar: false,
  fromTokenContract: null,
  toTokenContract: null,
  fromTokenBalance: [],
  toTokenBalance: [],
});

const emptyInput = computed(() => {
  return state.amountInput === '';
});

const getFromTokenBalance = async (selectedToken) => {
  await fetchBalance();
  tokensContracts.value.forEach((token) => {
    if (selectedToken === token.name) {
      const tokenBalance = computed(() => Number(fromWei(token.balance)));
      state.fromTokenBalance = [tokenBalance.value, token.name];
    }
  });
};

const getToTokenBalance = async (selectedToken) => {
  await fetchBalance();
  tokensContracts.value.forEach((token) => {
    if (selectedToken === token.name) {
      const tokenBalance = computed(() => Number(fromWei(token.balance)));
      state.toTokenBalance = [tokenBalance.value, token.name];
    }
  });
};

const selectFromToken = async (selectedToken) => {
  await getFromTokenBalance(selectedToken);
  tokensContracts.value.forEach((token) => {
    if (selectedToken === token.name) {
      state.fromTokenContract = token.contract;
    }
  });
};

const selectToToken = async (selectedToken) => {
  await getToTokenBalance(selectedToken);
  tokensContracts.value.forEach((token) => {
    if (selectedToken === token.name) {
      state.toTokenContract = token.contract;
    }
  });
};

const swap = async () => {
  // TODO: Swap methods
};
</script>
