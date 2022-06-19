<template>
  <div class="container mx-auto px-4">
    <q-row class="m-0">
      <q-col class="p-3 mb-5" :cols="12"><page-selector active-tab="pools" /></q-col>
      <q-col class="p-3" :cols="12">
        <div class="mb-10 flex justify-between items-center">
          <h2 class="text-3xl">Pools</h2>
        </div>
        <q-card class="w-full bg-neutral-800 border-neutral-700 border">
          <table-pools :pools="tokenPools" @click:pool="$router.push({ name: 'Pool', params: { pool: $event.names.join('-') } })" />
        </q-card>
      </q-col>
    </q-row>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useAnalyticsStore } from '../../stores/analytics.store';
import PageSelector from './compoments/PageSelector.vue';
import TablePools from './compoments/tables/TablePools.vue';

export default {
  name: 'PoolsView',
  components: { TablePools, PageSelector },
  computed: {
    ...mapState(useAnalyticsStore, {
      tokenPools: (state) => state.tokenPools,
    }),
  },
};
</script>

<style scoped></style>
