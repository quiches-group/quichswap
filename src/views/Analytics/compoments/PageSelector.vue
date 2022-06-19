<template>
  <nav class="p-1 inline-flex rounded-full bg-neutral-800 border border-neutral-700">
    <ul class="flex">
      <li class="tab" :class="{ 'tab-active': activeTab === 'overview' }">
        <router-link :to="{ name: 'Analytics' }">Overview</router-link>
      </li>
      <li class="tab" :class="{ 'tab-active': activeTab === 'pools' }">
        <router-link :to="{ name: 'Pools' }">Pools</router-link>
      </li>
      <li class="tab" :class="{ 'tab-active': activeTab === 'tokens' }">
        <router-link :to="{ name: 'Tokens' }">Tokens</router-link>
      </li>
    </ul>
  </nav>
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
