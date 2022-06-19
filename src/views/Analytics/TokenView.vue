<template>
  <div class="container mx-auto px-4">
    <q-row class="m-0">
      <q-col class="p-3 mb-5" :cols="12"><page-selector active-tab="tokens" /></q-col>
      <q-col class="p-3" :cols="12">
        <div class="mb-4 flex items-center">
          <icons-token class="w-10 h-10" :token="token.name" />
          <h2 class="ml-2 text-3xl">{{ token.name }}</h2>
        </div>
      </q-col>
      <q-col class="p-3 lg:w-4/12" :cols="12" :lg="4">
        <q-card class="p-6 w-full bg-neutral-800 border-neutral-700 border">
          <span class="text-sm">Price</span>
          <div class="mb-4 text-xl">
            <span>{{ token.price }}</span>
            <span class="ml-4 px-1.5 py-0.5 text-sm rounded-lg" :class="[token.priceChange > 0 ? 'bg-green-500/30 text-green-400' : 'bg-red-500/30 text-red-400']"> {{ token.priceChange }}%</span>
          </div>
          <span class="text-sm">Liquidity</span>
          <div class="mb-4 text-xl">{{ token.liquidity }}</div>
          <span class="text-sm">Volume (24h)</span>
          <div class="text-xl">{{ token.volume }}</div>
        </q-card>
      </q-col>
      <q-col class="p-3 lg:w-8/12" :cols="12" :lg="8">
        <q-card class="w-full bg-neutral-800 border-neutral-700 border">
          <graph-card v-model:selected-tab="selectedTab" title="Liquidity" :tabs="tabs">
            <template #title>
              <div class="flex">
                <h2 class="graph-selection" :class="{ active: selectedGraph === 'liquidity' }" @click="selectedGraph = 'liquidity'">Liquidity</h2>
                <h2 class="graph-selection" :class="{ active: selectedGraph === 'volume' }" @click="selectedGraph = 'volume'">Volume</h2>
                <h2 class="graph-selection" :class="{ active: selectedGraph === 'price' }" @click="selectedGraph = 'price'">Price</h2>
              </div>
            </template>
            <graph-volume v-if="selectedGraph === 'volume'" :data="test" x-axis-formatter="{dd}" />
            <graph-liquidity v-else :data="test" x-axis-formatter="{dd}" />
          </graph-card>
        </q-card>
      </q-col>
      <q-col class="p-3 mt-10" :cols="12">
        <div class="mb-10 flex justify-between items-center">
          <h2 class="text-3xl">Pools</h2>
        </div>
        <q-card class="w-full bg-neutral-800 border-neutral-700 border">
          <table-pools :pools="pools" @click:pool="$router.push({ name: 'Pool', params: { pool: $event.names.join('-') } })" />
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

export default {
  name: 'TokenView',
  components: { GraphVolume, GraphLiquidity, GraphCard, TablePools, IconsToken, TableTokens, PageSelector },
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
      getToken: (state) => state.token,
      filterPools: (state) => state.filterPools,
    }),
    token() {
      return this.getToken(this.$route.params.token);
    },
    pools() {
      return this.filterPools(this.$route.params.token);
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
