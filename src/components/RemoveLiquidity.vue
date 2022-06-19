<template>
  <div class="flex flex-col items-center">
    <q-input v-model="state.lpTokenToRemove" class="w-full" background-color="#242526" placeholder="O LP" :outline="true" />
    <p class="mt-2 ml-auto">
      <span class="text-gray-500">Balance: </span>
      <q-format-number class="inline-block text-white" :value="formattedStQchLpWalletBalance" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
      <span class="text-white" v-text="` LP`" />
    </p>

    <div class="flex flex-col p-4 mt-7 w-full rounded-lg bg-secondary">
      <p class="flex justify-between">
        <span>1 LP per QCH</span>
        <q-format-number class="inline-block text-white" :value="formattedLpValueInQch" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
      </p>
      <p class="flex justify-between mt-2">
        <span>1 LP per ST</span>
        <q-format-number class="inline-block text-white" :value="formattedLpValueInSt" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
      </p>
    </div>

    <q-button class="mt-5" :disabled="state.lpTokenToRemove === ''" :loading="state.isRemovingLiquidity" @click="removeLiquidity">Remove liquidity</q-button>
  </div>
</template>

<script setup>
/* eslint-disable camelcase */
import { computed, reactive, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useWalletStore } from '../stores/wallet.store';
import { fromWei, toWei } from '../utils/ethers';

const emit = defineEmits(['transationStarted', 'transationEnded']);

const { stqchlpBalance, STQCH_LiquidityProvidingContract } = storeToRefs(useWalletStore());

const state = reactive({
  valueOfOneLpInQch: 0,
  valueOfOneLpInST: 0,
  lpTokenToRemove: '',
  isRemovingLiquidity: false,
});

const formattedStQchLpWalletBalance = computed(() => Number(fromWei(stqchlpBalance.value)));
const formattedLpValueInQch = computed(() => Number(fromWei(state.valueOfOneLpInQch)));
const formattedLpValueInSt = computed(() => Number(fromWei(state.valueOfOneLpInST)));

onMounted(async () => {
  // TODO: update theses lines to be accurate. Currently wrong method !
  state.valueOfOneLpInQch = await STQCH_LiquidityProvidingContract.value.getAmountOfToken1(toWei('1'));
  state.valueOfOneLpInST = await STQCH_LiquidityProvidingContract.value.getAmountOfToken2(toWei('1'));
});

async function removeLiquidity() {
  state.isRemovingLiquidity = true;
  emit('transationStarted');

  const LPtransation = await STQCH_LiquidityProvidingContract.value.removeLiquidity(toWei(state.lpTokenToRemove));
  await LPtransation.wait();

  state.qchTokensToStack = '';
  state.lpTokenToRemove = '';
  emit('transationEnded');
  state.isRemovingLiquidity = false;
}
</script>
