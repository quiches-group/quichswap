<template>
  <div class="container mx-auto px-4">
    <q-row class="m-0">
      <q-col class="p-3 mb-5" :cols="12"><page-selector active-tab="tokens" /></q-col>
      <q-col class="p-3" :cols="12">
        <div class="mb-10 flex justify-between items-center">
          <h2 class="text-3xl">Tokens</h2>
        </div>
        <q-card class="w-full bg-neutral-800 border-neutral-700 border">
          <table-tokens :tokens="tokens" @click:token="$router.push({ name: 'Token', params: { token: $event.name } })" />
        </q-card>
      </q-col>
    </q-row>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useAnalyticsStore } from '../../stores/analytics.store';
import PageSelector from './components/PageSelector.vue';
import TableTokens from './components/tables/TableTokens.vue';

export default {
  name: 'TokensView',
  components: { TableTokens, PageSelector },
  computed: {
    ...mapState(useAnalyticsStore, {
      tokens: (state) => state.tokens,
    }),
  },
};
</script>

<style scoped></style>
