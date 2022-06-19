<template>
  <div class="p-1 inline-flex rounded-full bg-neutral-800 border border-neutral-700">
    <router-link class="tab" :class="{ 'tab-active': activeTab === 'overview' }" :to="{ name: 'Analytics' }">Overview</router-link>
    <router-link class="tab" :class="{ 'tab-active': activeTab === 'pools' }" :to="{ name: 'Pools' }">Pools</router-link>
    <router-link class="tab" :class="{ 'tab-active': activeTab === 'tokens' }" :to="{ name: 'Tokens' }">Tokens</router-link>
  </div>
</template>

<script>
export default {
  name: 'PageSelector',
  props: {
    activeTab: {
      type: String,
      default: 'overview',
      validator: (value) => ['overview', 'pools', 'tokens'].includes(value),
    },
  },
};
</script>

<style scoped>
.tab {
  @apply py-2 px-4 cursor-pointer text-neutral-400 hover:text-white text-sm;
}

.tab:not(:first-child):not(:last-child) {
  @apply mx-1;
}

.tab-active {
  @apply rounded-full text-white;

  background-color: rgb(64, 184, 131);
}
</style>
