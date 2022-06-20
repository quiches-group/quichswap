<template>
  <img :src="getTokenLogo(token)" alt="" class="mr-1 inline-block w-8 rounded-full border border-neutral-700" />
</template>

<script>
export default {
  name: 'IconsToken',
  props: {
    token: {
      type: String,
      required: true,
    },
  },
  methods: {
    getTokenLogo(token) {
      return new URL(`/src/assets/tokens/${token.toLowerCase()}.png`, import.meta.url).href;
    },
  },
};
</script>

<style scoped></style>
