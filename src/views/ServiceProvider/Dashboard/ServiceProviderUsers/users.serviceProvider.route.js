export default {
  routes: [
    {
      path: "users",
      name: "users-service-provider-dashboard",
      component: () => import("./UsersServiceProviderList.vue"),
    },
    {
      path: "users/create",
      name: "users-service-provider-create",
      component: () => import("./UsersServiceProviderCreate.vue"),
      meta: {
        edit: false,
        roles: ["admin"],
      },
    },
    {
      path: "users/:id/edit",
      name: "users-service-provider-edit",
      component: () => import("./UsersServiceProviderCreate.vue"),
      meta: {
        edit: true,
        roles: ["admin", "staff"],
      },
    },
  ],
};
