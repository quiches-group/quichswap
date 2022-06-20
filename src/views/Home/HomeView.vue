<template>
  <div id="home" class="fixed bg-cover bg-center top h-screen w-screen flex flex-col justify-center items-center text-center">
    <h1 class="text-4xl lg:text-6xl text-white">DeFi For The Next Quiche</h1>
    <h2 class="my-5 text-md lg:text-2xl text-neutral-400">Swap assets instantly, globally, inexpensively, make money, automatically</h2>
    <q-button color="#f40087" @click="$router.push({ name: 'Stack' })">Start Staking</q-button>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

<style scoped>
#home {
  margin: 0 !important;
}

#home:before {
  content: ' ';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  background-image: url('/src/assets/home-page-image.jpg');
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-size: cover;
  z-index: -1;
}
</style>
