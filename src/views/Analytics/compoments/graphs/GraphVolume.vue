<template>
  <q-graph :options="options" :height="400" />
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'GraphVolume',
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
          formatter: this.xAxisFormatter,
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
            data: this.data,
            type: 'bar',
            color: 'rgba(64, 184, 131, 1)',
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
      };
    },
  },
};
</script>

<style scoped></style>
