<template>
  <q-expansion-panel class="stacking-pools__item" show-separator header-background-color="#2b2d2e" content-background-color="#242526" accent-color="white">
    <template #header>
      <div class="flex items-start gap-5 p-3 items-center">
        <p class="w-40 font-bold self-start">Stack {{ poolConfiguration.name }}</p>

        <div class="flex-1">
          <p class="text-gray-500">Total Stacked Tokens</p>
          <div>
            <q-format-number class="inline-block" :value="totalStackedTokens" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
            <span class="text-white" v-text="` ${poolConfiguration.name}`" />
          </div>
          <q-format-number class="text-gray-500" :value="138000000" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
        </div>

        <connect-button>
          <q-button :loading="state.stackIsLoading" @click="handleOpenStackTokens">Stack tokens</q-button>
        </connect-button>
      </div>
    </template>

    <template #content>
      <div v-if="state.walletStackedTokens != 0" class="flex gap-5 items-center justify-start p-3">
        <div class="w-40">
          <p class="text-gray-500">My Stacked Tokens</p>
          <div>
            <q-format-number class="inline-block" :value="walletStackedTokens" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
            <span class="text-white" v-text="` ${poolConfiguration.name}`" />
          </div>
          <p class="text-gray-500">≃ 12000$</p>
        </div>

        <div class="mr-auto">
          <p class="text-gray-500">My Earned</p>
          <div>
            <q-format-number class="inline-block" :value="walletRewardAmount" :max-fraction-digits="3" :min-fraction-digits="3" locale="en-US" />
            <span class="text-white" v-text="` QCH`" />
          </div>
          <p class="text-gray-500">≃ 12000$</p>
        </div>

        <q-button :loading="state.claimIsLoading" @click="claimRewards">Claim</q-button>
        <q-button :loading="state.withdrawIsLoading" @click="handleOpenWithdrawTokens">Withdraw</q-button>
      </div>

      <div v-else class="flex gap-5 items-center justify-start p-3">
        <p class="flex-1 text-center text-gray-500">Stake now to earn QCH.</p>
      </div>
    </template>
  </q-expansion-panel>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { reactive, onMounted, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import ConnectButton from '../../components/ConnectButton.vue';
import { fromWei, toWei } from '../../utils/ethers';
import { useWalletStore } from '../../stores/wallet.store';

const { wallet, walletIsConnected, provider, isWrongNetwork } = storeToRefs(useWalletStore());

const emit = defineEmits(['setupModal']);

const state = reactive({
  totalStackedTokens: 0,
  walletStackedTokens: 0,
  walletRewardAmount: 0,
  walletBalance: 0,
  claimIsLoading: false,
  stackIsLoading: false,
  withdrawIsLoading: false,
  modalIsOpen: false,
  modalType: null,
});

const totalStackedTokens = computed(() => Number(fromWei(state.totalStackedTokens)));
const walletStackedTokens = computed(() => Number(fromWei(state.walletStackedTokens)));
const walletRewardAmount = computed(() => Number(fromWei(state.walletRewardAmount)));
const walletBalance = computed(() => Number(fromWei(state.walletBalance)));

const props = defineProps({
  poolConfiguration: {
    type: Object,
    required: true,
  },
});

const stackingContract = computed(() => props.poolConfiguration.stackingContract(provider.value));
const stackedTokenContract = computed(() => props.poolConfiguration.stackedTokenContract(provider.value));

const fetchData = async () => {
  if (isWrongNetwork.value) {
    state.totalStackedTokens = 0;
    state.walletStackedTokens = 0;
    state.walletRewardAmount = 0;
    state.walletBalance = 0;

    return;
  }

  state.totalStackedTokens = await stackedTokenContract.value.balanceOf(stackingContract.value.address);

  if (!walletIsConnected.value) {
    state.walletStackedTokens = 0;
    state.walletRewardAmount = 0;
    state.walletBalance = 0;

    return;
  }

  state.walletStackedTokens = await stackingContract.value.getTotalStackedByOwner(wallet.value);
  state.walletRewardAmount = await stackingContract.value.getTotalRewardAmount(wallet.value);
  state.walletBalance = await stackedTokenContract.value.balanceOf(wallet.value);
};

const stackTokens = async (amount) => {
  state.stackIsLoading = true;

  let tx = await stackedTokenContract.value.approve(stackingContract.value.address, toWei(amount));
  await tx.wait();

  tx = await stackingContract.value.stack(toWei(amount));
  await tx.wait();

  await fetchData();
  state.stackIsLoading = false;
};

const withdrawAction = async (amount) => {
  state.withdrawIsLoading = true;
  const tx = await stackingContract.value.unstack(toWei(amount));
  await tx.wait();

  await fetchData();
  state.withdrawIsLoading = false;
};

const claimRewards = async () => {
  state.claimIsLoading = true;
  const tx = await stackingContract.value.claim();
  await tx.wait();

  await fetchData();
  state.claimIsLoading = false;
};

const handleOpenStackTokens = (e) => {
  e.stopPropagation();

  const modalConfiguration = {
    tokenName: props.poolConfiguration.name,
    actionName: 'Stack',
    buttonAction: stackTokens,
    balance: state.walletBalance,
    balanceLabel: 'Balance',
  };

  emit('setupModal', modalConfiguration);
};

const handleOpenWithdrawTokens = () => {
  const modalConfiguration = {
    tokenName: props.poolConfiguration.name,
    actionName: 'Withdraw',
    buttonAction: withdrawAction,
    balance: state.walletStackedTokens,
    balanceLabel: 'Total stacked',
  };

  emit('setupModal', modalConfiguration);
};

onMounted(() => {
  fetchData();
});

watch([provider, isWrongNetwork], () => {
  fetchData();
});
</script>
