<template>
  <div class="p-5 flex flex-col items-center">
    <q-card class="flex flex-col gap-3 p-10 bg-[#2b2d2e]">
      <div class="text-gray-500 text-base">Swap from:</div>
      <div class="flex flex-1 items-center p-2 rounded-lg" :style="{ backgroundColor: '#242526' }">
        <q-input v-model="state.amountInput" :disabled="state.swapIsLoading" :error="state.error" background-color="#242526" placeholder="Your amount" class="w-full outline-amber-300"></q-input>
        <div class="bg-clip-padding rounded-lg"><q-dropdown accent-color="darkGray"></q-dropdown></div>
      </div>
      <div class="flex flex-row text-xs">
        <span class="flex-1" />
        <div class="mr-2 text-gray-500">Balance:</div>
        <div class="flex-none">
          <q-format-number class="inline-block" :value="walletBalance" :max-fraction-digits="1" :min-fraction-digits="1" locale="en-US" />
          <span class="text-white" v-text="' ST'" />
        </div>
      </div>
      <div class="flex flex-col items-center mt-3">
        <swap-button />
      </div>
      <div class="text-gray-500">Swap to:</div>
      <div class="flex flex-1 items-center p-2 rounded-lg" :style="{ backgroundColor: '#242526' }">
        <q-input v-model="state.amountInput" :disabled="state.swapIsLoading" :error="state.error" background-color="#242526" placeholder="Your amount" class="w-full outline-amber-300"></q-input>
        <q-dropdown class="m-2"></q-dropdown>
      </div>
      <div class="flex flex-row text-xs mb-5">
        <span class="flex-1" />
        <div class="mr-2 text-gray-500">Balance:</div>
        <div class="flex-none">
          <q-format-number class="inline-block" :value="walletBalance" :max-fraction-digits="1" :min-fraction-digits="1" locale="en-US" />
          <span class="text-white" v-text="' ST'" />
        </div>
      </div>

      <connect-button>
        <q-button :disabled="emptyInput" :loading="state.swapIsLoading" @click="swap">Swap</q-button>
      </connect-button>
    </q-card>
  </div>

  <q-snackbar :is-open="state.showSuccessSnackBar" size="medium" position="bottom" color="#40b883" class="border-0 flex flex-row">
    <p class="mr-0.5"></p>
  </q-snackbar>
</template>

<script setup>
import { computed, reactive } from 'vue';
import ConnectButton from '../../components/ConnectButton.vue';
import SwapButton from './SwapButton.vue';

const state = reactive({
  swapIsLoading: false,
  amountInput: '',
  mintedValue: 0,
  error: '',
  showSuccessSnackBar: false,
});

const emptyInput = computed(() => {
  return state.amountInput === '';
});

const swap = async () => {
  // TODO: Swap mmethods
};
</script>
