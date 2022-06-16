<template>
  <div class="w-full">
    <q-row class="m-0">
      <q-col class="p-3" :cols="6" :lg="6">
        <graph-card v-model:selected-tab="selectedTab" title="Liquidity" :tabs="tabs">
          <graph-liquidity :data="liquidityData" x-axis-formatter="{HH}" />
        </graph-card>
      </q-col>
      <q-col class="p-3" :cols="6" :lg="6">
        <graph-card title="Daily Volume">
          <graph-volume :data="volumeData" />
        </graph-card>
      </q-col>
    </q-row>
  </div>
</template>

<script>
import * as moment from 'moment';
import GraphLiquidity from './compoments/GraphLiquidity.vue';
import GraphVolume from './compoments/GraphVolume.vue';
import GraphCard from './compoments/GraphCard.vue';

export default {
  name: 'AnalyticsView',
  components: { GraphCard, GraphLiquidity, GraphVolume },
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
};
</script>

<style scoped></style>
