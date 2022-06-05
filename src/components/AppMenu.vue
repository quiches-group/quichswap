<template>
  <q-navbar :is-open="state.navbarIsOpen">
    <q-navbar-content class="flex">
      <q-menu class="p-4">
        <q-menu-item>Swap</q-menu-item>
        <q-menu-item>Farm</q-menu-item>
        <q-menu-item>Airdrop</q-menu-item>
      </q-menu>
    </q-navbar-content>
  </q-navbar>
</template>

<script setup>
import { reactive } from "vue";

const state = reactive({
  navbarIsOpen: false
})
</script>
