<template>
  <q-modal
    class="text-black z-50 text-white"
    :is-open="state.showModal"
    :modal-title="`${state.modalConfigurator.actionName} ${state.modalConfigurator.tokenName}`"
    background-color="#2b2d2e"
    @modal-state-change="modalAction"
  >
    <q-modal-content>
      <div class="py-4">
        <div class="flex flex-1 items-center p-2 rounded-lg" :style="{ backgroundColor: '#242526' }">
          <q-input v-model="state.modalInputValue" background-color="#242526" class="flex-1" placeholder="Amount" />

          <p class="p-2">{{ state.modalConfigurator.tokenName }}</p>
        </div>
        <div class="flex row justify-between my-2">
          <p class="text-gray-500 text-sm">
            {{ state.modalConfigurator.balanceLabel }}:
            <q-format-number class="text-white inline-block" :value="Number(fromWei(state.modalConfigurator.balance))" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
            <span class="text-white" v-text="` ${state.modalConfigurator.tokenName}`" />
          </p>

          <q-button size="small" :style="{ backgroundcolor: '#000000' }" @click="handleModalMaxButton">Max</q-button>
        </div>
      </div>

      <div class="flex gap-3">
        <q-button class="flex-1 mr-2" @click="modalAction(false)">Cancel</q-button>
        <q-button class="flex-1" @click="handleModalAction">{{ state.modalConfigurator.actionName }}</q-button>
      </div>
    </q-modal-content>
  </q-modal>

  <div class="stacking-pools flex flex-col p-5 items-center">
    <stacking-pool v-for="pool in stackingPools" :key="pool.name" class="max-w-screen-md w-full" :pool-configuration="pool" @setup-modal="setupModal" />
  </div>
</template>

<script setup>
/* eslint-disable camelcase */
import { reactive, watch } from 'vue';
import StackingPool from './StackingPool.vue';
import { SampleTokenContract, ST_StackingContract, STQCH_LPTokenContract, STQCHLP_StackingContract, QCHTokenContract, QCH_StackingContract } from '../../utils/contracts';
import { fromWei } from '../../utils/ethers';

const stackingPools = [
  {
    name: 'QCH',
    stackingContract: QCH_StackingContract,
    stackedTokenContract: QCHTokenContract,
  },
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
  modalConfigurator: {},
  modalInputValue: '',
});

const modalAction = (newValue) => {
  state.showModal = newValue;
};

const setupModal = (configuration) => {
  state.modalConfigurator = configuration;
  modalAction(true);
};

const handleModalMaxButton = () => {
  state.modalInputValue = fromWei(state.modalConfigurator.balance);
};

const handleModalAction = () => {
  state.modalConfigurator.buttonAction(state.modalInputValue);
  modalAction(false);
};

watch(
  () => state.showModal,
  () => {
    state.modalInputValue = '';
  },
);
</script>
