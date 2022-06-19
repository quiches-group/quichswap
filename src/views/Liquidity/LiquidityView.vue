<template>
  <div>
    <h1 class="mt-10 text-4xl font-medium text-center">Liquidity Providing</h1>
    <p class="text-lg font-light text-center">Add liquidity to receive LP tokens</p>
    <div class="flex flex-col px-4 pt-2 pb-5 mx-auto mt-5 max-w-xs rounded-lg bg-tertiary">
      <q-tabs :selected-index="state.selectedTab" @select-index="state.selectedTab = $event">
        <q-tab tab-index="add-liquidity" class="text-white bg-white bg-opacity-5">+ Add Liquidity</q-tab>
        <q-tab tab-index="remove-liquidity" class="text-white bg-white bg-opacity-5">- Remove Liquidity</q-tab>
      </q-tabs>
      <add-liquidity v-if="state.selectedTab == 'add-liquidity'" class="mt-5" @transation-started="state.isActiveTx = true" @transation-ended="(state.isActiveTx = true), (state.isTxEnded = true)" />
      <remove-liquidity
        v-if="state.selectedTab == 'remove-liquidity'"
        class="mt-5"
        @transation-started="state.isActiveTx = true"
        @transation-ended="(state.isActiveTx = true), (state.isTxEnded = true)"
      />
    </div>
    <q-snackbar :is-open="state.isActiveTx" size="medium" position="bottom" color="#FFB883" class="flex flex-row border-2" style="border-color: #ffb883">
      <p class="mr-0.5">Waiting transations ends. Please follow your wallet instructions.</p>
    </q-snackbar>

    <q-snackbar :is-open="state.isTxEnded" size="medium" position="bottom" color="#42B883" class="flex flex-row border-2 border-primary">
      <p class="mr-0.5">Transations ends successfully. Your liquidity has updated</p>
    </q-snackbar>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import AddLiquidity from '../../components/AddLiquidity.vue';
import RemoveLiquidity from '../../components/RemoveLiquidity.vue';

const state = reactive({
  selectedTab: 'add-liquidity',
  isActiveTx: false,
  isTxEnded: false,
});
</script>
