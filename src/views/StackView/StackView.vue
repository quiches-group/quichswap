<template>
  <div>
    <q-modal class="text-black" :is-open="state.showModal" modal-title="Test modal" background-color="white" @modal-state-change="modalAction">
      <q-modal-content>
        <div class="flex items-center">
          <q-input v-model="state.modalStackTokenInput" vlass="flex-1" />

          <p class="p-2">QCH</p>
        </div>

        <div class="flex">
          <q-button class="flex-1 mr-2" @click="modalAction(false)">Cancel</q-button>
          <q-button class="flex-1" @click="stackTokens">Stack</q-button>
        </div>
      </q-modal-content>
    </q-modal>

    <div class="stacking-polls flex flex-col p-5 items-center">
      <stacking-pool v-for="pool in stackingPools" :key="pool.name" class="max-w-screen-md w-full" :pool-configuration="pool" />
    </div>

    <connect-button />
  </div>
</template>

<script setup>
/* eslint-disable camelcase */
import { reactive } from 'vue';
import ConnectButton from '../../components/ConnectButton.vue';
import StackingPool from './StackingPool.vue';
import { SampleTokenContract, ST_StackingContract, STQCH_LPTokenContract, STQCHLP_StackingContract } from '../../utils/contracts';

const stackingPools = [
  {
    name: 'ST',
    stackingContract: ST_StackingContract,
    stackedTokenContract: SampleTokenContract,
  },
  {
    name: 'STQCH-LP',
    stackingContract: STQCHLP_StackingContract,
    stackedTokenContract: STQCH_LPTokenContract,
  },
];

const state = reactive({
  showModal: false,
  totalStackedTokens: 0,
  walletStackedTokens: 0,
  walletRewardAmount: 0,
  modalStackTokenInput: null,
});

const modalAction = (newValue) => {
  state.showModal = newValue;
};
</script>
