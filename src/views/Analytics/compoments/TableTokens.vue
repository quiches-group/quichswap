<template>
  <table>
    <thead>
      <tr class="border-b border-neutral-700">
        <th class="p-2 text-left">#</th>
        <th class="p-2 text-left">Token Name</th>
        <th class="p-2 text-right">Price</th>
        <th class="p-2 text-right">Price Change</th>
        <th class="p-2 text-right">Volume (24h)</th>
        <th class="p-2 text-right">Liquidity</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(token, index) in tokens" :key="index" class="border-b border-neutral-700 hover:bg-gray-50/10 cursor-pointer" @click="$emit('click:token', token)">
        <td class="p-2 text-left">{{ index + 1 }}</td>
        <td class="p-2 text-left">
          <img :src="getTokenLogo(token)" alt="" class="mr-1 inline-block w-8 rounded-full border border-neutral-700" />
          {{ token.name }}
        </td>
        <td class="p-2 text-right">{{ token.price }}</td>
        <td class="p-2 text-right">
          <span class="px-1.5 py-0.5 rounded-lg" :class="[token.priceChange > 0 ? 'bg-green-500/30 text-green-400' : 'bg-red-500/30 text-red-400']"> {{ token.priceChange }}%</span>
        </td>
        <td class="p-2 text-right">{{ token.volume }}</td>
        <td class="p-2 text-right">{{ token.liquidity }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'TableTokens',
  props: {
    tokens: {
      type: Array,
      required: true,
    },
  },
  emits: ['click:token'],
  methods: {
    getTokenLogo(token) {
      return new URL(`../../../assets/tokens/${token.name.toLowerCase()}.png`, import.meta.url).href;
    },
  },
};
</script>

<style scoped></style>
