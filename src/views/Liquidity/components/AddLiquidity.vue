<template>
  <div class="flex relative flex-col items-center">
    <q-input
      v-model="state.amountOfTokenOneToStack"
      class="w-full appearance-fix"
      background-color="#242526"
      :placeholder="`0 ${tokenOneUnit}`"
      :outline="true"
      input-type="number"
      @change="onFirstInputUpdated"
    />
    <p class="mt-2 ml-auto">
      <span class="text-gray-500">Balance: </span>
      <q-format-number class="inline-block text-white" :value="tokenOneWalletBalance" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
      <!-- eslint-disable-next-line no-irregular-whitespace -->
      <span class="text-white"> {{ tokenOneUnit }}</span>
    </p>

    <q-input
      v-model="state.amountOfTokenTwoToStack"
      class="w-full appearance-fix"
      background-color="#242526"
      :placeholder="`0 ${tokenTwoUnit}`"
      :outline="true"
      input-type="number"
      @change="onSecondInputUpdated"
    />
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

    <q-button
      class="mt-5"
      color="#f40087"
      text-color="#fff"
      :disabled="(state.amountOfTokenOneToStack === '' && state.amountOfTokenTwoToStack === '') || hasUserLessFundsThanRequired"
      :loading="state.isAddingLiquidity"
      @click="addLiquidity"
      >Add liquidity</q-button
    >

    <q-snackbar v-model="hasUserLessFundsThanRequired" color="alert" timeout="1000" size="full" absolute>
      <p class="mr-0.5">You don't have enough funds.</p>
    </q-snackbar>
  </div>
</template>

<script setup>
/* eslint-disable camelcase */
import { reactive, computed } from 'vue';
import { fromWei, toWei } from '../../../utils/ethers';

const emit = defineEmits(['transationStarted', 'transationEnded', 'transationFailed']);

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
  tokenOneBalance: {
    type: [Object, Number, String],
    required: true,
  },
  tokenTwoBalance: {
    type: [Object, Number, String],
    required: true,
  },
});

const state = reactive({
  amountOfTokenOneToStack: '',
  amountOfTokenTwoToStack: '',
  isAddingLiquidity: false,
});

function formatValues(value) {
  return Number.parseFloat(value).toFixed(3).toString();
}

async function onFirstInputUpdated(event) {
  const newValue = event.target.value;

  const newFormattedValue = formatValues(newValue.replaceAll(',', '.').replaceAll(/[^\d|.]*/gm, ''));

  if (newValue === '0' || newValue === '' || !newFormattedValue) {
    state.amountOfTokenTwoToStack = newFormattedValue;
    return;
  }

  const newTokenTwoAmountToStackValue = await props.lpContract.getAmountOfToken1(toWei(newFormattedValue));
  state.amountOfTokenTwoToStack = formatValues(fromWei(newTokenTwoAmountToStackValue));
}

async function onSecondInputUpdated(event) {
  const newValue = event.target.value;

  const newFormattedValue = formatValues(newValue.replaceAll(',', '.').replaceAll(/[^\d|.]*/gm, ''));

  if (newValue === '0' || newValue === '' || !newFormattedValue) {
    state.amountOfTokenOneToStack = newFormattedValue;
    return;
  }

  const newTokenOneAmountToStackValue = await props.lpContract.getAmountOfToken2(toWei(newFormattedValue));
  state.amountOfTokenOneToStack = formatValues(fromWei(newTokenOneAmountToStackValue));
}

async function addLiquidity() {
  try {
    state.isAddingLiquidity = true;
    emit('transationStarted');

    const tokenOneTransation = await props.tokenOneContract.approve(props.lpContract.address, toWei(state.amountOfTokenOneToStack));
    await tokenOneTransation.wait();

    const tokenTwoTransation = await props.tokenTwoContract.approve(props.lpContract.address, toWei(state.amountOfTokenTwoToStack));
    await tokenTwoTransation.wait();

    const LPtransation = await props.lpContract.addLiquidity(toWei(state.amountOfTokenOneToStack), toWei(state.amountOfTokenTwoToStack));
    await LPtransation.wait();

    state.isAddingLiquidity = false;
    state.amountOfTokenOneToStack = '';
    state.amountOfTokenTwoToStack = '';
    emit('transationEnded');
  } catch {
    state.isAddingLiquidity = false;
    emit('transationFailed');
  }
}

const hasUserLessFundsThanRequired = computed(() => {
  if ((!state.amountOfTokenOneToStack || state.amountOfTokenOneToStack === 'NaN') && (!state.amountOfTokenTwoToStack || state.amountOfTokenTwoToStack === 'NaN')) {
    return false;
  }

  return formatValues(state.amountOfTokenOneToStack) >= fromWei(props.tokenOneBalance) && formatValues(state.amountOfTokenTwoToStack) >= fromWei(props.tokenTwoBalance);
});
</script>

<style>
.appearance-fix input::-webkit-inner-spin-button,
.appearance-fix input::-webkit-outer-spin-button {
  @apply appearance-none;
}
</style>
