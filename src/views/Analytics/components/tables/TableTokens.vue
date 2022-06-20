<template>
  <table>
    <thead>
      <tr class="border-b border-neutral-700">
        <th class="line-right w-10">#</th>
        <th class="line-left">Token Name</th>
        <th class="line-right">Price</th>
        <th class="line-right">Price Change</th>
        <th class="line-right">Volume (24h)</th>
        <th class="line-right">Liquidity</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(token, index) in tokens" :key="index" class="line hover:bg-gray-50/10 cursor-pointer" @click="$emit('click:token', token)">
        <td class="line-right">{{ index + 1 }}</td>
        <td class="line-left">
          <icons-token :token="token.name" />
          <span>{{ token.name }}</span>
        </td>
        <td class="line-right">{{ token.price }}</td>
        <td class="line-right">
          <span class="px-1.5 py-0.5 rounded-lg" :class="[token.priceChange > 0 ? 'bg-green-500/30 text-green-400' : 'bg-red-500/30 text-red-400']"> {{ token.priceChange }}%</span>
        </td>
        <td class="p-2 text-right">{{ token.volume }}</td>
        <td class="line-right">{{ token.liquidity }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import IconsToken from '../icons/IconsToken.vue';

export default {
  name: 'TableTokens',
  components: { IconsToken },
  props: {
    tokens: {
      type: Array,
      required: true,
    },
  },
  emits: ['click:token'],
};
</script>

<style scoped>
.line:not(:last-child) {
  @apply border-b border-neutral-700;
}

.line-right {
  @apply p-2 text-right;
}

.line-left {
  @apply p-2 text-left;
}
</style>
