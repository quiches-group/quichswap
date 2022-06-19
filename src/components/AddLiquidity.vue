<template>
  <div class="flex flex-col items-center">
    <q-input v-model="state.amountOfTokenOneToStack" class="w-full" background-color="#242526" :placeholder="`0 ${tokenOneUnit}`" :outline="true" @input="onFirstInputUpdated" />
    <p class="mt-2 ml-auto">
      <span class="text-gray-500">Balance: </span>
      <q-format-number class="inline-block text-white" :value="tokenOneWalletBalance" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
      <!-- eslint-disable-next-line no-irregular-whitespace -->
      <span class="text-white"> {{ tokenOneUnit }}</span>
    </p>

    <q-input v-model="state.amountOfTokenTwoToStack" class="w-full" background-color="#242526" :placeholder="`0 ${tokenTwoUnit}`" :outline="true" @input="onSecondInputUpdated" />
    <p class="mt-2 ml-auto">
      <span class="text-gray-500">Balance: </span>
      <q-format-number class="inline-block text-white" :value="tokenTwoWalletBalance" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
      <!-- eslint-disable-next-line no-irregular-whitespace -->
      <span class="text-white"> {{ tokenTwoUnit }}</span>
    </p>

    <div class="flex flex-col p-4 mt-7 w-full rounded-lg bg-secondary">
      <p class="flex justify-between">
        <span>1 {{ tokenTwoUnit }} per {{ tokenOneUnit }}</span>
        <q-format-number class="inline-block text-white" :value="valueOfOneTokenOneConvertedInTokenTwo" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
      </p>
      <p class="flex justify-between mt-2">
        <span>1 {{ tokenOneUnit }} per {{ tokenTwoUnit }}</span>
        <q-format-number class="inline-block text-white" :value="valueOfOneTokenTwoConvertedInTokenOne" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
      </p>
    </div>

    <q-button class="mt-5" :disabled="state.amountOfTokenOneToStack === '' && state.amountOfTokenTwoToStack === ''" :loading="state.isAddingLiquidity" @click="addLiquidity">Add liquidity</q-button>
  </div>
</template>

<script setup>
/* eslint-disable camelcase */
import { reactive } from 'vue';
import { fromWei, toWei } from '../utils/ethers';

const emit = defineEmits(['transationStarted', 'transationEnded']);

const props = defineProps({
  tokenOneWalletBalance: {
    type: Number,
    required: true,
  },
  tokenOneUnit: {
    type: String,
    required: true,
  },
  tokenTwoWalletBalance: {
    type: Number,
    required: true,
  },
  tokenTwoUnit: {
    type: String,
    required: true,
  },
  valueOfOneTokenOneConvertedInTokenTwo: {
    type: Number,
    required: true,
  },
  valueOfOneTokenTwoConvertedInTokenOne: {
    type: Number,
    required: true,
  },
  tokenOneContract: {
    type: Object,
    required: true,
  },
  tokenTwoContract: {
    type: Object,
    required: true,
  },
  lpContract: {
    type: Object,
    required: true,
  },
});

const state = reactive({
  amountOfTokenOneToStack: '',
  amountOfTokenTwoToStack: '',
  isAddingLiquidity: false,
});

async function onFirstInputUpdated(event) {
  const newValue = event.target.value;

  if (newValue === '0' || newValue === '') {
    state.amountOfTokenTwoToStack = newValue;
    return;
  }

  // TODO: add regex to invalid other inputs than digits

  const newTokenTwoAmountToStackValue = await props.lpContract.getAmountOfToken1(toWei(newValue));
  state.amountOfTokenTwoToStack = fromWei(newTokenTwoAmountToStackValue);
}

async function onSecondInputUpdated(event) {
  const newValue = event.target.value;

  if (newValue === '0' || newValue === '') {
    state.amountOfTokenOneToStack = newValue;
    return;
  }

  // TODO: add regex to invalid other inputs than digits

  const newTokenOneAmountToStackValue = await props.lpContract.getAmountOfToken2(toWei(newValue));
  state.amountOfTokenOneToStack = fromWei(newTokenOneAmountToStackValue);
}

async function addLiquidity() {
  state.isAddingLiquidity = true;
  emit('transationStarted');

  const tokenOneTransation = await props.tokenOneContract.value.approve(props.lpContract.value.address, toWei(state.amountOfTokenOneToStack));
  await tokenOneTransation.wait();

  const tokenTwoTransation = await props.tokenTwoContract.value.approve(props.lpContract.value.address, toWei(state.amountOfTokenTwoToStack));
  await tokenTwoTransation.wait();

  const LPtransation = await props.lpContract.value.addLiquidity(toWei(state.amountOfTokenOneToStack), toWei(state.amountOfTokenTwoToStack));
  await LPtransation.wait();

  state.isAddingLiquidity = false;
  state.amountOfTokenOneToStack = '';
  state.amountOfTokenTwoToStack = '';
  emit('transationEnded');
}
</script>
