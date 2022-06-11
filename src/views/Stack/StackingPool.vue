<template>
  <q-expansion-panel show-separator class="text-white" :style="{ backgroundColor: '#242526' }" header-background-color="#2b2d2e" content-background-color="#242526" accent-color="white">
    <template #header>
      <div class="flex items-start gap-5 p-3">
        <p class="w-40 font-bold">Stack {{ poolConfiguration.name }}</p>

        <div>
          <p class="text-gray-500">Total Stacked Tokens</p>
          <q-format-number :value="state.totalStackedTokens" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
          <q-format-number class="text-gray-500" :value="138000000" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
        </div>

        <connect-button class="justify-self-end">
          <q-button :loading="state.stackIsLoading" class="ml-auto" @click="handleStackTokens">Stack tokens</q-button>
        </connect-button>
      </div>
    </template>

    <template #content>
      <div class="flex gap-5 items-center justify-start p-3">
        <div v-if="state.walletStackedTokens != 0" class="w-40">
          <p class="text-gray-500">My Stacked Tokens</p>
          <q-format-number :value="state.walletStackedTokens" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
          <p class="text-gray-500">≃ 12000$</p>
        </div>

        <div v-if="state.walletStackedTokens != 0" class="mr-auto">
          <p class="text-gray-500">My Earned QCH</p>
          <q-format-number :value="state.walletRewardAmount" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
          <p class="text-gray-500">≃ 12000$</p>
        </div>

        <p v-if="state.walletStackedTokens == 0" class="flex-1 text-center text-gray-500">Stake now to earn QCH.</p>

        <q-button :loading="state.claimIsLoading" @click="handleClaimRewards">Claim</q-button>
      </div>
    </template>
  </q-expansion-panel>
</template>

<script setup>
import { reactive, onMounted, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import ConnectButton from '../../components/ConnectButton.vue';
import { fromWei, toWei } from '../../utils/ethers';
import { useWalletStore } from '../../stores/wallet.store';

const { wallet, walletIsConnected, provider } = storeToRefs(useWalletStore());

const state = reactive({
  totalStackedTokens: 0,
  walletStackedTokens: 0,
  walletRewardAmount: 0,
  claimIsLoading: false,
  stackIsLoading: false,
});

const props = defineProps({
  poolConfiguration: {
    type: Object,
    required: true,
  },
});

const stackingContract = computed(() => props.poolConfiguration.stackingContract(provider.value));
const stackedTokenContract = computed(() => props.poolConfiguration.stackedTokenContract(provider.value));

const emit = defineEmits(['stackTokens']);

const fetchData = async () => {
  state.totalStackedTokens = Number(fromWei(await stackedTokenContract.value.balanceOf(stackingContract.value.address)));

  if (!walletIsConnected.value) {
    state.walletStackedTokens = 0;
    state.walletRewardAmount = 0;

    return;
  }

  state.walletStackedTokens = Number(fromWei(await stackingContract.value.getTotalStackedByOwner(wallet.value)));
  state.walletRewardAmount = Number(fromWei(await stackingContract.value.getTotalRewardAmount(wallet.value)));
};

const handleStackTokens = async () => {
  state.stackIsLoading = true;
  emit('stackTokens', 'props.name');

  let tx = await stackedTokenContract.value.approve(stackingContract.value.address, toWei('70'));
  await tx.wait();

  tx = await stackingContract.value.stack(toWei('70'));
  await tx.wait();

  await fetchData();
  state.stackIsLoading = false;
};

const handleClaimRewards = async () => {
  state.claimIsLoading = true;
  const tx = await stackingContract.value.claim();
  await tx.wait();

  await fetchData();
  state.claimIsLoading = false;
};

onMounted(() => {
  fetchData();
});

watch(provider, () => {
  fetchData();
});
</script>
