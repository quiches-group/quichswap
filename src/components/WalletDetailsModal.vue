<template>
  <q-modal :is-open="isOpen" modal-title="My Wallet" background-color="#2b2d2e" class="z-50" @modal-state-change="emit('modalStateChange', $event)">
    <q-modal-content class="flex flex-col gap-5" :style="{ width: '600px', maxWidth: '90vw' }">
      <div class="gap-2 flex flex-col">
        <p class="text-gray-500">Your public key</p>
        <q-input v-model="wallet" background-color="#242526" disabled placeholder="" />
      </div>

      <q-separator />

      <h2>Tokens</h2>
      <ul v-for="token in tokens" :key="token.symbol">
        <li class="flex">
          <div class="flex-1">
            <p>{{ token.symbol }}</p>
            <p v-if="!token.hidePrice" class="text-gray-500">
              ≃ <q-format-number class="inline-block" :value="tokenPrice(token.symbol)" currency="usd" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
            </p>
          </div>
          <div class="text-right">
            <div>
              <q-format-number class="inline-block" :value="token.balance" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
              <span class="text-white" v-text="` ${token.symbol}`" />
            </div>
            <p v-if="!token.hidePrice" class="text-gray-500">
              ≃ <q-format-number class="inline-block" :value="tokenPrice(token.symbol) * token.balance" currency="usd" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
            </p>
          </div>
        </li>
      </ul>
    </q-modal-content>
  </q-modal>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useWalletStore } from '../stores/wallet.store';
import { fromWei } from '../utils/ethers';
import { usePriceStore } from '../stores/prices.store';

const { wallet, qchBalance, stBalance, stqchlpBalance } = storeToRefs(useWalletStore());
const { token: tokenPrice } = storeToRefs(usePriceStore());
const emit = defineEmits(['modalStateChange']);

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
    hidePrice: true,
  },
]);

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});
</script>
