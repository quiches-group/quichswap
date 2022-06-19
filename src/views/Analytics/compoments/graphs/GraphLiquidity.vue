<template>
  <q-graph :options="options" :height="400" />
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'GraphLiquidity',
  props: {
    data: {
      type: Array,
      required: true,
    },
    xAxisFormatter: {
      type: String,
      default: '{dd}',
    },
  },
  computed: {
    options() {
      return {
        grid: {
          top: 30,
          left: 15,
          right: 70,
          bottom: 30,
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false,
          },
          axisLabel: {
            interval: 2,
            hideOverlap: false,
            rotate: 45,
            formatter: this.xAxisFormatter,
          },
        },
        yAxis: {
          type: 'value',
          position: 'right',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false,
          },
          max(value) {
            return value.max;
          },
          axisLabel: {
            formatter(value) {
              let retValue = Intl.NumberFormat('fr-FR', { notation: 'compact' }).format(value);
              if (value < 1000) retValue = value;

              return `$ ${retValue}`;
            },
          },
        },
        tooltip: {
          renderMode: 'richText',
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            axis: 'x',
          },
        },
        series: [
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            smooth: true,
            symbol: 'none',
            color: 'rgba(64, 184, 131, 1)',
            emphasis: {
              focus: 'series',
            },
            data: this.data,
            lineStyle: {
              color: 'rgba(64, 184, 131, 0.8)',
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
      };
    },
  },
};
</script>

<style scoped></style>
