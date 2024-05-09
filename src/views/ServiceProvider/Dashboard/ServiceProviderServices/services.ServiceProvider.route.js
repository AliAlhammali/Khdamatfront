export default {
  routes: [
    {
      path: "services",
      name: "services-service-provider-dashboard",
      component: () => import("./ServicesServiceProviderList.vue"),
      beforeEnter: SPRolesGuard,
      meta: {
        roles: ["admin"],
      },
    },
  ],
};
