<template>
  <table>
    <thead>
      <tr class="border-b border-neutral-700">
        <th class="line-right w-10">#</th>
        <th class="line-left">Token Name</th>
        <th class="line-right">Liquidity</th>
        <th class="line-right">Unlocked APR</th>
        <th class="line-right">Locked APR</th>
        <th class="line-right">Volume (24h)</th>
        <th class="line-right">Fees (24h)</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(pool, index) in pools" :key="index" class="line hover:bg-gray-50/10 cursor-pointer" @click="$emit('click:pool', pool)">
        <td class="line-right">{{ index + 1 }}</td>
        <td class="line-left flex align-middle">
          <icons-pool class="w-10 h-10" :tokens="[pool.names[0], pool.names[1]]" />
          <span class="py-1">{{ pool.names.join('-') }}</span>
        </td>
        <td class="line-right">{{ pool.price }}</td>
        <td class="line-right">{{ pool.unlocked_apr }}</td>
        <td class="line-right">{{ pool.locked_apr }}</td>
        <td class="line-right">{{ pool.liquidity }}</td>
        <td class="line-right">{{ pool.fees }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import IconsPool from '../icons/IconsPool.vue';

export default {
  name: 'TablePools',
  components: { IconsPool },
  props: {
    pools: {
      type: Array,
      required: true,
    },
  },
  emits: ['click:pool'],
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
