<template>
  <div class="w-full">
    <q-row class="m-0">
      <q-col class="p-3" :cols="12" :lg="6">
        <q-card class="w-full bg-neutral-800 border-neutral-700 border">
          <div class="flex justify-between items-center">
            <h2 class="p-5 text-xl font-light">Liquidity</h2>
            <q-tabs class="p-5 w-52" :selected-index="selectedIndex" @select-index="selectedIndex = $event">
              <q-tab class="text-white" tab-index="day">Day</q-tab>
              <q-tab class="text-white" tab-index="week">Week</q-tab>
              <q-tab class="text-white" tab-index="month">Month</q-tab>
            </q-tabs>
          </div>
          <q-separator class="mb-4 border-neutral-700" />
          <q-graph :options="graph1" :height="500" />
        </q-card>
      </q-col>
      <q-col class="p-3" :cols="12" :lg="6">
        <q-card class="w-full bg-neutral-800 border-neutral-700 border">
          <h2 class="p-5 text-xl font-light">Daily Volume</h2>
          <q-separator class="mb-4 border-neutral-700" />
          <q-graph :options="graph2" :height="500" />
        </q-card>
      </q-col>
    </q-row>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'AnalyticsView',
  data() {
    return {
      selectedIndex: 'day',
      graph1: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          splitLine: {
            show: false,
          },
        },
        grid: {
          top: 30,
          left: 15,
          right: 50,
          bottom: 30,
        },
        yAxis: {
          type: 'value',
          position: 'right',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false,
          },
        },
        tooltip: {
          trigger: 'axis',
        },
        series: [
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            smooth: true,
            symbol: 'none',
            emphasis: {
              focus: 'series',
            },
            data: [220, 182, 191, 234, 290, 330, 310],
            lineStyle: {
              color: 'rgb(64, 184, 131, 0.8)',
              width: 3,
            },
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(64, 184, 131, 0.8)',
                },
                {
                  offset: 1,
                  color: 'rgba(64, 184, 131, 0.1)',
                },
              ]),
            },
          },
        ],
      },
      graph2: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
          position: 'right',
        },
        grid: {
          top: 30,
          left: 15,
          right: 50,
          bottom: 30,
        },
        tooltip: {
          trigger: 'axis',
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(64, 184, 131, 1)',
                },
                {
                  offset: 1,
                  color: 'rgba(64, 184, 131, 0.4)',
                },
              ]),
            },
          },
        ],
      },
    };
  },
};
</script>

<style scoped></style>
