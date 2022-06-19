<template>
  <div class="container mx-auto px-4">
    <q-row class="m-0">
      <q-col class="p-3 mb-3" :cols="12"><page-selector active-tab="pools" /></q-col>
      <q-col class="p-3" :cols="12">
        <div class="mb-8 flex items-center">
          <icons-pool class="w-16 h-16" :tokens="pool.names" />
          <h2 class="ml-2 text-3xl">{{ pool.names.join('-') }} Pool</h2>
        </div>
        <div class="my-3 flex align-middle">
          <icons-token :token="pool.names[0]" class="w-9 h-9" />
          <span class="ml-2 text-lg pt-1">1 {{ pool.names[0] }} = {{ firstToken.price }}</span>
          <q-separator vertical class="mx-3 h-10" color="rgba(229, 231, 235, 0.3)" />
          <icons-token :token="pool.names[1]" class="w-9 h-9" />
          <span class="ml-2 text-lg pt-1">1 {{ pool.names[1] }} = {{ secondToken.price }}</span>
        </div>
      </q-col>
      <q-col class="p-3 lg:w-4/12" :cols="12" :lg="4">
        <q-card class="p-6 w-full bg-neutral-800 border-neutral-700 border">
          <span class="text-sm">Price</span>
          <div class="mb-4 text-xl">{{ pool.price }}</div>
          <span class="text-sm">Liquidity</span>
          <div class="mb-4 text-xl">{{ pool.liquidity }}</div>
          <span class="text-sm">Fees (24h)</span>
          <div class="text-xl">{{ pool.fees }}</div>
        </q-card>
      </q-col>
      <q-col class="p-3 lg:w-8/12" :cols="12" :lg="8">
        <q-card class="w-full bg-neutral-800 border-neutral-700 border">
          <graph-card v-model:selected-tab="selectedTab" title="Liquidity" :tabs="tabs">
            <template #title>
              <div class="flex">
                <h2 class="graph-selection" :class="{ active: selectedGraph === 'liquidity' }" @click="selectedGraph = 'liquidity'">Liquidity</h2>
                <h2 class="graph-selection" :class="{ active: selectedGraph === 'volume' }" @click="selectedGraph = 'volume'">Volume</h2>
              </div>
            </template>
            <graph-volume v-if="selectedGraph === 'volume'" :data="test" x-axis-formatter="{dd}" />
            <graph-liquidity v-else :data="test" x-axis-formatter="{dd}" />
          </graph-card>
        </q-card>
      </q-col>
      <q-col class="p-3 mt-10" :cols="12">
        <div class="mb-10 flex justify-between items-center">
          <h2 class="text-3xl">Tokens</h2>
        </div>
        <q-card class="w-full bg-neutral-800 border-neutral-700 border">
          <table-tokens :tokens="tokens" @click:token="$router.push({ name: 'Token', params: { token: $event.name } })" />
        </q-card>
      </q-col>
    </q-row>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useAnalyticsStore } from '../../stores/analytics.store';
import TableTokens from './compoments/tables/TableTokens.vue';
import PageSelector from './compoments/PageSelector.vue';
import IconsToken from './compoments/icons/IconsToken.vue';
import TablePools from './compoments/tables/TablePools.vue';
import GraphCard from './compoments/graphs/GraphCard.vue';
import GraphVolume from './compoments/graphs/GraphVolume.vue';
import GraphLiquidity from './compoments/graphs/GraphLiquidity.vue';
import IconsPool from './compoments/icons/IconsPool.vue';

export default {
  name: 'TokenView',
  components: { IconsPool, GraphVolume, GraphLiquidity, GraphCard, TablePools, IconsToken, TableTokens, PageSelector },
  data() {
    return {
      selectedGraph: 'liquidity',
      tabs: [
        { text: 'Day', value: 'day' },
        { text: 'Week', value: 'week' },
        { text: 'Month', value: 'month' },
      ],
      selectedTab: 'day',
      test: [
        ['2022-06-10', 200000000],
        ['2022-06-11', 560000000],
        ['2022-06-12', 340000000],
        ['2022-06-13', 580000000],
        ['2022-06-14', 250000000],
        ['2022-06-15', 300000000],
        ['2022-06-16', 450000000],
        ['2022-06-17', 300000000],
        ['2022-06-18', 100000000],
      ],
    };
  },
  computed: {
    ...mapState(useAnalyticsStore, {
      getToken: (state) => state.getToken,
      getTokenPool: (state) => state.tokenPool,
      filterTokens: (state) => state.filterTokens,
    }),
    pool() {
      return this.getTokenPool(this.$route.params.pool.split('-'));
    },
    tokens() {
      return this.filterTokens(this.$route.params.pool.split('-'));
    },
    firstToken() {
      return this.tokens[0];
    },
    secondToken() {
      return this.tokens[1];
    },
  },
};
</script>

<style scoped>
.graph-selection {
  @apply p-5 text-xl font-light cursor-pointer text-neutral-400 hover:text-neutral-200;
}

.graph-selection.active {
  @apply text-white;
}
</style>
