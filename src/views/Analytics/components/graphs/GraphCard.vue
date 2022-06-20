<template>
  <q-card class="w-full bg-neutral-800 border-neutral-700 border">
    <div class="h-16 flex justify-between items-center">
      <slot name="title">
        <h2 class="p-5 text-xl font-light">{{ title }}</h2>
      </slot>
      <q-tabs v-if="tabs.length" class="p-5 w-auto" :selected-index="selectedTab" @select-index="$emit('update:selectedTab', $event)">
        <q-tab v-for="tab in tabs" :key="tab.value" class="text-white" :tab-index="tab.value">{{ tab.text }}</q-tab>
      </q-tabs>
    </div>
    <q-separator class="mb-4 border-neutral-700" />
    <slot />
  </q-card>
</template>

<script>
export default {
  name: 'GraphCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    tabs: {
      type: Array,
      default: () => [],
    },
    selectedTab: {
      type: String,
      default: null,
    },
  },
  emits: ['update:selectedTab'],
};
</script>

<style scoped></style>
