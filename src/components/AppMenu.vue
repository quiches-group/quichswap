<template>
  <q-navbar :is-open="state.navbarIsOpen">
    <q-navbar-content class="flex items-start">
      <q-menu class="p-4 flex-1">
        <q-menu-item><router-link :to="'/mint'">Mint</router-link></q-menu-item>
        <q-menu-item>Swap</q-menu-item>
        <q-menu-item><router-link :to="'/stack'">Stacking</router-link></q-menu-item>
        <q-menu-item>Airdrop</q-menu-item>
        <q-menu-item><router-link :to="'/analytics'">Analytics</router-link></q-menu-item>
      </q-menu>

      <connect-button>
        <q-button @click="openWalletDetailsModal">My wallet</q-button>
      </connect-button>
    </q-navbar-content>
  </q-navbar>
</template>

<script setup>
import { reactive } from 'vue';
import ConnectButton from './ConnectButton.vue';

const emit = defineEmits(['openWalletDetailsModal']);

const state = reactive({
  navbarIsOpen: false,
});

const openWalletDetailsModal = () => {
  emit('openWalletDetailsModal');
};
</script>
