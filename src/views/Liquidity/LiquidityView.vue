<template>
  <div>
    <h1 class="mt-10 text-4xl font-medium text-center">Liquidity Providing</h1>
    <p class="text-lg font-light text-center">Add liquidity to receive LP tokens</p>
    <div class="flex flex-col items-center py-5 px-4 mt-5 mx-auto max-w-xs rounded-lg bg-tertiary">
      <q-input v-model="stTokens" class="w-full" background-color="#242526" placeholder="O ST" :outline="true" />
      <p class="mt-2 ml-auto">
        <span class="text-gray-500">Balance: </span>
        <q-format-number class="inline-block text-white" :value="formattedStWalletBalance" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
        <span class="text-white" v-text="` QCH`" />
      </p>

      <span class="flex items-center justify-center h-10 w-10 p-2 pb-3 my-5 leading-none text-3xl font-bold bg-secondary rounded-full mx-auto">+</span>
      <q-input v-model="qchTokens" class="w-full" background-color="#242526" placeholder="O QCH" :outline="true" />
      <p class="mt-2 ml-auto">
        <span class="text-gray-500">Balance: </span>
        <q-format-number class="inline-block text-white" :value="formattedQchWalletBalance" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
        <span class="text-white" v-text="` QCH`" />
      </p>

      <div class="flex flex-col w-full p-4 mt-7 bg-secondary rounded-lg">
        <p class="flex justify-between">
          <span>QCH per ST</span>
          <span>{{ formattedStValueInQch || '...' }}</span>
        </p>
        <p class="flex justify-between mt-2">
          <span>QCH per ST</span>
          <span>{{ formattedQchValueInSt || '...' }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useWalletStore } from '../../stores/wallet.store';
import { fromWei, toWei } from '../../utils/ethers';
// eslint-disable-next-line camelcase
import { SampleTokenContract, QCHTokenContract, STQCH_LiquidityProvidingContract } from '../../utils/contracts';

const { provider, isWrongNetwork, wallet } = storeToRefs(useWalletStore());

const sampleTokenContract = computed(() => SampleTokenContract(provider.value));
const qchTokenContract = computed(() => QCHTokenContract(provider.value));
const stQchLiquidityProvidingContract = computed(() => STQCH_LiquidityProvidingContract(provider.value));

const state = reactive({
  stWalletBalance: 0,
  qchWalletBalance: 0,
  stValueInQch: 0,
  qchValueInSt: 0,
  stTokens: 0,
  qchTokens: 0,
});

const formattedStWalletBalance = computed(() => Number(fromWei(state.stWalletBalance)));
const formattedQchWalletBalance = computed(() => Number(fromWei(state.qchWalletBalance)));
const formattedStValueInQch = computed(() => Number(fromWei(state.stValueInQch)));
const formattedQchValueInSt = computed(() => Number(fromWei(state.qchValueInSt)));

async function fetchData() {
  state.stWalletBalance = await sampleTokenContract.value.balanceOf(wallet.value);
  state.qchWalletBalance = await qchTokenContract.value.balanceOf(wallet.value);
  state.stValueInQch = await stQchLiquidityProvidingContract.value.getAmountOfToken1(toWei('1'));
  state.qchValueInSt = await stQchLiquidityProvidingContract.value.getAmountOfToken2(toWei('1'));
}

onMounted(() => {
  fetchData();
});

watch([provider, isWrongNetwork, wallet], () => {
  fetchData();
});
</script>
