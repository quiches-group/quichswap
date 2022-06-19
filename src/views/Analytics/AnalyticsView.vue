<template>
  <div class="container mx-auto px-4">
    <q-row class="m-0">
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
          <q-button size="small">See All</q-button>
        </div>
        <q-card class="w-full bg-neutral-800 border-neutral-700 border">
          <table-tokens :tokens="tokens" @click:token="log" />
        </q-card>
      </q-col>
      <q-col class="p-3 mt-10" :cols="12">
        <div class="mb-10 flex justify-between items-center">
          <h2 class="text-3xl">Top Tokens</h2>
          <q-button size="small">See All</q-button>
        </div>
        <q-card class="w-full bg-neutral-800 border-neutral-700 border">
          <table-pools :pools="tokenPools" @click:pool="log" />
        </q-card>
      </q-col>
    </q-row>
  </div>
</template>

<script>
import * as moment from 'moment';
import GraphLiquidity from './compoments/GraphLiquidity.vue';
import GraphVolume from './compoments/GraphVolume.vue';
import GraphCard from './compoments/GraphCard.vue';
import TableTokens from './compoments/TableTokens.vue';
import TablePools from './compoments/TablePools.vue';

export default {
  name: 'AnalyticsView',
  components: { TablePools, TableTokens, GraphCard, GraphLiquidity, GraphVolume },
  data() {
    return {
      tabs: [
        { text: 'Day', value: 'day' },
        { text: 'Week', value: 'week' },
        { text: 'Month', value: 'month' },
      ],
      selectedTab: 'day',
      liquidityData: [],
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
      tokens: [
        {
          name: 'ST',
          price: '$9,890.00',
          priceChange: 3.54,
          volume: '$9,890.00',
          liquidity: '$9,890.00',
        },
        {
          name: 'QCH',
          price: '$9,890.00',
          priceChange: -2.21,
          volume: '$9,890.00',
          liquidity: '$9,890.00',
        },
      ],
      tokenPools: [
        {
          names: ['ST', 'QCH'],
          price: '$95,543.00',
          unlocked_apr: '50%',
          locked_apr: '110%',
          liquidity: '$9,890.00',
          fees: '$490.00',
        },
      ],
    };
  },
  beforeMount() {
    const date = moment().subtract(1, 'day');

    while (date.isSameOrBefore(moment())) {
      let newValue = (this.liquidityData[this.liquidityData.length - 1] || [0, 0])[1] || 1000000;
      if (Math.random() < 0.5) {
        newValue += Math.round(Math.random() * 1000000);
      } else {
        newValue = Math.max(newValue - Math.round(Math.random() * 1000000), 1000000);
      }

      this.liquidityData.push([date.format('YYYY-MM-DD HH:mm:ss'), newValue]);
      date.add(1, 'hour');
    }
  },
  methods: {
    log(data) {
      console.log(data);
    },
  },
};
</script>

<style scoped></style>
