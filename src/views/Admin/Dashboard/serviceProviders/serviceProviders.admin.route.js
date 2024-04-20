export default {
  routes: [
    {
      path: "service-provider",
      name: "admin-service-provider-dashboard",
      component: () => import("./ServiceProvidersList.vue"),
    },
    {
      path: "service-provider/create",
      name: "admin-service-provider-create",
      component: () => import("./ServiceProvidersCreate.vue"),
    },
    {
      path: "service-provider/:id/edit",
      name: "admin-service-provider-edit",
      component: () => import("./ServiceProvidersEdit.vue"),
    },
  ],
};
