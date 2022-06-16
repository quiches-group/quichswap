<template>
  <div class="flex flex-col items-center px-4 py-5 mx-auto mt-5 max-w-xs rounded-lg bg-tertiary">
    <q-input v-model="state.stTokensToStack" class="w-full" background-color="#242526" placeholder="O ST" :outline="true" @input="onStTokensToStackUpdated" />
    <p class="mt-2 ml-auto">
      <span class="text-gray-500">Balance: </span>
      <q-format-number class="inline-block text-white" :value="formattedStWalletBalance" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
      <span class="text-white" v-text="` ST`" />
    </p>

    <span class="flex justify-center items-center p-2 pb-3 mx-auto my-5 w-10 h-10 text-3xl font-bold leading-none rounded-full bg-secondary">+</span>
    <q-input v-model="state.qchTokensToStack" class="w-full" background-color="#242526" placeholder="O QCH" :outline="true" @input="onQchTokensToStackUpdated" />
    <p class="mt-2 ml-auto">
      <span class="text-gray-500">Balance: </span>
      <q-format-number class="inline-block text-white" :value="formattedQchWalletBalance" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
      <span class="text-white" v-text="` QCH`" />
    </p>

    <div class="flex flex-col p-4 mt-7 w-full rounded-lg bg-secondary">
      <p class="flex justify-between">
        <span>1 ST per QCH</span>
        <q-format-number class="inline-block text-white" :value="formattedStValueInQch" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
      </p>
      <p class="flex justify-between mt-2">
        <span>1 QCH per ST</span>
        <q-format-number class="inline-block text-white" :value="formattedQchValueInSt" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
      </p>
    </div>

    <q-button class="mt-5" :disabled="state.stTokensToStack === '' && state.qchTokensToStack === ''" :loading="state.isAddingLiquidity" @click="addLiquidity">Add liquidity</q-button>

    <q-snackbar :is-open="state.isAddingLiquidity" size="medium" position="bottom" color="#FFB883" class="flex flex-row border-2" style="border-color: #ffb883">
      <p class="mr-0.5">Waiting transations ends. Please follow your wallet instructions.</p>
    </q-snackbar>

    <q-snackbar :is-open="state.isSuccessfullyAddLiquidity" size="medium" position="bottom" color="#42B883" class="flex flex-row border-2 border-primary">
      <p class="mr-0.5">Transations ends successfully. Your liquidity has been added</p>
    </q-snackbar>
  </div>
</template>

<script setup>
/* eslint-disable camelcase */
import { computed, reactive, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useWalletStore } from '../stores/wallet.store';
import { fromWei, toWei } from '../utils/ethers';

const { stBalance, qchBalance, STQCH_LiquidityProvidingContract, SampleTokenContract, QCHTokenContract } = storeToRefs(useWalletStore());

const state = reactive({
  stWalletBalance: 0,
  qchWalletBalance: 0,
  valueOfOneQchInSt: 0,
  valueOfOneStInQch: 0,
  stTokensToStack: '',
  qchTokensToStack: '',
  isAddingLiquidity: false,
  isSuccessfullyAddLiquidity: false,
});

const formattedStWalletBalance = computed(() => Number(fromWei(stBalance.value)));
const formattedQchWalletBalance = computed(() => Number(fromWei(qchBalance.value)));
const formattedStValueInQch = computed(() => Number(fromWei(state.valueOfOneStInQch)));
const formattedQchValueInSt = computed(() => Number(fromWei(state.valueOfOneQchInSt)));

onMounted(async () => {
  state.valueOfOneStInQch = await STQCH_LiquidityProvidingContract.value.getAmountOfToken1(toWei('1'));
  state.valueOfOneQchInSt = await STQCH_LiquidityProvidingContract.value.getAmountOfToken2(toWei('1'));
});

async function onStTokensToStackUpdated(event) {
  const newValue = event.target.value;

  if (newValue === '0' || newValue === '') {
    state.qchTokensToStack = newValue;
    return;
  }

  // TODO: add regex to invalid other inputs than digits

  const newQchTokensToStackValue = await STQCH_LiquidityProvidingContract.value.getAmountOfToken1(toWei(newValue));
  state.qchTokensToStack = fromWei(newQchTokensToStackValue);
}
async function onQchTokensToStackUpdated(event) {
  const newValue = event.target.value;

  if (newValue === '0' || newValue === '') {
    state.stTokensToStack = newValue;
    return;
  }

  // TODO: add regex to invalid other inputs than digits

  const newStTokensToStackValue = await STQCH_LiquidityProvidingContract.value.getAmountOfToken2(toWei(newValue));
  state.stTokensToStack = fromWei(newStTokensToStackValue);
}

async function addLiquidity() {
  state.isAddingLiquidity = true;
  const STtransaction = await SampleTokenContract.value.approve(STQCH_LiquidityProvidingContract.value.address, toWei(state.stTokensToStack));
  await STtransaction.wait();
  console.log('ST contract tx passed !');

  const QCHtransaction = await QCHTokenContract.value.approve(STQCH_LiquidityProvidingContract.value.address, toWei(state.qchTokensToStack));
  await QCHtransaction.wait();
  console.log('QCH contract tx passed !');

  const LPtransation = await STQCH_LiquidityProvidingContract.value.addLiquidity(toWei(state.stTokensToStack), toWei(state.qchTokensToStack));
  await LPtransation.wait();
  console.log('LP contract tx passed !');

  state.isAddingLiquidity = false;
  state.qchTokensToStack = '';
  state.stTokensToStack = '';
  state.isSuccessfullyAddLiquidity = true;
}
</script>
