\
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
            <span>
              <q-format-number class="inline-block" :value="tokenPrice(token.name)" currency="usd" />
            </span>
            <span class="ml-4 px-1.5 py-0.5 text-sm rounded-lg" :class="[tokenPriceChange(token.name) > 0 ? 'bg-green-500/30 text-green-400' : 'bg-red-500/30 text-red-400']">
              <q-format-number class="inline-block" :value="tokenPriceChange(token.name) * 100" currency="usd" />%
            </span>
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
            <graph-volume v-if="selectedGraph === 'volume'" :data="volumeData" x-axis-formatter="{dd}" :unit="$route.params.token" />
            <graph-liquidity v-else-if="selectedGraph === 'price'" :data="priceData" x-axis-formatter="{dd}" :unit="$route.params.token" />
            <graph-liquidity v-else :data="volumeData" x-axis-formatter="{dd}" :unit="$route.params.token" />
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
import * as moment from 'moment';
import { mapState } from 'pinia';
import { useAnalyticsStore } from '../../stores/analytics.store';
import TableTokens from './components/tables/TableTokens.vue';
import PageSelector from './components/PageSelector.vue';
import IconsToken from './components/icons/IconsToken.vue';
import TablePools from './components/tables/TablePools.vue';
import GraphCard from './components/graphs/GraphCard.vue';
import GraphVolume from './components/graphs/GraphVolume.vue';
import GraphLiquidity from './components/graphs/GraphLiquidity.vue';
import { usePriceStore } from '../../stores/prices.store';

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
      volumeData: [
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
      priceData: [],
    };
  },
  computed: {
    ...mapState(useAnalyticsStore, {
      getToken: (state) => state.token,
      filterPools: (state) => state.filterPools,
    }),
    ...mapState(usePriceStore, {
      tokenPrice: 'token',
      tokenPriceChange: 'tokenPriceChange',
    }),
    token() {
      return this.getToken(this.$route.params.token);
    },
    pools() {
      return this.filterPools(this.$route.params.token);
    },
  },
  watch: {
    selectedTab() {
      this.fetchPriceGraph();
    },
  },
  beforeMount() {
    this.fetchPriceGraph();
  },
  methods: {
    fetchPriceGraph() {
      const startDate = moment();

      if (this.selectedTab === 'day') {
        startDate.subtract(1, 'days');
      } else if (this.selectedTab === 'week') {
        startDate.subtract(1, 'weeks');
      } else if (this.selectedTab === 'month') {
        startDate.subtract(1, 'months');
      }

      this.axios
        .get('/price/graph', {
          params: {
            symbol: this.$route.params.token,
            start_date: startDate.unix(),
            end_date: moment().unix(),
          },
        })
        .then((response) => {
          this.priceData = response.data;

          // Weird fix, should be fixed in library
          if (this.selectedGraph === 'price') {
            this.selectedGraph = 'volume';
            this.$nextTick(() => {
              this.selectedGraph = 'price';
            });
          }
        });
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
