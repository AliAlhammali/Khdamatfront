export default {
  routes: [
    {
      path: "services",
      name: "services-merchant-dashboard",
      component: () => import("./ServicesMerchantList.vue"),
      meta: {
        roles: ["admin"],
      },
    },
  ],
};
