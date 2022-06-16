import { createRouter, createWebHistory } from 'vue-router';
// import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: HomeView,
    // },
    {
      path: '/stack',
      name: 'Stack',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Stack/StackView.vue'),
    },
    {
      path: '/liquidity-providing',
      name: 'LiquidityProviding',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Liquidity/LiquidityView.vue'),
    },
    {
      path: '/mint',
      name: 'Mint',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Mint/MintView.vue'),
    },
    {
      path: '/analytics',
      name: 'Analytics',
      component: () => import('../views/Analytics/AnalyticsView.vue'),
    },
    {
      path: '/analytics/pools',
      name: 'Pools',
      component: () => import('../views/Analytics/PoolsView.vue'),
    },
    {
      path: '/analytics/pools/:pool',
      name: 'Pool',
      component: () => import('../views/Analytics/PoolView.vue'),
    },
    {
      path: '/analytics/tokens',
      name: 'Tokens',
      component: () => import('../views/Analytics/TokensView.vue'),
    },
    {
      path: '/analytics/tokens/:token',
      name: 'Token',
      component: () => import('../views/Analytics/TokenView.vue'),
    },
	{
	  path: '/liquidity',
      name: 'Liquidity',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Liquidity/LiquidityView.vue'),
	}
  ],
});

export default router;
