<template>
  <div class="relative inline-block mr-3">
    <img :src="getTokenLogo(tokens[0])" alt="" class="absolute top-0 left-0 w-7/12 h-7/12 rounded-full border border-neutral-700" />
    <img :src="getTokenLogo(tokens[1])" alt="" class="absolute bottom-0 right-0 w-7/12 h-7/12 rounded-full border border-neutral-700" />
  </div>
</template>

<script>
export default {
  name: 'IconsPool',
  props: {
    tokens: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getTokenLogo(tokenName) {
      return new URL(`/src/assets/tokens/${tokenName.toLowerCase()}.png`, import.meta.url).href;
    },
  },
};
</script>

<style scoped></style>
