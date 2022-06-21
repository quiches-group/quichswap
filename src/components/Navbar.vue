<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav
    class="sticky top-0 z-40 p-2 px-6 w-full h-16 transition duration-300 bg-zinc-900 md:py-0 md:pl-12 after-desktop:pl-0 sky-anim-fadeInToBottom sky-anim-duration-500"
    :class="{
      'shadow-xl': isScrolling,
      'duration-100': isMobileMenuOpened,
      'success-stories-bg': isRoute('success-stories') && !(isScrolling || isMobileMenuOpened),
    }"
  >
    <div class="flex items-center h-full md:px-0 md:mx-auto" style="max-width: 1920px">
      <router-link to="/" class="flex flex-shrink-0 justify-center items-center w-12 h-10 select-none" aria-label="Page d'accueil" @click="toggleMenu(false)">
        <img class="max-w-full max-h-full" src="@/assets/tokens/qch.png" alt="Quiches token logo" />
      </router-link>
      <div class="flex ml-auto h-full md:flex-grow md:ml-0">
        <button
          class="flex relative self-center ml-auto w-8 h-7 md:hidden focus:outline-none"
          :aria-label="isMobileMenuOpened ? 'Menu switch : menu ouvert' : 'Menu switch : menu fermé'"
          @click="toggleMenu()"
        >
          <span
            class="absolute top-0 left-0 mx-auto w-4/5 h-0.5 rounded-full transition-all duration-300 transform translate-y-1 bg-primary translate-x-1/7"
            :class="{
              'top-1/2 translate-y-0 scale-x-0 opacity-0': isMobileMenuOpened,
            }"
          />
          <span
            class="absolute left-0 top-1/2 mx-auto w-4/5 h-0.5 rounded-full transition-all duration-300 transform -translate-y-1/2 bg-primary translate-x-1/7"
            :class="{
              'rotate-45': isMobileMenuOpened,
            }"
          />
          <span
            class="absolute left-0 top-1/2 mx-auto w-4/5 h-0.5 rounded-full transition-all duration-300 transform -translate-y-1/2 bg-primary translate-x-1/7"
            :class="{
              '-rotate-45': isMobileMenuOpened,
            }"
          />
          <span
            class="absolute bottom-0 left-0 mx-auto w-4/5 h-0.5 rounded-full transition-all duration-300 transform -translate-y-1 bg-primary translate-x-1/7"
            :class="{
              'bottom-1/2 translate-y-0 scale-x-0 opacity-0': isMobileMenuOpened,
            }"
          />
        </button>
        <div
          :class="{
            hidden: !isMobileMenuOpened,
            'fixed top-16 right-0 bottom-0 left-0 grid auto-rows-150px h-screen-available pb-20 bg-zinc-900 shadow-xl-inner overflow-y-auto': isMobileMenuOpened,
          }"
          class="md:static md:inset-auto md:ml-8 md:flex md:items-strech md:pb-0 md:w-full md:bg-transparent md:shadow-none"
        >
          <div class="flex justify-center items-center md:ml-8">
            <q-button color="#f40087" text-color="#fff" variant="link" :class="{ 'js-active': isRoute('Mint') }" :animate-on-active="true" @click="goToRouteNamed({ name: 'Mint' }), toggleMenu(false)"
              >Mint</q-button
            >
          </div>
          <div class="flex justify-center items-center md:ml-8">
            <q-button color="#f40087" text-color="#fff" variant="link" :class="{ 'js-active': isRoute('Swap') }" :animate-on-active="true" @click="goToRouteNamed({ name: 'Swap' }), toggleMenu(false)"
              >Swap</q-button
            >
          </div>
          <div class="flex justify-center items-center md:ml-8">
            <q-button
              color="#f40087"
              text-color="#fff"
              variant="link"
              :class="{ 'js-active': isRoute('Stack') }"
              :animate-on-active="true"
              @click="goToRouteNamed({ name: 'Stack' }), toggleMenu(false)"
              >Stacking</q-button
            >
          </div>
          <div class="flex justify-center items-center md:ml-8">
            <q-button
              color="#f40087"
              text-color="#fff"
              variant="link"
              :class="{ 'js-active': isRoute('Liquidity') }"
              :animate-on-active="true"
              @click="goToRouteNamed({ name: 'Liquidity' }), toggleMenu(false)"
              >Liquidity</q-button
            >
          </div>
          <div class="flex justify-center items-center md:ml-8">
            <q-button
              color="#f40087"
              text-color="#fff"
              variant="link"
              :class="{ 'js-active': isRoute('Analytics') }"
              :animate-on-active="true"
              @click="goToRouteNamed({ name: 'Analytics' }), toggleMenu(false)"
              >Analytics</q-button
            >
          </div>
          <connect-button class="self-center mx-auto md:ml-auto md:mr-0">
            <q-button class="self-center mx-auto md:ml-auto md:mr-0" size="small" color="#f40087" text-color="#fff" @click="toggleMenu(false), $emit('openWalletDetailsModal')">My wallet</q-button>
          </connect-button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import router from '../router/index';
import ConnectButton from './ConnectButton.vue';

export default {
  components: { ConnectButton },
  emits: ['menuToggled', 'openWalletDetailsModal'],
  data() {
    return {
      isMobileMenuOpened: false,
      isScrolling: false,
    };
  },
  computed: {},
  mounted() {
    window.addEventListener('scroll', this.onScrollToggleShadow, { passive: true });
    window.addEventListener('resize', this.onWindoResizingCloseMobileMenu, { passive: true });
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScrollToggleShadow);
    window.removeEventListener('resize', this.onWindoResizingCloseMobileMenu);
  },
  methods: {
    isRoute(routeName) {
      if (!this.$route || !this.$route.name || this.$route.name === null) {
        return false;
      }

      return this.$route.name.includes(routeName);
    },
    toggleMenu(newValue) {
      if (window.innerWidth >= 1440) {
        return;
      }

      const isNewValueSetted = typeof newValue === 'boolean';

      if (isNewValueSetted && this.isMobileMenuOpened === newValue) {
        return;
      }

      if (isNewValueSetted) {
        this.isMobileMenuOpened = newValue;
      } else {
        this.isMobileMenuOpened = !this.isMobileMenuOpened;
      }

      this.$emit('menuToggled', this.isMobileMenuOpened);
    },
    onScrollToggleShadow() {
      this.isScrolling = window.scrollY > 20;
    },
    onWindoResizingCloseMobileMenu() {
      if (this.isMobileMenuOpened === false) {
        return;
      }

      if (window.innerWidth >= 960 && this.isMobileMenuOpened !== false) {
        this.isMobileMenuOpened = false;
        this.$emit('menuToggled', this.isMobileMenuOpened);
      }
    },
    goToRouteNamed({ name }) {
      router.push({ name });
    },
  },
};
</script>

<style lang="scss" scoped>
.\!text-white {
  color: white !important;
}

.after-desktop\:pl-0 {
  @media (min-width: 1960px) {
    @apply pl-0;
  }
}
</style>
