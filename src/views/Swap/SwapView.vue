<template>
  <div class="p-5 flex flex-col items-center">
    <h1 class="mt-10 text-4xl font-medium text-center">Swap</h1>
    <p class="text-lg font-light text-center text-gray-200">Trade tokens in an instant</p>
    <q-card class="flex flex-col gap-3 p-10 bg-tertiary mt-5">
      <div class="text-gray-500 text-base">Swap from:</div>
      <div class="flex flex-1 items-center p-2 rounded-lg bg-secondary">
        <q-input
          v-model="state.fromAmountInput"
          :disabled="state.swapIsLoading"
          :error="state.fromError"
          background-color="#242526"
          placeholder="Your amount"
          class="w-full flex flex-auto"
          @change="onFirstInputUpdated"
        ></q-input>
        <div class="bg-clip-padding rounded-lg bg-gray-100 flex-none">
          <q-dropdown
            class="disabled:opacity-80"
            :disabled="state.swapIsLoading"
            bg-color="#242526"
            text-color="white"
            placeholder="Token"
            :options="tokens"
            accent-color="darkGray"
            @select="selectFromToken"
          ></q-dropdown>
        </div>
      </div>
      <div class="flex flex-row text-xs">
        <span class="flex-1" />
        <div class="mr-2 text-gray-500">Balance:</div>
        <div class="flex-none">
          <q-format-number class="inline-block" :value="state.fromTokenBalance" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
          <span class="text-white ml-1" v-text="state.fromTokenSymbol" />
        </div>
      </div>
      <div class="flex flex-col items-center mt-3">
        <swap-button />
      </div>
      <div class="text-gray-500">Swap to:</div>
      <div class="flex flex-1 items-center p-2 rounded-lg bg-secondary">
        <q-input
          v-model="state.toAmountInput"
          :disabled="state.swapIsLoading"
          :error="state.toError"
          background-color="#242526"
          placeholder="Amount"
          class="w-full"
          @change="onSecondInputUpdated"
        ></q-input>
        <div class="bg-clip-padding rounded-lg bg-gray-100 flex-none">
          <q-dropdown :disabled="state.swapIsLoading" bg-color="#242526" text-color="white" placeholder="Token" :options="tokens" accent-color="darkGray" @select="selectToToken"></q-dropdown>
        </div>
      </div>
      <div class="flex flex-row text-xs mb-5">
        <span class="flex-1" />
        <div class="mr-2 text-gray-500">Balance:</div>
        <div class="flex-none">
          <q-format-number class="inline-block" :value="state.toTokenBalance" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
          <span class="text-white ml-1" v-text="state.toTokenSymbol" />
        </div>
      </div>

      <div v-if="state.fromTokenSymbol !== '' && state.toTokenSymbol !== ''" class="flex flex-col p-4 my-7 w-full rounded-lg bg-secondary">
        <p class="flex justify-between">
          <span class="text-gray-500">Exchange rate</span>
          1 <span class="text-white ml-1" v-text="state.fromTokenSymbol" /> ≃<q-format-number
            class="inline-block text-white"
            :value="state.formattedAmount"
            :max-fraction-digits="3"
            :min-fraction-digits="3"
            locale="en-US"
          />
          <span class="text-white ml-1" v-text="state.toTokenSymbol" />
        </p>
      </div>

      <connect-button>
        <q-button color="#f40087" :disabled="!emptyInput" :loading="state.swapIsLoading" @click="swap">Swap</q-button>
      </connect-button>
    </q-card>
  </div>

  <q-snackbar v-model="state.showSuccessSnackBar" timeout="3000" dismissable class="border-0 flex flex-row">
    <p class="mr-0.5">
      You have successfully traded <b>{{ state.tradedFromAmount }} {{ state.fromTokenSymbol }}</b> for <b>{{ state.tradedToAmount }} {{ state.toTokenSymbol }}</b> on your wallet!
    </p>
  </q-snackbar>
</template>

<script setup>
/* eslint-disable camelcase */
import { computed, reactive, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import ConnectButton from '../../components/ConnectButton.vue';
import SwapButton from './SwapButton.vue';
import { useWalletStore } from '../../stores/wallet.store';
import { fromWei, toWei } from '../../utils/ethers';

const { fetchBalance } = useWalletStore();
const { stBalance, qchBalance, QCHTokenContract, SampleTokenContract, STQCH_LiquidityProvidingContract } = storeToRefs(useWalletStore());

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
]);

const tokens = computed(() => tokensContracts.value.map((token) => token.name));

const state = reactive({
  swapIsLoading: false,
  fromAmountInput: '',
  toAmountInput: '',
  fromError: '',
  toError: '',
  showSuccessSnackBar: false,
  fromToken: null,
  toToken: null,
  fromTokenBalance: 0,
  fromTokenSymbol: '',
  toTokenBalance: 0,
  toTokenSymbol: '',
  formattedAmount: '',
  tradedFromAmount: 0,
  tradedToAmount: 0,
});

const emptyInput = computed(() => {
  return state.fromAmountInput !== '' && state.fromToken !== null && state.toToken !== null && state.toTokenSymbol !== state.fromTokenSymbol;
});

const enoughBalance = computed(() => {
  return state.fromAmountInput <= state.fromTokenBalance;
});

const getAmountToSwap = async (newFormattedValue) => {
  let newTokenAmountToSwapValue;
  if (state.fromTokenSymbol === 'QCH' && state.toTokenSymbol === 'ST') {
    newTokenAmountToSwapValue = await STQCH_LiquidityProvidingContract.value.getAmountOfToken1(toWei(newFormattedValue));
  } else if (state.fromTokenSymbol === 'ST' && state.toTokenSymbol === 'QCH') {
    newTokenAmountToSwapValue = await STQCH_LiquidityProvidingContract.value.getAmountOfToken2(toWei(newFormattedValue));
  } else {
    newTokenAmountToSwapValue = newFormattedValue;
    return newTokenAmountToSwapValue;
  }
  return Number.parseFloat(fromWei(newTokenAmountToSwapValue)).toFixed(3);
};

const formattedAmount = async () => {
  state.formattedAmount = await getAmountToSwap('1');
};

const onFirstInputUpdated = async (event = null, value = 0) => {
  const newValue = event ? event.target.value : value;
  state.fromError = '';
  const newFormattedValue = newValue.replaceAll(',', '.').replaceAll(/[^\d|.]*/gm, '');
  if (newValue === '0' || newValue === '' || !newFormattedValue) {
    state.toAmountInput = newFormattedValue;
    return;
  }
  await formattedAmount();
  state.toAmountInput = await getAmountToSwap(newFormattedValue);
};

const onSecondInputUpdated = async (event = null, value = 0) => {
  const newValue = event ? event.target.value : value;
  state.toError = '';
  const newFormattedValue = newValue.replaceAll(',', '.').replaceAll(/[^\d|.]*/gm, '');
  if (newValue === '0' || newValue === '' || !newFormattedValue) {
    state.fromAmountInput = newFormattedValue;
    return;
  }
  await formattedAmount();
  state.fromAmountInput = await getAmountToSwap(newFormattedValue);
};

const getFromTokenBalance = async (selectedToken) => {
  await fetchBalance();
  tokensContracts.value.forEach((token) => {
    if (selectedToken !== token.name) {
      return;
    }

    const tokenBalance = computed(() => Number(fromWei(token.balance)));
    state.fromTokenBalance = tokenBalance.value;
    state.fromTokenSymbol = token.name;
  });
};

const getToTokenBalance = async (selectedToken) => {
  await fetchBalance();
  tokensContracts.value.forEach((token) => {
    if (selectedToken !== token.name) {
      return;
    }

    const tokenBalance = computed(() => Number(fromWei(token.balance)));
    state.toTokenBalance = tokenBalance.value;
    state.toTokenSymbol = token.name;
  });
};

const selectFromToken = async (selectedToken) => {
  state.fromError = '';
  await getFromTokenBalance(selectedToken);
  tokensContracts.value.forEach((token) => {
    if (selectedToken !== token.name) {
      return;
    }

    state.fromToken = token;
  });
  await onFirstInputUpdated(null, state.fromAmountInput);
  await formattedAmount();
};

const selectToToken = async (selectedToken) => {
  state.fromError = '';
  await getToTokenBalance(selectedToken);
  tokensContracts.value.forEach((token) => {
    if (selectedToken !== token.name) {
      return;
    }

    state.toToken = token;
  });
  await onSecondInputUpdated(null, state.toAmountInput);
  await formattedAmount();
};

const updateSelectedTokensBalances = async () => {
  await getToTokenBalance(state.toToken.name);
  await getFromTokenBalance(state.fromToken.name);
};

const getSwapMethod = () => {
  if (!['QCH', 'ST'].includes(state.fromToken.name) && !['QCH', 'ST'].includes(state.toToken.name)) {
    return { method: undefined, contract: undefined };
  }

  const contract = STQCH_LiquidityProvidingContract.value;
  const method = state.fromToken.name === 'ST' ? contract.swapToken1 : contract.swapToken2;
  return { method, contract };
};

const swap = async () => {
  state.error = '';
  state.swapIsLoading = true;
  const { method, contract } = getSwapMethod();

  try {
    if (state.fromAmountInput === '0' || !enoughBalance.value) {
      throw new RangeError();
    }
    let tx = await state.fromToken.contract.approve(contract.address, toWei(state.fromAmountInput));
    await tx.wait();
    tx = await method(toWei(state.fromAmountInput));
    await tx.wait();
    state.tradedFromAmount = state.fromAmountInput;
    state.tradedToAmount = state.toAmountInput;
    state.fromAmountInput = '';
    state.toAmountInput = '';
    state.showSuccessSnackBar = true;
  } catch (err) {
    if (err.code === 'INVALID_ARGUMENT' || err.name === 'RangeError') {
      state.fromError = 'Please enter a valid amount';
    } else {
      state.fromError = 'An error occurred, try again';
    }
  }
  await updateSelectedTokensBalances();
  state.swapIsLoading = false;
};

onMounted(formattedAmount);
</script>
