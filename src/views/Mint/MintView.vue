<template>
  <div class="flex justify-center items-center p-5 h-screen">
    <q-card class="flex flex-col gap-5 p-10 bg-[#2b2d2e] outline-1">
      <div class="flex flex-row flex-none items-start">
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
        <q-button color="#f40087" text-color="#fff" :disabled="emptyInput" :loading="state.mintIsLoading" @click="mint">Mint</q-button>
      </connect-button>
    </q-card>
  </div>
  <q-snackbar :v-model="state.showSuccessSnackBar" :dismissable="true" size="medium" position="bottom" color="info" class="border-0 flex flex-row">
    <p class="mr-0.5">
      You have successfully minted <b>{{ state.mintedValue }} ST</b> to your wallet!
    </p>
  </q-snackbar>
  <canvas ref="confettiCanvas" class="fixed top-0 left-0 w-screen h-screen pointer-events-none" />
</template>

<script setup>
import * as confetti from 'canvas-confetti';
import { computed, onMounted, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useWalletStore } from '../../stores/wallet.store';
import ConnectButton from '../../components/ConnectButton.vue';
import { fromWei, toWei } from '../../utils/ethers';

const { fetchBalance } = useWalletStore();
const { wallet, stBalance, SampleTokenContract } = storeToRefs(useWalletStore());

const confettiCanvas = ref(null);

const state = reactive({
  mintIsLoading: false,
  amountInput: '',
  mintedValue: 0,
  error: '',
  showSuccessSnackBar: false,
  confetti: null,
  confettiInterval: null,
});

const walletBalance = computed(() => Number(fromWei(stBalance.value)));

const emptyInput = computed(() => {
  return state.amountInput === '';
});

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const launchConfetti = (duration = 5 * 1000) => {
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 20, spread: 360, ticks: 200, decay: 0.93, zIndex: 0 };
  const colors = ['#78eac4', '#f7c4db', '#ef8bbd', '#cab4ef', '#a183e2', '#ffa585', '#8bb6ef'];

  clearInterval(state.confettiInterval);

  state.confetti({
    particleCount: 500,
    spread: 180,
    startVelocity: 80,
    ticks: 300,
    gravity: 2,
    colors,
    origin: { y: 0.4 },
  });

  state.confettiInterval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(state.confettiInterval);
    }

    const particleCount = 100 * (timeLeft / duration);

    state.confetti({ ...defaults, colors, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    state.confetti({ ...defaults, colors, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });

    return null;
  }, 300);
};

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

    launchConfetti();
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

onMounted(() => {
  state.confetti = confetti.create(confettiCanvas.value, { resize: true, useWorker: true });
});
</script>
