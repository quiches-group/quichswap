<template>
  <div class="px-4">
    <h1 class="mt-10 text-4xl font-medium text-center">Liquidity Providing</h1>
    <p v-if="state.selectedTab == 'add-liquidity'" class="text-lg font-light text-center text-gray-200">Add liquidity to receive LP tokens</p>
    <p v-if="state.selectedTab == 'remove-liquidity'" class="text-lg font-light text-center text-gray-200">Burn LP tokens to cash out your stacked tokens</p>
    <div class="flex flex-col px-4 pt-2 pb-5 mx-auto mt-5 max-w-xs rounded-lg bg-tertiary">
      <q-tabs :selected-index="state.selectedTab" @select-index="state.selectedTab = $event">
        <q-tab tab-index="add-liquidity" class="text-white bg-white bg-opacity-5">+ Add Liquidity</q-tab>
        <q-tab tab-index="remove-liquidity" class="text-white bg-white bg-opacity-5">- Remove Liquidity</q-tab>
      </q-tabs>
      <add-liquidity
        v-if="state.selectedTab == 'add-liquidity'"
        class="mt-5"
        :token-one-wallet-balance="qchWalletBalance"
        token-one-unit="QCH"
        :token-two-wallet-balance="stWalletBalance"
        token-two-unit="ST"
        :value-of-one-token-one-converted-in-token-two="valueOfOneStConvertedInQch"
        :value-of-one-token-two-converted-in-token-one="valueOfOneQchConvertedInSt"
        :token-one-contract="qchContract"
        :token-two-contract="stContract"
        :lp-contract="lpContract"
        @transation-started="(state.isActiveTx = true), (state.isTxCanceled = false)"
        @transation-ended="transationEnded"
        @transation-failed="transationFailed"
      />
      <remove-liquidity
        v-if="state.selectedTab == 'remove-liquidity'"
        class="mt-5"
        lp-token-unit="LP"
        token-one-unit="QCH"
        token-two-unit="ST"
        :lp-token-balence="lpTokenBalence"
        :lp-contract="lpContract"
        :value-of-one-lp-token-converted-in-token-one="state.valueOfOneLpTokenConvertedInQch"
        :value-of-one-lp-token-converted-in-token-two="state.valueOfOneLpTokenConvertedInSt"
        @transation-started="(state.isActiveTx = true), (state.isTxCanceled = false)"
        @transation-ended="transationEnded"
        @transation-failed="transationFailed"
      />
    </div>
    <q-snackbar v-model="state.isActiveTx" color="alert">
      <p class="mr-0.5">Waiting transations ends. Please follow your wallet instructions.</p>
    </q-snackbar>

    <q-snackbar v-model="state.isTxEnded" dissmissable>
      <p class="mr-0.5">Transations ends successfully. Your liquidity has updated</p>
    </q-snackbar>
    <q-snackbar v-model="state.isTxCanceled" color="error" dissmissable>
      <p class="mr-0.5">Transations ends with error. It may canceled</p>
    </q-snackbar>
  </div>
</template>

<script setup>
/* eslint-disable camelcase */
import { storeToRefs } from 'pinia';
import { computed, onMounted, reactive } from 'vue';
import AddLiquidity from './components/AddLiquidity.vue';
import RemoveLiquidity from './components/RemoveLiquidity.vue';
import { useWalletStore } from '../../stores/wallet.store';
import { fromWei, toWei } from '../../utils/ethers';

const { qchBalance, stBalance, stqchlpBalance, SampleTokenContract, QCHTokenContract, STQCH_LiquidityProvidingContract } = storeToRefs(useWalletStore());
const { fetchBalance } = useWalletStore();

const state = reactive({
  selectedTab: 'add-liquidity',
  isActiveTx: false,
  isTxEnded: false,
  isTxCanceled: false,
  valueOfOneStConvertedInQch: 0,
  valueOfOneQchConvertedInSt: 0,
  valueOfOneLpTokenConvertedInQch: 0,
  valueOfOneLpTokenConvertedInSt: 0,
});

const qchContract = computed(() => QCHTokenContract.value);
const stContract = computed(() => SampleTokenContract.value);
const lpContract = computed(() => STQCH_LiquidityProvidingContract.value);
const lpTokenBalence = computed(() => Number(fromWei(stqchlpBalance.value)));
const qchWalletBalance = computed(() => Number(fromWei(qchBalance.value)));
const stWalletBalance = computed(() => Number(fromWei(stBalance.value)));
const valueOfOneStConvertedInQch = computed(() => Number(fromWei(state.valueOfOneStConvertedInQch)));
const valueOfOneQchConvertedInSt = computed(() => Number(fromWei(state.valueOfOneQchConvertedInSt)));

async function updateBalences() {
  state.valueOfOneStConvertedInQch = await STQCH_LiquidityProvidingContract.value.getAmountOfToken1(toWei('1'));
  state.valueOfOneQchConvertedInSt = await STQCH_LiquidityProvidingContract.value.getAmountOfToken2(toWei('1'));

  const valueOfOneLpTokenConvertedInQch = (await lpContract.value.getLpTokenComposition(toWei('1')))[0];
  const valueOfOneLpTokenConvertedInSt = (await lpContract.value.getLpTokenComposition(toWei('1')))[1];

  state.valueOfOneLpTokenConvertedInQch = Number(fromWei(valueOfOneLpTokenConvertedInQch));
  state.valueOfOneLpTokenConvertedInSt = Number(fromWei(valueOfOneLpTokenConvertedInSt));
}

async function transationEnded() {
  state.isActiveTx = false;
  state.isTxEnded = true;
  state.isTxCanceled = false;
  await fetchBalance();
  await updateBalences();
}

async function transationFailed() {
  state.isActiveTx = false;
  state.isTxEnded = false;
  state.isTxCanceled = true;
  await fetchBalance();
  await updateBalences();
}

onMounted(updateBalences);
</script>
