<template>
  <div class="container mx-auto px-4">
    <q-row class="m-0">
      <q-col class="p-3 mb-5" :cols="12"><page-selector /></q-col>
      <q-col class="p-3 mb-5" :cols="12">
        <h2 class="text-3xl">Quichswap Exchange Analytics</h2>
        <h3 class="text-xl font-light text-neutral-400">Trade tokens in an instant</h3>
      </q-col>
      <q-col class="p-3 lg:w-6/12" :cols="12" :lg="6">
        <graph-card v-model:selected-tab="selectedTab" title="Liquidity" :tabs="tabs">
          <graph-liquidity :data="liquidityData" x-axis-formatter="{HH}" />
        </graph-card>
      </q-col>
      <q-col class="p-3" :cols="12" :lg="6">
        <graph-card title="Daily Volume">
          <graph-volume :data="volumeData" />
        </graph-card>
      </q-col>
      <q-col class="p-3 mt-10" :cols="12">
        <div class="mb-10 flex justify-between items-center">
          <h2 class="text-3xl">Top Tokens</h2>
          <q-button size="small" @click="$router.push({ name: 'Pools' })">See All</q-button>
        </div>
        <q-card class="w-full bg-neutral-800 border-neutral-700 border">
          <table-tokens :tokens="tokens" @click:token="$router.push({ name: 'Token', params: { token: $event.name } })" />
        </q-card>
      </q-col>
      <q-col class="p-3 mt-10" :cols="12">
        <div class="mb-10 flex justify-between items-center">
          <h2 class="text-3xl">Top Pools</h2>
          <q-button size="small" @click="$router.push({ name: 'Tokens' })">See All</q-button>
        </div>
        <q-card class="w-full bg-neutral-800 border-neutral-700 border">
          <table-pools :pools="tokenPools" @click:pool="$router.push({ name: 'Pool', params: { pool: $event.names.join('-') } })" />
        </q-card>
      </q-col>
    </q-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useAnalyticsStore } from '../../stores/analytics.store';
import GraphLiquidity from './compoments/graphs/GraphLiquidity.vue';
import GraphVolume from './compoments/graphs/GraphVolume.vue';
import GraphCard from './compoments/graphs/GraphCard.vue';
import TableTokens from './compoments/tables/TableTokens.vue';
import TablePools from './compoments/tables/TablePools.vue';
import PageSelector from './compoments/PageSelector.vue';

export default {
  name: 'AnalyticsView',
  components: { PageSelector, TablePools, TableTokens, GraphCard, GraphLiquidity, GraphVolume },
  data() {
    return {
      tabs: [
        { text: 'Day', value: 'day' },
        { text: 'Week', value: 'week' },
        { text: 'Month', value: 'month' },
      ],
      selectedTab: 'day',
    };
  },
  computed: {
    ...mapState(useAnalyticsStore, ['liquidityData', 'volumeData', 'tokens', 'tokenPools']),
  },
  beforeMount() {
    this.fetchLiquidity();
  },
  methods: {
    ...mapActions(useAnalyticsStore, {
      fetchLiquidity: 'fetchLiquidity',
    }),
  },
};
</script>

<style scoped></style>
