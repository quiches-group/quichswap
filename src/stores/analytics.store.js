/* eslint-disable camelcase */
import { defineStore } from 'pinia';
import * as moment from 'moment';

export const useAnalyticsStore = defineStore('analytics', {
  state: () => ({
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
        price: '$1,890.00',
        priceChange: 3.54,
        volume: '$2,756,124',
        liquidity: '$34,456,345',
      },
      {
        name: 'QCH',
        price: '$9,890.00',
        priceChange: -2.21,
        volume: '$22,567,392',
        liquidity: '$765,236,673',
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
  }),
  getters: {
    token: (state) => (token) => {
      return state.tokens.find((t) => t.name === token);
    },
    filterTokens: (state) => (tokens) => {
      return state.tokens.filter((t) => tokens.includes(t.name));
    },
    tokenPool: (state) => (tokens) => {
      return state.tokenPools.find((t) => t.names.includes(tokens[0]) && t.names.includes(tokens[1]));
    },
    filterPools: (state) => (token) => {
      return state.tokenPools.filter((t) => t.names.includes(token));
    },
  },
  actions: {
    async fetchLiquidity() {
      if (this.liquidityData.length) return;

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
  },
});
