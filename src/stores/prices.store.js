/* eslint-disable camelcase */
import { defineStore } from 'pinia';
import moment from 'moment';
import axios from 'axios';

export const usePriceStore = defineStore('price', {
  state: () => ({
    tokens: {
      ST: 0,
      QCH: 0,
    },
    tokens24h: {
      ST: 0,
      QCH: 0,
    },
  }),
  getters: {
    token: (state) => (name) => {
      return state.tokens[name];
    },
    tokenPriceChange: (state) => (name) => {
      return ((state.tokens[name] - state.tokens24h[name]) / state.tokens24h[name]) * 100;
    },
  },
  actions: {
    async fetchTokenPrices() {
      Object.keys(this.tokens).forEach((tokenName) => {
        axios
          .get('/price', {
            params: {
              symbol: tokenName,
            },
          })
          .then((response) => {
            this.tokens[tokenName] = response.data.price;
          });
      });
    },
    async fetchTokenPrices24h() {
      Object.keys(this.tokens24h).forEach((tokenName) => {
        axios
          .get('/price', {
            params: {
              symbol: tokenName,
              timestamp: moment().subtract(1, 'day').unix(),
            },
          })
          .then((response) => {
            this.tokens24h[tokenName] = response.data.price;
          });
      });
    },
  },
});
