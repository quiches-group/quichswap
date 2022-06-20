<template>
  <div class="flex flex-col items-center p-5">
    <q-card class="flex flex-col gap-5 p-10 bg-[#2b2d2e] outline-1">
      <div class="flex flex-row">
        <div class="flex-none">Your balance:</div>
        <span class="flex-1" />
        <div class="flex-none">
          <q-format-number class="inline-block" :value="walletBalance" :max-fraction-digits="1" :min-fraction-digits="1" locale="en-US" />
          <span class="text-white" v-text="' ST'" />
        </div>
      </div>
      <div class="flex flex-row">
        <q-input v-model="state.amountInput" :disabled="state.mintIsLoading" :error="state.error" outline background-color="#242526" placeholder="Your amount" class="w-full"></q-input>
      </div>
      <connect-button>
        <q-button :disabled="emptyInput" :loading="state.mintIsLoading" @click="mint">Mint</q-button>
      </connect-button>
    </q-card>
  </div>
  <q-snackbar v-model="state.showSuccessSnackBar">
    <p class="mr-0.5">
      You have successfully minted <b>{{ state.mintedValue }} ST</b> to your wallet!
    </p>
  </q-snackbar>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useWalletStore } from '../../stores/wallet.store';
import ConnectButton from '../../components/ConnectButton.vue';
import { fromWei, toWei } from '../../utils/ethers';

const { fetchBalance } = useWalletStore();
const { wallet, stBalance, SampleTokenContract } = storeToRefs(useWalletStore());

const state = reactive({
  mintIsLoading: false,
  amountInput: '',
  mintedValue: 0,
  error: '',
  showSuccessSnackBar: false,
});

const walletBalance = computed(() => Number(fromWei(stBalance.value)));

const emptyInput = computed(() => {
  return state.amountInput === '';
});

const mint = async () => {
  state.error = '';
  state.mintIsLoading = true;
  state.mintedValue = state.amountInput;

  try {
    if (state.amountInput === '0') {
      throw new RangeError();
    }
    const tx = await SampleTokenContract.value.mint(wallet.value, toWei(state.amountInput));
    await tx.wait();
    state.amountInput = '';
    state.showSuccessSnackBar = true;
  } catch (err) {
    if (err.code === 'INVALID_ARGUMENT' || err.name === 'RangeError') {
      state.error = 'Please enter a valid amount';
    } else {
      state.error = 'An error occurred, please try again';
    }
  }
  await fetchBalance();
  state.mintIsLoading = false;
};
</script>
