<template>
  <q-modal :is-open="isOpen" modal-title="My Wallet" background-color="#2b2d2e" class="z-50" @modal-state-change="emit('closeModal')">
    <q-modal-content class="flex flex-col gap-5" :style="{ width: '600px', maxWidth: '90vw' }">
      <div class="gap-2 flex flex-col">
        <p class="text-gray-500">Your public key</p>
        <q-input v-model="wallet" background-color="#242526" disabled />
      </div>

      <q-separator />

      <h2>Tokens</h2>
      <ul v-for="token in tokens" :key="token.symbol">
        <li class="flex">
          <div class="flex-1">
            <p>{{ token.symbol }}</p>
            <p class="text-gray-500">≃ 12000$</p>
          </div>
          <div class="text-right">
            <div>
              <q-format-number class="inline-block" :value="token.balance" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
              <span class="text-white" v-text="` ${token.symbol}`" />
            </div>
            <p class="text-gray-500">≃ 12000$</p>
          </div>
        </li>
      </ul>
    </q-modal-content>
  </q-modal>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useWalletStore } from '../stores/wallet.store';
import { fromWei } from '../utils/ethers';

const { wallet, qchBalance, stBalance, stqchlpBalance } = storeToRefs(useWalletStore());
const emit = defineEmits(['closeModal']);

const tokens = computed(() => [
  {
    symbol: 'ST',
    balance: Number(fromWei(stBalance.value)),
  },
  {
    symbol: 'QCH',
    balance: Number(fromWei(qchBalance.value)),
  },
  {
    symbol: 'STQCH-LP',
    balance: Number(fromWei(stqchlpBalance.value)),
  },
]);

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});
</script>
