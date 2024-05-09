import { SPRolesGuard } from "@/helper/serviceProvider.router.helper";

export default {
  routes: [
    {
      path: "users",
      name: "users-service-provider-dashboard",
      component: () => import("./UsersServiceProviderList.vue"),
      beforeEnter: SPRolesGuard,
      meta: {
        roles: ["admin"],
      },
    },
    {
      path: "users/create",
      name: "users-service-provider-create",
      component: () => import("./UsersServiceProviderCreate.vue"),
      meta: {
        edit: false,
        roles: ["admin"],
      },
      beforeEnter: SPRolesGuard,
    },
    {
      path: "users/:id/edit",
      name: "users-service-provider-edit",
      component: () => import("./UsersServiceProviderCreate.vue"),
      meta: {
        edit: true,
        roles: ["admin", "staff"],
      },
      beforeEnter: SPRolesGuard,
    },
  ],
};
