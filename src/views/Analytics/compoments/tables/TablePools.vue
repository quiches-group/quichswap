<template>
  <table>
    <thead>
      <tr class="border-b border-neutral-700">
        <th class="p-2 text-left">#</th>
        <th class="p-2 text-left">Token Name</th>
        <th class="p-2 text-right">Liquidity</th>
        <th class="p-2 text-right">Unlocked APR</th>
        <th class="p-2 text-right">Locked APR</th>
        <th class="p-2 text-right">Volume (24h)</th>
        <th class="p-2 text-right">Fees (24h)</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(pool, index) in pools" :key="index" class="border-b border-neutral-700 hover:bg-gray-50/10 cursor-pointer" @click="$emit('click:pool', pool)">
        <td class="p-2 text-left">{{ index + 1 }}</td>
        <td class="p-2 text-left flex align-middle">
          <div class="relative inline-block mr-3 w-8 h-8">
            <img :src="getTokenLogo(pool.names[0])" alt="" class="absolute -top-1 -left-1 w-6 h-6 rounded-full border border-neutral-700" />
            <img :src="getTokenLogo(pool.names[1])" alt="" class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border border-neutral-700" />
          </div>
          <span class="py-1">{{ pool.names.join('-') }}</span>
        </td>
        <td class="p-2 text-right">{{ pool.price }}</td>
        <td class="p-2 text-right">{{ pool.unlocked_apr }}</td>
        <td class="p-2 text-right">{{ pool.locked_apr }}</td>
        <td class="p-2 text-right">{{ pool.liquidity }}</td>
        <td class="p-2 text-right">{{ pool.fees }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'TablePools',
  props: {
    pools: {
      type: Array,
      required: true,
    },
  },
  emits: ['click:pool'],
  methods: {
    getTokenLogo(poolName) {
      return new URL(`/src/assets/tokens/${poolName.toLowerCase()}.png`, import.meta.url).href;
    },
  },
};
</script>

<style scoped></style>
