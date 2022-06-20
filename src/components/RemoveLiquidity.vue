<template>
  <div class="flex flex-col items-center">
    <q-input v-model="state.lpTokenToRemove" class="w-full" background-color="#242526" placeholder="O LP" :outline="true" />
    <p class="mt-2 ml-auto">
      <span class="text-gray-500">Balance: </span>
      <q-format-number class="inline-block text-white" :value="lpTokenBalence" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
      <!-- eslint-disable-next-line no-irregular-whitespace -->
      <span class="text-white"> {{ lpTokenUnit }}</span>
    </p>

    <div class="flex flex-col p-4 mt-7 w-full rounded-lg bg-secondary">
      <p class="flex justify-between">
        <span>1 {{ lpTokenUnit }} per {{ tokenOneUnit }}</span>
        <q-format-number class="inline-block text-white" :value="valueOfOneLpTokenConvertedInTokenOne" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
      </p>
      <p class="flex justify-between mt-2">
        <span>1 {{ lpTokenUnit }} per {{ tokenTwoUnit }}</span>
        <q-format-number class="inline-block text-white" :value="valueOfOneLpTokenConvertedInTokenTwo" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
      </p>
    </div>

    <q-button class="mt-5" :disabled="state.lpTokenToRemove === ''" :loading="state.isRemovingLiquidity" @click="removeLiquidity">Remove liquidity</q-button>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { toWei } from '../utils/ethers';

const emit = defineEmits(['transationStarted', 'transationEnded', 'transationFailed']);

const props = defineProps({
  lpTokenUnit: {
    type: String,
    required: true,
  },
  tokenOneUnit: {
    type: String,
    required: true,
  },
  tokenTwoUnit: {
    type: String,
    required: true,
  },
  lpTokenBalence: {
    type: Number,
    required: true,
  },
  lpContract: {
    type: Object,
    required: true,
  },
  valueOfOneLpTokenConvertedInTokenOne: {
    type: Number,
    required: true,
  },
  valueOfOneLpTokenConvertedInTokenTwo: {
    type: Number,
    required: true,
  },
});

const state = reactive({
  lpTokenToRemove: '',
  isRemovingLiquidity: false,
});

async function removeLiquidity() {
  try {
    state.isRemovingLiquidity = true;
    emit('transationStarted');

    const lpTransation = await props.lpContract.removeLiquidity(toWei(state.lpTokenToRemove));
    await lpTransation.wait();

    emit('transationEnded');
    state.isRemovingLiquidity = false;
  } catch (error) {
    state.isRemovingLiquidity = false;
    emit('transationFailed');
  }
}
</script>
